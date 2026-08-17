import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import type { IndustryProps } from "./types";
import { getMediaUrl } from "./types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BLOCKS } from "@/lib/utils/blocks";
import { extractPlainText } from "./types";
import { H3 } from "@/components/ui/typography";

export function IndustryV1({ data, className }: IndustryProps) {
  const industries = data?.industries || [];

  const heading = data?.heading;
  const label = heading?.label ?? "";
  const title = extractPlainText(heading?.title) || "";
  const description = extractPlainText(heading?.description) || "";

  return (
    <Section className={cn(className)}>
      {industries.length <= 3 ? (
        <>
          {data?.heading && (
            <SectionHeaderResolver
              variant={heading?.variant}
              badge={label}
              title={title}
              description={description}
            />
          )}
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </Container>
        </>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <Container>
            {data?.heading && (
              <SectionHeaderResolver
                variant={heading?.variant}
                badge={label}
                title={title}
                description={description}
              />
            )}

            <div className="relative mt-8">
              <div className="absolute -top-12 right-1 flex items-center gap-2 z-20">
                <CarouselPrevious className="static translate-y-0 translate-x-0 h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800 shadow-sm transition-all duration-300 flex items-center justify-center [&_svg]:size-4" />
                <CarouselNext className="static translate-y-0 translate-x-0 h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800 shadow-sm transition-all duration-300 flex items-center justify-center [&_svg]:size-4" />
              </div>

              <CarouselContent>
                {industries.map((industry) => (
                  <CarouselItem key={industry.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <IndustryCard industry={industry} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Container>
        </Carousel>
      )}
    </Section>
  );
}

// function IndustryCard({ industry }: { industry: any }) {
//   // Find the service-hero block in the page_section
//   const serviceHeroBlock = industry.page_section?.find(
//     (block: any) => block.__component === BLOCKS.SERVICE_HERO
//   );

//   const image = serviceHeroBlock?.image;
//   const imageUrl = image?.formats?.medium?.url || image?.url;
//   const imageAlt = image?.alternativeText || industry.name;
//   const descriptionText = extractPlainText(serviceHeroBlock?.description);

//   return (
//     <Link href={`/industries/${industry.slug || industry.name.toLowerCase().replace(/ /g, '-')}`}>
//       <Card className="group py-0! overflow-hidden transition-all duration-300 hover:shadow-lg h-full border-none shadow-sm bg-muted/30">
//         <CardContent className="p-0 relative aspect-4/3 flex items-center justify-center bg-background rounded-xl overflow-hidden">
//           {imageUrl ? (
//             <Image
//               src={getMediaUrl(imageUrl)}
//               alt={imageAlt}
//               fill
//               sizes="(max-width: 768px) 100vw, 33vw"
//               className="object-cover transition-transform duration-500 group-hover:scale-101"
//               unoptimized
//             />
//           ) : (
//             <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
//               No Image
//             </div>
//           )}
//           <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 flex flex-col justify-end p-5">
//             <div className="transition-transform duration-300">
//               <H3 className=" text-white">
//                 {industry.name}
//               </H3>
//               {descriptionText && (
//                 <p className="text-white/80 text-sm line-clamp-2 mt-1.5 transition-opacity duration-300">
//                   {descriptionText}
//                 </p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

function IndustryCard({ industry }: { industry: any }) {
  const serviceHeroBlock = industry.page_section?.find(
    (block: any) => block.__component === BLOCKS.SERVICE_HERO
  );

  const image = serviceHeroBlock?.image;
  const imageUrl = image?.formats?.medium?.url || image?.url;
  const imageAlt = image?.alternativeText || industry.name;
  const descriptionText = extractPlainText(serviceHeroBlock?.description);

  return (
    <Link
      href={`/industries/${industry.slug || industry.name.toLowerCase().replace(/ /g, "-")
        }`}
      className="group block h-full"
    >
      <Card className="relative h-full overflow-hidden rounded-xl border-0 bg-neutral-200 p-0 shadow-none">
        <CardContent className="relative aspect-[1024/537] min-h-[200px] w-full p-0 sm:min-h-[200px] lg:min-h-[200px]">

          {/* Image */}
          {imageUrl ? (
            <Image
              src={getMediaUrl(imageUrl)}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">
              No Image
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
            <H3 className="text-base font-medium leading-tight text-white sm:text-lg">
              {industry.name}
            </H3>

            {descriptionText && (
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                {descriptionText}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
