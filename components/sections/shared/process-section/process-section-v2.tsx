
// "use client";

// import React from "react";
// import { Container, Section } from "@/components/ui/container";
// import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
// import {
//   FaRegClock,
//   FaUsers,
//   FaTasks,
//   FaCheckCircle,
// } from "react-icons/fa";
// import type { ProcessSectionProps } from "./types";
// import { extractPlainText, toAbsUrl } from "./utils";
// import { cn } from "@/lib/utils/utils";
// import Image from "next/image";
// import type { StrapiProcessSubBlockItem } from "@/types/service";
// import { m } from "motion/react";

// /* ========================================================= */
// /* TYPES */
// /* ========================================================= */

// type RichTextNode = {
//   id?: string | number;
//   type?: string;
//   text?: string;
//   bold?: boolean;
//   level?: 1 | 2 | 3 | 4 | 5 | 6;
//   format?: "ordered" | "unordered";
//   url?: string;
//   children?: RichTextNode[];
// };

// /* ========================================================= */
// /* RICH TEXT HELPERS */
// /* ========================================================= */

// function getRichTextKey(
//   node: RichTextNode,
//   fallback: string
// ): string {
//   return String(
//     node.id ??
//     node.url ??
//     node.text ??
//     fallback
//   );
// }

// function renderInlineNode(
//   node: RichTextNode,
//   index: number
// ): React.ReactNode {
//   const key = getRichTextKey(
//     node,
//     `inline-${index}`
//   );

//   if (node.type === "link") {
//     return (
//       <a
//         key={key}
//         href={node.url}
//         className="text-primary underline underline-offset-2"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         {node.children?.map(renderInlineNode)}
//       </a>
//     );
//   }

//   let content: React.ReactNode =
//     node.text ??
//     node.children?.map(renderInlineNode) ??
//     "";

//   if (node.bold) {
//     content = (
//       <strong className="font-semibold text-neutral-900">
//         {content}
//       </strong>
//     );
//   }

//   return (
//     <React.Fragment key={key}>
//       {content}
//     </React.Fragment>
//   );
// }

// function renderRichTextBlock(
//   block: RichTextNode,
//   index: number,
//   variant: "body" | "detail"
// ): React.ReactNode {
//   const key = getRichTextKey(
//     block,
//     `block-${index}`
//   );

//   const children =
//     block.children?.map(renderInlineNode) ?? null;

//   const textSize =
//     variant === "body"
//       ? "text-sm"
//       : "text-[11px]";

//   /* Heading */

//   if (block.type === "heading") {
//     return (
//       <h6
//         key={key}
//         className={cn(
//           "font-semibold leading-snug text-neutral-900",
//           textSize
//         )}
//       >
//         {children}
//       </h6>
//     );
//   }

//   /* List */

//   if (block.type === "list") {
//     const ListTag =
//       block.format === "ordered"
//         ? "ol"
//         : "ul";

//     return (
//       <ListTag
//         key={key}
//         className={cn(
//           "space-y-1 pl-4 leading-5",
//           block.format === "ordered"
//             ? "list-decimal"
//             : "list-disc",
//           "list-outside text-neutral-500 marker:text-neutral-400",
//           textSize
//         )}
//       >
//         {block.children?.map(
//           (item, itemIndex) => {
//             const itemChildren =
//               item.type === "list-item"
//                 ? item.children
//                 : [item];

//             return (
//               <li
//                 key={getRichTextKey(
//                   item,
//                   `item-${itemIndex}`
//                 )}
//               >
//                 {itemChildren?.map(
//                   renderInlineNode
//                 )}
//               </li>
//             );
//           }
//         )}
//       </ListTag>
//     );
//   }

//   /* List item */

//   if (block.type === "list-item") {
//     return (
//       <li key={key}>
//         {children}
//       </li>
//     );
//   }

//   /* Paragraph */

//   return (
//     <p
//       key={key}
//       className={cn(
//         "leading-5 text-neutral-500",
//         textSize
//       )}
//     >
//       {children}
//     </p>
//   );
// }

// function RichTextBlocks({
//   blocks,
//   variant = "detail",
// }: {
//   blocks?: unknown;
//   variant?: "body" | "detail";
// }) {
//   if (
//     !Array.isArray(blocks) ||
//     blocks.length === 0
//   ) {
//     return null;
//   }

