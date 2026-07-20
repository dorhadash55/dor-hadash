// Rend un paragraphe pouvant contenir des segments **en gras** (contenu source en pseudo-markdown).
export default function RichParagraph({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  const isHeadingOnly = parts.length === 3 && parts[0] === "" && parts[2] === "";

  if (isHeadingOnly) {
    return <h3 className="mt-8 mb-2 font-heading text-xl font-semibold text-brand-blue-deep">{parts[1]}</h3>;
  }

  return (
    <p className={className ?? "mb-4 leading-relaxed text-gray-700"}>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))}
    </p>
  );
}
