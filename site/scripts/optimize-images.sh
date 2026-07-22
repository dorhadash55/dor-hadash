#!/usr/bin/env bash
# Compresse les JPEG du site et génère des variantes *-card.jpg pour les grilles.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../public/images" && pwd)"
cd "$ROOT"

optimize_full() {
  local file="$1"
  local max="${2:-1280}"
  sips -Z "$max" -s format jpeg -s formatOptions 72 "$file" --out "${file}.tmp" >/dev/null
  mv "${file}.tmp" "$file"
  echo "  full: $file ($(du -h "$file" | cut -f1))"
}

optimize_card() {
  local file="$1"
  local dir base out
  dir=$(dirname "$file")
  base=$(basename "$file" .jpg)
  out="${dir}/${base}-card.jpg"
  sips -Z 720 -s format jpeg -s formatOptions 70 "$file" --out "$out" >/dev/null
  echo "  card: $out ($(du -h "$out" | cut -f1))"
}

echo "Optimisation des photos villes…"
for f in jerusalem.jpg haifa.jpg karmiel.jpg nof-hagalil.jpg cities/ashdod.jpg cities/bat-yam.jpg; do
  [ -f "$f" ] || continue
  before=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  optimize_full "$f"
  after=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if [ "$after" -gt "$before" ]; then
    echo "  (conservé: recompression plus lourde pour $f)"
  fi
  optimize_card "$f"
done

echo "Terminé."