//   return (
//     <div className="space-y-1.5">
//       {blocks.map((block, index) =>
//         block &&
//           typeof block === "object"
//           ? renderRichTextBlock(
//             block as RichTextNode,
//             index,
//             variant
//           )
//           : null
//       )}
//     </div>
//   );
// }

// /* ========================================================= */
// /* SUB BLOCK HEADING */
// /* ========================================================= */

// function getSubBlockHeading(
//   item: StrapiProcessSubBlockItem | undefined,
//   fallback: string
// ): string {
//   return item?.title || fallback;
// }

// /* ========================================================= */
// /* DETAIL ICONS */
// /* ========================================================= */

// const detailIconStyles = [
//   {
//     className:
//       "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400",
//     Icon: FaTasks,
//   },
//   {
//     className:
//       "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400",
//     Icon: FaUsers,
//   },
//   {
//     className:
//       "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400",
//     Icon: FaRegClock,
//   },
// ] as const;

// /* ========================================================= */
// /* MAIN COMPONENT */
// /* ========================================================= */

// export function ProcessSectionV2({
//   data,
//   className,
// }: ProcessSectionProps) {
//   const heading = data?.heading;
//   const items = data?.process_items || [];

//   const label = heading?.label || "";

//   const titleText = extractPlainText(
//     heading?.title
//   );

//   const description = extractPlainText(
//     heading?.description
//   );

//   return (
//     <Section
//       className={cn(
//         "overflow-hidden bg-white py-16 lg:py-24",
//         className
//       )}
//     >
//       <Container>
//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}

//         <SectionHeaderResolver
//           variant={heading?.variant}
//           align={heading?.align || "left"}
//           badge={label}
//           title={titleText}
//           description={description}
//         />

//         {/* ================================================= */}
//         {/* CARD GRID */}
//         {/* ================================================= */}

//         <div className="mt-14">
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-5
//               sm:grid-cols-2
//               lg:grid-cols-3
//             "
//           >
//             {items.map(
//               (step: any, index: number) => (
//                 <ProcessCard
//                   key={
//                     step.id ??
//                     `${step.title}-${index}`
//                   }
//                   step={step}
//                   index={index}
//                 />
//               )
//             )}
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// }

// /* ========================================================= */
// /* PROCESS CARD */
// /* ========================================================= */

// interface ProcessCardProps {
//   step: any;
//   index: number;
// }

// function ProcessCard({
//   step,
//   index,
// }: ProcessCardProps) {
//   const subBlocks =
//     step.sub_block_items || [];

//   return (
//     <m.div
//       initial={{
//         opacity: 0,
//         y: 20,
//       }}
//       whileInView={{
//         opacity: 1,
//         y: 0,
//       }}
//       viewport={{
//         once: true,
//         margin: "-50px",
//       }}
//       transition={{
//         duration: 0.45,
//         delay: Math.min(index * 0.05, 0.25),
//         ease: "easeOut",
//       }}
//       className="
//         group
//         relative
//         h-full
//       "
//     >
//       {/* ================================================= */}
//       {/* CARD */}
//       {/* ================================================= */}

//       <div
//         className="
//           relative
//           flex
//           h-full
//           min-h-[220px]
//           flex-col
//           overflow-hidden
//           rounded-2xl
//           bg-cream
//           p-3
//           shadow-sm
//           transition-all
//           duration-300
//           hover:brightness-[0.97]
//           sm:p-4
//         "
//       >
//         {/* ================================================= */}
//         {/* SECONDARY ACCENT */}
//         {/* ================================================= */}

//         <div
//           className="
//             absolute
//             left-0
//             right-0
//             top-0
//             h-1
//             bg-secondary
//           "
//         />

//         {/* ================================================= */}
//         {/* CARD CONTENT */}
//         {/* ================================================= */}

//         <div className="flex flex-1 flex-col pt-2">
//           {/* Phase */}

//           <span className="   text-xs   font-bold   uppercase   tracking-[0.15em]   text-secondary"
//           >
//             Phase {String(index + 1).padStart(2, "0")}
//           </span>

//           {/* Title */}

//           <h3 className="   mt-2   text-base   font-semibold   leading-snug   tracking-tight   text-neutral-950 "
//           >
//             {step.title}
//           </h3>

