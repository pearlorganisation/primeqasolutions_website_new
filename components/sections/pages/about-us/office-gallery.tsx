import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/sections/shared/section-heading/section-header-v1";
import { cn } from "@/lib/utils/utils";

export interface GalleryItemProps {
  id: number;
  src: string;
  alt: string;
  className?: string; // e.g. "md:col-span-2 md:row-span-2"
}

export interface OfficeGalleryProps {
  data: {
    badge?: string;
    title: string;
    description?: string;
    variant?: string;
    images: GalleryItemProps[];
  };
}

export function OfficeGallery({ data }: OfficeGalleryProps) {
  if (!data?.images?.length) return null;

  return (
    <Section className="bg-[#F8F9FA] overflow-hidden">
      <Container>
        <SectionHeader
          badge={data.badge}
          title={data.title}
          description={data.description}
          align="center"
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-6">
          {data.images.map((img) => (
            <div
              key={img.id}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl group cursor-pointer",
                "min-h-62.5 md:min-h-0", // ensures mobile has height
                img.className
              )}
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-103"
                unoptimized // Use unoptimized for external URLs without next config setup
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold tracking-wide text-lg">
                    {img.alt}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
