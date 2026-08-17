import { Container, Section } from "@/components/ui/container";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import type { ClientsProps } from "./types";
import { getMediaUrl } from "./types";

type Logo = { src: string; alt: string; id?: string | number };

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-4 py-2 transition-all duration-300">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={160}
        height={80}
        className="h-20 aspect-video object-contain transition-all duration-300 cursor-pointer"
        unoptimized
      />
    </div>
  );
}

export function ClientsV1({ data, className }: ClientsProps) {
  // Map dynamic logos
  const resolvedLogos: Logo[] =
    data?.logo && data.logo.length > 0
      ? data.logo.map((l) => ({
          id: l.id || l.name,
          src: getMediaUrl(l.url),
          alt: l.alternativeText || l.name || "Client Logo",
        }))
      : [];

  return (
    <Section className={cn("py-8!", className)}>
      {data?.Heading && (
        <Container>
          <SectionHeaderResolver 
              variant={data.Heading?.variant} />
        </Container>
      )}

      {/* Slider */}
      {resolvedLogos.length > 0 && (
        <div className="relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[#ffffff] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-[#ffffff] to-transparent" />

          <InfiniteSlider
            gap={20}
            duration={60}
            stopOnHover={true}
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