//           {/* Description */}

//           {step.description && (
//             <div className="   mt-3   text-sm   leading-5   text-neutral-500 "
//             >
//               <RichTextBlocks
//                 blocks={step.description}
//                 variant="detail"
//               />
//             </div>
//           )}

//           {subBlocks.length > 0 && (
//             <div className="mt-5 space-y-3"
//             >
//               {subBlocks.map(
//                 (
//                   subItem: StrapiProcessSubBlockItem,
//                   subIndex: number
//                 ) => {
//                   const icon =
//                     detailIconStyles[
//                     subIndex %
//                     detailIconStyles.length
//                     ];

//                   const Icon = icon.Icon;

//                   return (
//                     <div
//                       key={subItem.id ?? subItem.title ?? subItem.label ?? subIndex}
//                       className=" flex items-center gap-2"
//                     >
//                       {/* Icon */}

//                       <div
//                         className={cn(
//                           "flex size-7 shrink-0 items-center justify-center rounded-lg",
//                           icon.className
//                         )}
//                       >
//                         <Icon className="size-3.5" />
//                       </div>

//                       {/* Text */}

//                       <div className="min-w-0">
//                         <h4 className="text-xs font-semibold  leading-4 text-neutral-900"
//                         >
//                           {getSubBlockHeading(
//                             subItem,
//                             `Detail ${subIndex + 1
//                             }`
//                           )}
//                         </h4>

//                         {subItem.label && (
//                           <span className=" mt-0.5 block text-[10px] font-medium text-secondary ">
//                             {subItem.label}
//                           </span>
//                         )}

//                         {subItem.description && (
//                           <div className="   mt-0.5   text-[11px]   leading-4   text-neutral-500 "
//                           >
//                             <RichTextBlocks
//                               blocks={
//                                 subItem.description
//                               }
//                               variant="detail"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* FALLBACK ICON */}
//           {/* ================================================= */}

//           {subBlocks.length === 0 && (
//             <div className="mt-auto flex size-8 items-center justify-center rounded-lg bg-white/60"
//             >
//               {step.icon?.url ? (
//                 <Image
//                   src={toAbsUrl(
//                     step.icon.url
//                   )}
//                   alt={
//                     step.icon
//                       ?.alternativeText ||
//                     step.title ||
//                     `Phase ${index + 1}`
//                   }
//                   width={18}
//                   height={18}
//                   className=" size-4 object-contain " />
//               ) : (
//                 <FaCheckCircle className="size-4 text-secondary" />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </m.div>
//   );
// }

"use client";

