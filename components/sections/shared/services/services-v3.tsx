import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ServiceIcon, extractPlainText } from "./utils";
import type { ServicesProps } from "./types";
import { SectionHeaderResolver } from "../section-heading/section-header-resolver";
import { H3 } from "@/components/ui/typography";
import { parseHighlight } from "@/lib/utils/text-utils";

export function ServicesV3({ data }: ServicesProps) {

  const services = data?.services ?? [];
  if (!services.length) return null;

  const heading = data?.heading;
  const label = heading?.label ?? "";
  const title = extractPlainText(heading?.title) || "";
  const description = extractPlainText(heading?.description) || "";

  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title);

  return (
    <Section >
      <Container>
        {/* Top Header */}
        <div className="flex flex-col items-center text-center ">
          <SectionHeaderResolver 
            variant={heading?.variant}
            align="center"
            badge={label}
            title={titleBase}
            titleHighlight={titleHighlight}
            description={description}
            descriptionClassName="text-lg text-foreground/80"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const desc = extractPlainText(service.description);
            const href = service.link?.link;
            const linkLabel = service.link?.label;
            const className = "group relative p-8 md:p-6 xl:p-5 bg-transparent border-x border-slate-200 flex flex-col -ml-px transition-all duration-500 hover:bg-slate-50/50 border-x-1 border-dashed border-gray-200";

            const cardContent = (
              <>
                {/* <div className="absolute group-hover:opacity-80 opacity-0 transition-opacity ease-in inset-0 bg-[radial-gradient(var(--color-neutral-300)_1px,transparent_1px)]  mask-radial-from-5% bg-size-[10px_10px] shadow-xl"></div> */}
                {/* The left highlight mark: ~30% from the top */}
                <div className="absolute left-[-1px] top-[23%] w-[2px] h-6 bg-primary rounded-r-md transition-colors duration-300 group-hover:bg-black z-10" />

                {/* Icon */}
                <div className="mb-3">
                  <ServiceIcon
                    service={service}
                    className="size-5 text-neutral-500 transition-transform duration-500 "
                  />
                </div>

                {/* Content */}
                {/* <h3 className="text-[20px] font-bold text-foreground mb-2 tracking-tight">
                  {service.title}
                </h3> */}
                <H3 className="mb-2 ">{service.title}</H3>
                <p className="text-neutral-700 text-sm sm:text-base text-pretty line-clamp-3 leading-relaxed flex-1">
                  {desc}
                </p>

                {/* Minimalistic Action Link */}
                {href && linkLabel && (
                  <div className="mt-8 flex items-center gap-1 text-[15px] font-semibold text-neutral-800 transition-colors duration-300 group-hover:text-primary">
                    <span className="border-b border-neutral-300 pb-[2px] transition-colors duration-300 group-hover:border-primary/40">
                      {linkLabel}
                    </span>
                    <svg
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M7 7h10v10"
                      />
                    </svg>
                  </div>
                )}
              </>
            );

            return href ? (
              <Link key={service.id} href={href} className={className}>
                {cardContent}
              </Link>
            ) : (
              <div key={service.id} className={className}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
