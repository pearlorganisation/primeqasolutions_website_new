import React from "react";

import { cn } from "@/lib/utils/utils";

import {
  FaExclamation,
  FaCheck,
  FaTimes,
  FaInfo,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

import type {
  StrapiInlineNode,
  StrapiLinkNode,
  StrapiRichTextBlock,
  StrapiTextNode,
} from "@/types/home";

function parseCustomIcon(rawText: string) {
  const match = rawText.match(/^\[(ar|!|v|x|i|\*)\]\s*/);

  if (!match) return null;

  const symbol = match[1];

  let Icon = FaCheck;
  let bgClass = "bg-primary/80";

  if (symbol === "ar") {
    Icon = FaArrowRight;
    bgClass = "bg-primary/80";
  } else if (symbol === "!") {
    Icon = FaExclamation;
    bgClass = "bg-primary/80";
  } else if (symbol === "x") {
    Icon = FaTimes;
    bgClass = "bg-primary/80";
  } else if (symbol === "i") {
    Icon = FaInfo;
    bgClass = "bg-primary/80";
  } else if (symbol === "*") {
    Icon = FaStar;
    bgClass = "bg-primary/80";
  }

  return { Icon, bgClass, symbol };
}

function renderInlineNode(
  node: StrapiInlineNode,
  path: string
): React.ReactNode {
  if (node.type === "link") {
    const linkNode = node as StrapiLinkNode;

    return (
      <a
        key={path}
        href={linkNode.url}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkNode.children.map((child, i) =>
          renderTextNode(child, `${path}-${i}`)
        )}
      </a>
    );
  }

  return renderTextNode(node as StrapiTextNode, path);
}

function renderTextNode(
  node: StrapiTextNode,
  path: string
): React.ReactNode {
  let content: React.ReactNode = node.text;

  if (node.code) {
    content = (
      <code
        key={`code-${path}`}
        className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.875em] text-neutral-700"
      >
        {content}
      </code>
    );
  }

  if (node.bold) {
    content = (
      <strong
        key={`b-${path}`}
        className="font-semibold text-neutral-700"
      >
        {content}
      </strong>
    );
  }

  if (node.italic) content = <em key={`i-${path}`}>{content}</em>;

  if (node.underline) content = <u key={`u-${path}`}>{content}</u>;

  if (node.strikethrough) {
    content = <s key={`s-${path}`}>{content}</s>;
  }

  return <React.Fragment key={path}>{content}</React.Fragment>;
}

function removeCustomIcon(text: string) {
  return text.replace(/^\[(ar|!|v|x|i|\*)\]\s*/, "");
}

function renderBlock(
  block: StrapiRichTextBlock,
  index: number
): React.ReactNode {
  const key = `block-${index}`;

  const children = block.children.map((child, i) =>
    renderInlineNode(child, `${key}-${i}`)
  );

  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;

      const Tag = `h${level}` as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6";

      const sizeMap: Record<number, string> = {
        1: "text-4xl font-extrabold tracking-tight",
        2: "text-3xl font-bold tracking-tight",
        3: "text-2xl font-bold",
        4: "text-xl font-semibold",
        5: "text-lg font-semibold",
        6: "text-base font-semibold",
      };

      return (
        <Tag
          key={key}
          className={cn(
            sizeMap[level] ?? sizeMap[2],
            "text-neutral-900 mb-4 leading-tight"
          )}
        >
          {children}
        </Tag>
      );
    }

    case "list": {
      const listItems = block.children.map((child, i) =>
        renderBlock(child as any, i)
      );

      if (block.format === "ordered") {
        return (
          <ol
            key={key}
            className="list-decimal list-outside pl-5 mb-4 space-y-2 text-foreground-600 text-lg"
          >
            {listItems}
          </ol>
        );
      }

      return (
        <ul
          key={key}
          className="list-disc list-outside pl-5 mb-4 space-y-2 text-foreground-600 text-lg"
        >
          {listItems}
        </ul>
      );
    }

    case "list-item": {
      const firstChild = block.children[0];

      const rawText =
        firstChild && firstChild.type === "text"
          ? (firstChild as StrapiTextNode).text
          : "";

      const customIcon = parseCustomIcon(rawText);

      if (customIcon) {
        const { Icon, bgClass, symbol } = customIcon;

        const cleanChildren = block.children
          .map((child, i) => {
            if (i === 0 && child.type === "text") {
              return {
                ...child,
                text: removeCustomIcon(
                  (child as StrapiTextNode).text
                ),
              };
            }

            return child;
          })
          .map((child, i) =>
            renderInlineNode(child, `${key}-${i}`)
          );

        return (
          <li
            key={key}
            className="flex gap-2.5 items-start mb-1 list-none!"
          >
            <div
              className={cn(
                "shrink-0 size-[18px] mt-[0.3em] flex items-center justify-center rounded-sm text-white",
                bgClass
              )}
            >
              <Icon className="size-2.5" />
            </div>

            <div className="text-neutral-700 leading-relaxed flex-1">
              {cleanChildren}
            </div>
          </li>
        );
      }

      return <li key={key}>{children}</li>;
    }

    case "quote":
      return (
        <blockquote
          key={key}
          className="shadow-[inset_3px_0_0_rgba(37,99,235,0.4)] pl-4 italic text-foreground-500 mb-6 text-lg"
        >
          {children}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={key}
          className="rounded-lg bg-neutral-900 text-neutral-100 p-4 mb-4 overflow-x-auto font-mono text-sm"
        >
          <code>{children}</code>
        </pre>
      );

    case "paragraph":
    default: {
      const firstChild = block.children[0];

      const rawText =
        firstChild && firstChild.type === "text"
          ? (firstChild as StrapiTextNode).text
          : "";

      const customIcon = parseCustomIcon(rawText);

      if (customIcon) {
        const { Icon, bgClass, symbol } = customIcon;

        const cleanChildren = block.children
          .map((child, i) => {
            if (i === 0 && child.type === "text") {
              return {
                ...child,
                text: removeCustomIcon(
                  (child as StrapiTextNode).text
                ),
              };
            }

            return child;
          })
          .map((child, i) =>
            renderInlineNode(child, `${key}-${i}`)
          );

        return (
          <div
            key={key}
            className="flex gap-2.5 items-start mb-3"
          >
            <div
              className={cn(
                "shrink-0 size-[18px] mt-[0.3em] flex items-center justify-center rounded-sm text-white",
                bgClass
              )}
            >
              <Icon className="size-2.5" />
            </div>

            <div className="text-neutral-700 leading-relaxed flex-1">
              {cleanChildren}
            </div>
          </div>
        );
      }

      return (
        <p
          key={key}
          className="text-foreground-600 leading-relaxed mb-4 text-sm"
        >
          {children}
        </p>
      );
    }
  }
}

interface StrapiBlockRendererProps {
  blocks: StrapiRichTextBlock[];
  className?: string;
  tag?: React.ElementType;
}

export function StrapiBlockRenderer({
  blocks,
  className,
  tag,
}: StrapiBlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const Tag = tag || "div";

  return (
    <Tag className={cn("strapi-blocks", className)}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </Tag>
  );
}

export type { StrapiRichTextBlock };