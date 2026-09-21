#!/usr/bin/env bash
# Erzeugt alle Favicons und App-Icons aus public/logo.svg.
# Braucht resvg und ImageMagick (magick). Nach jeder Änderung am Logo laufen lassen.
set -euo pipefail

cd "$(dirname "$0")/../public"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

png() { resvg -w "$1" -h "$1" "${@:3}" logo.svg "$2"; }

png 16 favicon-16x16.png
png 32 favicon-32x32.png
png 192 android-chrome-192x192.png
png 512 android-chrome-512x512.png

# iOS rundet die Ecken selbst und zeigt Transparenz schwarz. Die Ecken
# werden deshalb in der Logofarbe gefüllt.
png 180 apple-touch-icon.png --background '#12489e'

png 48 "$tmp/48.png"
magick favicon-16x16.png favicon-32x32.png "$tmp/48.png" favicon.ico
