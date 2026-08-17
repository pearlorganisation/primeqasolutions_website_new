import { cn } from "@/lib/utils/utils";

/**
 * Parses a string for {{highlighted}} segments and returns React nodes.
 * Useful for rendering text with inline highlights in any component.
 *
 * Example input: "Empower Your Enterprise With {{Our AI Intelligence}}"
 * Renders as: "Empower Your Enterprise With " + <span className="text-primary">Our AI Intelligence</span>
 */
export function renderWithHighlights(
  text: string | null | undefined,
  highlightClassName: string = ""
) {
  if (!text) return null;

  // Split on {{...}} — keep the captured groups so we know which parts are highlights
  const parts = text.split(/(\{\{.*?\}\})/g);

  return parts.map((part) => {
    const match = part.match(/^\{\{(.*?)\}\}$/);
    if (match) {
      return (
        <span key={`highlight-${match[1]}`} className={cn(highlightClassName)}>
          {match[1]}
        </span>
      );
    }
    return part;
  });
}

/**
 * Specifically for components that need to split a string into a base title and a single highlight.
 * Useful for components like SectionHeader which take separate title and titleHighlight props.
 *
 * Example input: "Leading the way in {{Innovation}}"
 * Returns: { title: "Leading the way in", highlight: "Innovation" }
 */
export function parseHighlight(text: string | null | undefined) {
  if (!text) return { title: "", highlight: "" };

  const match = text.match(/^(.*?)\{\{(.*?)\}\}(.*)$/);
  if (match) {
    return {
      title: (match[1] + match[3]).replace(/\s+/g, " ").trim(),
      highlight: match[2].trim(),
    };
  }
  
  // If no pattern found, return the original text as title and empty highlight
  return { title: text, highlight: "" };
}
