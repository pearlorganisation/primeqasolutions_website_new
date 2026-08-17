import { cn } from "@/lib/utils/utils";

export function HighlightedText({
  text,
  highlightClassName = "text-highlight-color",
}: {
  text: string | null | undefined;
  highlightClassName?: string;
}) {
  if (!text) return null;

  const parts = text.split(/(\{\{.*?\}\})/g);

  return (
    <>
      {parts.map((part) => {
        const match = part.match(/^\{\{(.*?)\}\}$/);
        if (match) {
          return (
            <span key={`highlight-${match[1]}`} className={cn(highlightClassName)}>
              {match[1]}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
