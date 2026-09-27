---
title: An AI agent tests my editor without a window
description: Test-driven development with an AI agent on a native desktop app. Headless mode, JSON-RPC as a remote control, and screenshots the agent looks at itself.
---

# An AI agent tests my editor without a window

I write my editor `zid` with Claude Code. How that came about is covered in
the [article about my editor search](/en/open-source/editor-suche/).
This one is about the question that comes next: How does an AI agent check
a user interface it can neither click nor see?

On the web, this is solved. Playwright opens a browser, clicks, reads the DOM
and takes screenshots. `zid` has none of that. It is written in Zig,
draws via wgpu with its own text renderer and builds the layout with Clay.
There is no DOM, no developer tools and no browser that takes
anything off your hands.

Without help, an agent writes UI code there blind. The end result is
"should work", and then I was the one checking, by hand, in the window.
I turned that around: The app gets a remote control and eyes, and
the agent uses both itself.

## Three levels

Testing happens on three levels, and each one catches something different.

- **Unit tests in Zig** check logic that needs no UI. PDF
  page navigation lives in `ui/pdf_nav.zig`, the Git history in
  `git/git_history.zig`, the folder dialog in `ui/folder_ops.zig`. These modules
  know nothing about Clay and run in milliseconds.
- **E2E scripts in Python** start the real app without a window, operate it
  via JSON-RPC and check the state the app returns as JSON. There
  are 23 scripts with a combined total of just over 4000 lines.
- **Screenshots** are written to a file by the app on request. Claude looks
  at them itself.

## Without a window, but with the same loop

The command is `zig build run -- --headless --ai=off`. The app then opens
no window, renders into a buffer of 1200 × 800 pixels and listens on
port 9999. `--ai=off` turns off the built-in agent with its local
language model.

What matters is that headless mode is not a world of its own. It used to have
its own loop of 27 lines that only picked up results from background work.
Tab switching, clicks in the explorer, deferred closing of tabs and
buffered input never ran there. Bugs in exactly these paths could
only be reproduced with a visible window, and that window gets in the way when
I am working on the same desktop at the same time.

Today, headless runs the same frame loop as the windowed app. The only things skipped
are what requires a window: window events, the mouse cursor and the
output to the screen. Instead of waiting for events, the
loop sleeps for 16 milliseconds. What is tested headless is therefore the same code
I use in the window.

## JSON-RPC as a remote control

The RPC server knows 48 methods. Some of them operate the app like a
human: `click`, `right_click`, `move_mouse`, `scroll`, `key_press`,
`type_text`. Others read state: `ui_state` returns open
dialogs, menus, tabs and focus, `editor_state` lines, cursor and
search bar, `pdf_state` the current page. With `element_bounds`, a
test gets the position of any layout element instead of guessing
coordinates.

On the Python side, a single function is enough:

```python
def rpc(method, params=None):
    msg = json.dumps({"jsonrpc": "2.0", "method": method, "params": params or [], "id": 1}) + "\n"
    with socket.create_connection((HOST, PORT), timeout=10) as s:
        s.sendall(msg.encode())
        data = b""
        while not data.endswith(b"\n"):
            chunk = s.recv(65536)
            if not chunk:
                break
            data += chunk
    res = json.loads(data.decode())
    if "error" in res:
        raise RuntimeError(f"{method}: {res['error']}")
    return res["result"]
```

The real work lies in the question of which thread may do what. The
RPC server runs in its own thread, the UI in the main thread.
If an RPC call changes the tab list while the main thread is
drawing it, the app crashes. That is why input goes into a queue
that the main thread works through once per frame:

```zig
/// Vom Main-Thread pro Frame aufrufen: gepufferte Eingaben anwenden.
pub fn drainInputs(ctx: *E2EContext) void {
    var batch: [64]InputEvent = undefined;
    while (true) {
        ctx.input_mutex.lock();
        const n = @min(ctx.pending_inputs.items.len, batch.len);
        @memcpy(batch[0..n], ctx.pending_inputs.items[0..n]);
        ctx.pending_inputs.replaceRangeAssumeCapacity(0, n, &.{});
        ctx.input_mutex.unlock();
        if (n == 0) return;
        for (batch[0..n]) |ev| applyInput(ctx.ui_system, ev);
    }
}
```

Read calls still run in the server thread. Shared data then
needs a lock. The Git status in the explorer had none: The main thread
replaced the map while a test was reading it, and the app crashed in
`isIgnored`. Since then, every access goes through three functions that hold the
lock.

## A test reads like a user manual

This is what the beginning of the test for PDF page navigation looks like:

```python
cfg = os.path.join(ROOT, "tmp", "e2e_pdf_cfg")
shutil.rmtree(cfg, ignore_errors=True)
env = dict(os.environ, XDG_CONFIG_HOME=cfg)
wait_port_free()
proc = subprocess.Popen(
    ["zig", "build", "run", "--", "--headless", "--ai=off", PDF],
    cwd=ROOT, stdout=log, stderr=subprocess.STDOUT, env=env,
    start_new_session=True,  # eigene Prozessgruppe, siehe finally
)
try:
    wait_port(proc)
    settle(20)
    # ...
    check(st["pdf"], f"PDF-Tab ist aktiv (nach {time.time() - t0:.1f}s)")
    check(st["pages"] >= 3, f"Dokument hat {st['pages']} Seiten")
    to_first_page()
    expect_page(0, "Bild auf hält am Anfang bei Seite 1")
```

