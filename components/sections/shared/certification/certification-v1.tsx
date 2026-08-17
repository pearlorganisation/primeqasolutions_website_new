import Image from "next/image";
import type { StrapiCertificationBlock } from "@/types/home";
import { toAbsUrl } from "@/lib/utils/utils";

interface Props {
  data: StrapiCertificationBlock;
}

/**
 * CertificationV1 — renders the certification badge strip.
 * This is now a standalone section registered in the block registry.
 */
export function CertificationV1({ data }: Props) {
  const badges = (data?.certifications ?? []).filter((c) => c?.image?.url);
  if (!badges.length) return null;

  return (
    <div className="mt-14 flex w-full max-w-5xl flex-col items-center justify-center border-t border-slate-200/60 pt-8 mx-auto px-4">
      {data.title && (
        <p className="text-[0.875rem] font-bold text-slate-500 mb-8 uppercase tracking-[0.15em] text-center">
          {data.title}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center justify-center gap-6 sm:gap-10 md:gap-14">
        {badges.map((cert) => (
          <div key={cert.id} className="relative flex justify-center">
            <Image
              src={toAbsUrl(cert.image.url)}
              alt={
                cert.altText ||
                cert.image.alternativeText ||
                cert.label ||
                "Certification Badge"
              }
              width={cert.image.width ?? 200}
              height={cert.image.height ?? 200}
              unoptimized
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-16 w-auto object-contain md:h-28"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
