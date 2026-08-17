import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import { getMediaUrl } from "@/components/sections/shared/clients/types";

type Logo = { src: string; alt: string; id?: string | number };

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-8 transition-all duration-300">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={112}
        height={28}
        className="h-20 w-auto aspect-video object-contain transition-all duration-300 cursor-pointer"
        unoptimized
      />
    </div>
  );
}

export function ClientStrip({ data, className }: { data: any; className?: string }) {

  // Map dynamic logos from Strapi data
  const resolvedLogos: Logo[] =
    data?.logo && data.logo.length > 0
      ? data.logo.map((l: any) => ({
          id: l.id || l.name,
          src: getMediaUrl(l.url),
          alt: l.alternativeText || l.name || "Client Logo",
        }))
      : [];

  const hasHeader = !!data?.Heading;

  return (
    <Section className={cn(hasHeader ? "py-8! md:py-12!" : "py-4! md:py-6!", className)}>
      {hasHeader && (
        <Container>
          <SectionHeaderResolver 
              variant={data.Heading?.variant}
            className="mb-16"
          />
        </Container>
      )}

      {/* Slider */}
      {resolvedLogos.length > 0 && (
        <div className="relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-white to-transparent" />

          <InfiniteSlider
            gap={10}
            duration={60}
            stopOnHover={true}  
            className="py-4"
          >
            {resolvedLogos.map((logo) => (
              <LogoItem key={logo.id} logo={logo} />
            ))}
          </InfiniteSlider>
        </div>
      )}
    </Section>
  );
}