Every check prints a line with `PASS` or `FAIL` and a sentence that
says what is meant. This is written for the agent: It reads the
output and knows, without a stack trace, which step failed.

Two details came from painful experience. Every run gets a fresh
configuration directory, otherwise the app restores the tabs from the last session,
and the test measures someone else's state. And the test starts the app
in its own process group so that at the end it really shuts everything down.

## What the screenshot shows and the state does not

The RPC method `screenshot` writes a PPM to `tmp/`. Claude does not read
PPM files, so the agent converts them before looking at them:

```python
from PIL import Image
for n in ['repo', 'diff', 'file', 'empty', 'split']:
    Image.open(f'tmp/e2e_git_history_{n}.ppm').save(f'tmp/e2e_git_history_{n}.png')
```

Then it opens the PNGs and describes what it sees. There is no separate
evaluation layer. The model that wrote the code
looks at the result.

Some things only exist in the image. While building the folder dialog, the new icons were missing
from every screenshot after the first one. No state field knows about icons;
the bug was in the icon atlas budget, which was never reset
headless.

Other things are missing from the state only because nobody has asked for them yet. A
screenshot from the explorer showed two bugs at once. A click on
a file went through an old code path that wrote the text into the buffer of the
*previous* tab; the previous file was then considered modified and
showed someone else's content. And after closing the active tab, the
editor kept showing the content of the closed tab, but under the name of its
neighbor.

The JSON state could not reveal either one, because it only reported which
tab is active, not which buffer the editor is currently showing. So the fix
came with an extension: `get_active_tab` now also returns
`editor_file` and `editor_modified`.

This has become a pattern. The screenshot finds the bug, a new
state field pins it down. Next time, a `check` fails, and
nobody has to look anymore.

Where the appearance itself matters, the test checks the pixels. The
buttons below the PDF page light up on hover. The script
takes one screenshot with the mouse next to them and one with the mouse on them
and compares the color at the same spot. No image library is
needed for that: PPM is a short text header followed by raw RGB bytes.

## When the test itself lies

Not every red test means the app.

In the PDF test, the page numbers jumped between two calls without any
page turning. The cause was in the RPC server. It bound the port with
`reuse_address`, and on Linux that also sets `SO_REUSEPORT`. Orphaned
instances from earlier runs kept listening, the kernel distributed
the connections, and some of the responses came from an old process with
old state. Today the app binds the port exclusively, and a second start
reports that it is in use.

Other traps are smaller, but they are all in the project documentation
so the agent does not have to rediscover them:

- Clay keeps the bounding box of an element that is no longer
  drawn. Whether a dialog is open is therefore answered by `ui_state`, not
  `element_bounds`.
- The icon atlas rasterizes at most four new icons per pass. The
  screenshot helper function therefore renders twice.
- A page change only appears in the next frame. Tests poll the
  state in a short loop instead of waiting once and hoping.

Sometimes the test also finds a real bug that it triggers itself.
Writing a single screenshot to `tmp/` produced around 2000
file events. Each one kicked off its own Git status refresh,
the queue filled up, and any other task could be
dropped, including the chat's responses. Since then, the watcher reports identical
events only once, and the app refreshes the Git status at most
once every 300 milliseconds. For the same screenshot, out of 2037
events, two remain and one refresh.

## The workflow

My instructions to the agent set test-driven development as the
default: first a test that fails, then the smallest code that makes it
pass, then clean up. On a UI, that means in practice:

1. The logic behind the feature moves into a module without Clay, with
   unit tests.
2. For the path through the UI, an E2E script is created, or a new
   step in an existing one. If the script lacks a state it needs to
   check, the app first gets the RPC method for it.
3. The agent runs the script, reads the `FAIL` lines, changes the code
   and restarts until everything reports `PASS`.
4. It looks at the screenshots. If something stands out there, it goes back to
   step 2.

The commits contain test and code together, so the order is not visible
in the history. What is visible, however, is why the second level
is necessary. PDF page navigation came with a clean, unit-tested
module. In the app it still felt jumpy. The fix brought the
E2E script along with three causes no unit test could see: The server thread read
state it did not own, the mouse wheel counted backwards, and
Clay's hover detection reported nothing at all in the PDF view.

## What does not run automatically

No hook starts the tests after a change, and there is no CI.
The agent decides which scripts to run based on the change. For that,
`AGENTS.md` lists for each feature which script covers it. One
rule is phrased as mandatory: After every change to the agent code,
`scripts/e2e_ai_tools.py` must stay green. That too is an instruction, not
automation.

A full run of all 23 scripts is not a fixed step. That is the biggest
open gap: A change to the explorer that incidentally breaks the terminal tab
only gets noticed when someone runs the matching script.

## What you need for your own app

None of this depends on Zig. Anyone who wants to develop a native desktop app with an agent
needs roughly this:

- A mode without a window that runs through the same loop as with a window.
- A local interface for input that arrives in the main thread, not
  in the server's thread.
- Read calls that return the UI state as JSON, and
  one that reveals the position of an element.
- Screenshots to a file, in a format the model can read.
- Fresh state per test run and a port that only one instance can
  hold.
- A model that understands images.
- A file that says which script covers which feature and
  which trap is already known.

The source code is open: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
The RPC methods are in `src/e2e_server.zig`, the scripts under
`scripts/e2e_*.py`.