import React from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import {
  FaRegClock,
  FaUsers,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";
import type { ProcessSectionProps } from "./types";
import { extractPlainText, toAbsUrl } from "./utils";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import type { StrapiProcessSubBlockItem } from "@/types/service";
import { m } from "motion/react";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type RichTextNode = {
  id?: string | number;
  type?: string;
  text?: string;
  bold?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  url?: string;
  children?: RichTextNode[];
};

/* ========================================================= */
/* RICH TEXT HELPERS */
/* ========================================================= */

function getRichTextKey(
  node: RichTextNode,
  fallback: string
): string {
  return String(
    node.id ??
    node.url ??
    node.text ??
    fallback
  );
}

function renderInlineNode(
  node: RichTextNode,
  index: number
): React.ReactNode {
  const key = getRichTextKey(
    node,
    `inline-${index}`
  );

  if (node.type === "link") {
    return (
      <a
        key={key}
        href={node.url}
        className="text-primary underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.children?.map(renderInlineNode)}
      </a>
    );
  }

  let content: React.ReactNode =
    node.text ??
    node.children?.map(renderInlineNode) ??
    "";

  if (node.bold) {
    content = (
      <strong className="font-semibold text-primary">
        {content}
      </strong>
    );
  }

  return (
    <React.Fragment key={key}>
      {content}
    </React.Fragment>
  );
}

function renderRichTextBlock(
  block: RichTextNode,
  index: number,
  variant: "body" | "detail"
): React.ReactNode {
  const key = getRichTextKey(
    block,
    `block-${index}`
  );

  const children =
    block.children?.map(renderInlineNode) ?? null;

  const textSize =
    variant === "body"
      ? "text-sm md:text-base"
      : "text-[11px]";

  /* ======================================================= */
  /* HEADING */
  /* ======================================================= */

  if (block.type === "heading") {
    return (
      <h6
        key={key}
        className={cn(
          "font-semibold leading-snug text-primary",
          textSize
        )}
      >
        {children}
      </h6>
    );
  }

  /* ======================================================= */
  /* LIST */
  /* ======================================================= */

  if (block.type === "list") {
    const ListTag =
      block.format === "ordered"
        ? "ol"
        : "ul";

    return (
      <ListTag
        key={key}
        className={cn(
          "space-y-1 pl-4 leading-5",
          block.format === "ordered"
            ? "list-decimal"
            : "list-disc",
          "list-outside text-secondary marker:text-secondary",
          textSize
        )}
      >
        {block.children?.map(
          (item, itemIndex) => {
            const itemChildren =
              item.type === "list-item"
                ? item.children
                : [item];

            return (
              <li
                key={getRichTextKey(
                  item,
                  `item-${itemIndex}`
                )}
                className="pl-0.5"
              >
                {itemChildren?.map(
                  renderInlineNode
                )}
              </li>
            );
          }
        )}
      </ListTag>
    );
  }

  /* ======================================================= */
  /* LIST ITEM */
  /* ======================================================= */

  if (block.type === "list-item") {
    return (
      <li
        key={key}
        className="text-secondary"
      >
        {children}
      </li>
    );
  }

  /* ======================================================= */
  /* PARAGRAPH */
  /* ======================================================= */

  return (
    <p
      key={key}
      className={cn(
        "leading-6 text-secondary",
        textSize
      )}
    >
      {children}
    </p>
  );
}

function RichTextBlocks({
  blocks,
  variant = "detail",
}: {
  blocks?: unknown;
  variant?: "body" | "detail";
}) {
  if (
    !Array.isArray(blocks) ||
    blocks.length === 0
  ) {
    return null;
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, index) =>
        block &&
          typeof block === "object"
          ? renderRichTextBlock(
            block as RichTextNode,
            index,
            variant
          )
          : null
      )}
    </div>
  );
}

/* ========================================================= */
/* SUB BLOCK HEADING */
/* ========================================================= */

function getSubBlockHeading(
  item: StrapiProcessSubBlockItem | undefined,
  fallback: string
): string {
  return item?.title || fallback;
}

/* ========================================================= */
/* DETAIL ICONS */
/* ========================================================= */

const detailIconStyles = [
  {
    className:
      "bg-blue-50 text-blue-600",
    Icon: FaTasks,
  },
  {
    className:
      "bg-indigo-50 text-indigo-600",
    Icon: FaUsers,
  },
  {
    className:
      "bg-emerald-50 text-emerald-600",
    Icon: FaRegClock,
  },
] as const;

/* ========================================================= */
/* MAIN COMPONENT */
/* ========================================================= */

