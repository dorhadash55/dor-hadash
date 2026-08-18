/** Scroll fluide vers un id (ex. "piliers"), en tenant compte du header sticky. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** href du type "/#piliers" ou "#piliers" → id, sinon null */
export function hashIdFromHref(href: string): string | null {
  const i = href.indexOf("#");
  if (i < 0) return null;
  const id = href.slice(i + 1);
  return id || null;
}
