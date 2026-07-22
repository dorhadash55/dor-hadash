/** Variante légère (~720px) pour cartes et grilles — voir scripts/optimize-images.sh */
export function cardImageSrc(src: string): string {
  const dot = src.lastIndexOf(".");
  if (dot <= 0) return src;
  return `${src.slice(0, dot)}-card${src.slice(dot)}`;
}
