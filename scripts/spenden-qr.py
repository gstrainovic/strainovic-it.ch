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
x0, y0 = (X - RAND) * MM, (Y - RAND) * MM
svg = re.sub(r'height="[^"]*" version="1.1" viewBox="[^"]*" width="[^"]*"',
             f'height="{GROESSE + 2 * RAND}mm" version="1.1" '
             f'viewBox="{x0:.3f} {y0:.3f} {seite:.3f} {seite:.3f}" '
             f'width="{GROESSE + 2 * RAND}mm"', puffer.getvalue(), count=1)
# qrbill legt den weissen Grund mit 100 % ab 0/0 an; das deckt den verschobenen Ausschnitt nicht, und im
# Dunkelmodus stünden die schwarzen Module auf dunklem Grund. Darum den Grund genau auf den Ausschnitt legen.
svg = svg.replace('<rect fill="white" height="100%" width="100%" x="0" y="0" />',
                  f'<rect fill="white" height="{seite:.3f}" width="{seite:.3f}" x="{x0:.3f}" y="{y0:.3f}" />', 1)
ziel = Path(__file__).resolve().parents[1] / "public" / "img" / "spenden-qr.svg"
ziel.write_text(svg, encoding="utf-8")
print(ziel)
