 
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import type { CaseStudyClientSuccessItem } from "@/types/case-study";
import { strapiMediaUrl } from "@/http/client";

interface CaseStudyTestimonialProps {
  /** Passed by SectionRenderer as the raw block data */
  data: CaseStudyClientSuccessItem;
}

/** Extract plain text from Strapi Blocks JSON (rich text) */
function extractPlainText(blocks: unknown[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .flatMap((block: any) => {
      if (block.children && Array.isArray(block.children)) {
        const text = block.children.map((child: any) => child.text ?? "").join("");
        return text ? [text] : [];
      }
      return block.text ? [block.text] : [];
    })
    .join("\n");
}

export function CaseStudyTestimonial({ data }: CaseStudyTestimonialProps) {
  const quote = extractPlainText(data?.testimonial);
  const client = data?.client;
  const photoUrl = client?.photo?.url ? strapiMediaUrl(client.photo.url) : null;

  if (!quote && !client) return null;

  return (
    <section id="client-testimonial" >
      <h2 className="text-[1.75rem] font-semibold text-neutral-900 tracking-tight leading-snug mb-6">
        What Our Client Says
      </h2>
      <div className="relative rounded-3xl bg-neutral-50 border border-neutral-100 p-8 sm:p-10 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-primary/10 blur-3xl"
        />
        <FaQuoteLeft className="size-5 text-primary/30 mb-6" />

        {quote && (
          <blockquote className="text-[1.125rem] sm:text-[1.25rem] text-neutral-800 leading-relaxed font-medium mb-8">
            &ldquo;{quote}&rdquo;
          </blockquote>
        )}

        {client && (
          <div className="flex items-center gap-4">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={client.name}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                {client.name?.charAt(0) ?? "?"}
              </div>
            )}
            <div>
              <p className="text-neutral-900 font-bold text-[1rem]">
                {client.name}
              </p>
              {client.designation && (
                <p className="text-neutral-500 text-[0.875rem]">
                  {client.designation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
