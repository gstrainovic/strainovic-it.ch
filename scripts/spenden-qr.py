"""Erzeugt public/img/spenden-qr.svg: den QR-Code einer Schweizer QR-Rechnung ohne Betrag für /spenden/.

Aufruf: uv run --with qrbill==1.2.0 scripts/spenden-qr.py

qrbill zeichnet den ganzen Zahlteil nach SIX-Norm; hier bleibt per viewBox nur der QR-Code mit Schweizerkreuz
(46 mm, 67 mm vom linken und 17 mm vom oberen Rand) samt 3 mm Ruhezone. Er ist sprachunabhängig, darum eine
Datei für alle vier Sprachfassungen.
"""
import io
import re
from pathlib import Path

from qrbill import QRBill

MM = 744.09447 / 210  # Benutzereinheiten je Millimeter im SVG von qrbill
X, Y, GROESSE, RAND = 67, 17, 46, 3

bill = QRBill(
    account="CH0608781000261813600",
    creditor={"name": "Goran Strainovic", "street": "Bahnstrasse", "house_num": "9b", "pcode": "9323",
              "city": "Steinach", "country": "CH"},
    additional_information="Spende Plugin",
    language="de",
)
puffer = io.StringIO()
bill.as_svg(puffer)
seite = (GROESSE + 2 * RAND) * MM
svg = re.sub(r'height="[^"]*" version="1.1" viewBox="[^"]*" width="[^"]*"',
             f'height="{GROESSE + 2 * RAND}mm" version="1.1" '
             f'viewBox="{(X - RAND) * MM:.3f} {(Y - RAND) * MM:.3f} {seite:.3f} {seite:.3f}" '
             f'width="{GROESSE + 2 * RAND}mm"', puffer.getvalue(), count=1)
# Der weisse Hintergrund deckt die ganze Rechnung ab; im Ausschnitt reicht er, solange er bei 0/0 beginnt.
ziel = Path(__file__).resolve().parents[1] / "public" / "img" / "spenden-qr.svg"
ziel.write_text(svg, encoding="utf-8")
print(ziel)