export function ProcessSectionV2({
  data,
  className,
}: ProcessSectionProps) {
  const heading = data?.heading;
  const items = data?.process_items || [];

  const label = heading?.label || "";

  const titleText = extractPlainText(
    heading?.title
  );

  const description = extractPlainText(
    heading?.description
  );

  return (
    <Section
      className={cn(
        "overflow-hidden bg-white py-16 lg:py-24",
        className
      )}
    >
      <Container>
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <SectionHeaderResolver
          variant={heading?.variant}
          align={heading?.align || "left"}
          badge={label}
          title={titleText}
          description={description}
        />

        {/* ================================================= */}
        {/* PROCESS LIST */}
        {/* ================================================= */}

        <div className="mt-14 w-full">
          <div className="divide-y divide-secondary/20">
            {items.map(
              (step: any, index: number) => (
                <ProcessTimelineItem
                  key={
                    step.id ??
                    `${step.title}-${index}`
                  }
                  step={step}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================= */
/* PROCESS ITEM */
/* ========================================================= */

interface ProcessTimelineItemProps {
  step: any;
  index: number;
}

function ProcessTimelineItem({
  step,
  index,
}: ProcessTimelineItemProps) {
  const number = String(
    step.no ?? index + 1
  ).padStart(2, "0");

  const subBlocks =
    step.sub_block_items || [];

  return (
    <m.div
      id={`process-phase-${index + 1}`}
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(
          index * 0.05,
          0.25
        ),
        ease: "easeOut",
      }}
      className="
        group
        relative
        w-full
        py-8
        lg:py-10
      "
    >
      {/* ================================================= */}
      {/* 3 COLUMN LAYOUT */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[100px_minmax(220px,0.8fr)_minmax(0,1.7fr)]
          lg:gap-10
          xl:grid-cols-[120px_minmax(260px,0.8fr)_minmax(0,1.7fr)]
          xl:gap-14
        "
      >
        {/* ================================================= */}
        {/* COLUMN 1 — PHASE */}
        {/* ================================================= */}

        <div className="flex items-start">
          <div>
            {/* Phase Label */}

            <span
              className="
                mb-2
                block
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-secondary
                md:text-sm
                lg:text-base
              "
            >
              Phase
            </span>

            {/* Phase Number */}

            <span
              className="
                block
                text-xl
                font-semibold
                leading-none
                tracking-tight
                text-secondary/30
                transition-colors
                duration-300
                group-hover:text-secondary
                md:text-2xl
                lg:text-3xl
              "
            >
              {number}
            </span>
          </div>
        </div>

        {/* ================================================= */}
        {/* COLUMN 2 — TITLE */}
        {/* ================================================= */}

        <div className="flex items-start">
          <div>
            <h3
              className="
                max-w-sm
                text-lg
                font-semibold
                leading-snug
                tracking-tight
                text-primary
                transition-colors
                duration-300
                group-hover:text-primary
                md:text-xl
                lg:text-2xl
              "
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* ================================================= */}
        {/* COLUMN 3 — DESCRIPTION + DETAILS */}
        {/* ================================================= */}

        <div className="min-w-0">
          {/* Description */}

          {step.description && (
            <div
              className="
                max-w-xl
                text-sm
                leading-6
                text-secondary
                md:text-base
              "
            >
              <RichTextBlocks
                blocks={step.description}
                variant="body"
              />
            </div>
          )}

          {/* ================================================= */}
          {/* SUB BLOCKS */}
          {/* ================================================= */}

          {subBlocks.length > 0 && (
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-start
                justify-between
                gap-4
              "
            >
              {subBlocks.map(
                (
                  subItem: StrapiProcessSubBlockItem,
                  subIndex: number
                ) => {
                  const icon =
                    detailIconStyles[
                    subIndex %
                    detailIconStyles.length
                    ];

                  const Icon = icon.Icon;

                  return (
                    <div
                      key={
                        subItem.id ??
                        subItem.title ??
                        subItem.label ??
                        subIndex
                      }
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      {/* Actual Icon */}

                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg",
                          icon.className
                        )}
                      >
                        <Icon className="size-5" />
                      </div>

                      {/* Text */}

                      <div className="min-w-0">
                        <h4
                          className="
                            text-sm
                            font-semibold
                            leading-4
                            text-primary
                          "
                        >
                          {getSubBlockHeading(
                            subItem,
                            `Detail ${subIndex + 1
                            }`
                          )}
                        </h4>

                        {subItem.label && (
                          <span
                            className="
                              mt-0.5
                              block
                              text-xs
                              font-medium
                              text-secondary
                            "
                          >
                            {subItem.label}
                          </span>
                        )}

                        {subItem.description && (
                          <div
                            className="
                              mt-0.5
                              text-[11px]
                              leading-4
                              text-secondary
                            "
                          >
                            <RichTextBlocks
                              blocks={
                                subItem.description
                              }
                              variant="detail"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* ================================================= */}
          {/* FALLBACK ICON */}
          {/* ================================================= */}

          {subBlocks.length === 0 && (
            <div className="mt-5">
              {step.icon?.url ? (
                <div
                  className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-cream
                  "
                >
                  <Image
                    src={toAbsUrl(
                      step.icon.url
                    )}
                    alt={
                      step.icon
                        ?.alternativeText ||
                      step.title ||
                      `Phase ${number}`
                    }
                    width={18}
                    height={18}
                    className="
                      size-4
                      object-contain
                    "
                  />
                </div>
              ) : (
                <div
                  className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-cream
                  "
                >
                  <FaCheckCircle className="size-4 text-secondary" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}