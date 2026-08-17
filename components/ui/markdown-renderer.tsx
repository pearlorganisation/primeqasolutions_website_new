import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { LazyCodeBlock } from "@/components/ui/lazy-code-block";
import { cn } from "@/lib/utils/utils";
import { BlogCta } from "@/components/ui/blog-cta";
import { FaExclamation, FaCheck, FaTimes, FaInfo, FaStar } from "react-icons/fa";

function parseCustomIcon(rawText: string) {
  const match = rawText.match(/^\[(!|v|x|i|\*)\]/);
  if (!match) return null;

  const symbol = match[1];
  let Icon = FaCheck;
  let bgClass = "bg-emerald-500";

  if (symbol === "!") {
    Icon = FaExclamation;
    bgClass = "bg-red-500";
  } else if (symbol === "x") {
    Icon = FaTimes;
    bgClass = "bg-rose-500";
  } else if (symbol === "i") {
    Icon = FaInfo;
    bgClass = "bg-blue-500";
  } else if (symbol === "*") {
    Icon = FaStar;
    bgClass = "bg-amber-500";
  }

  return { Icon, bgClass };
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const extractText = (node: any): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
};
const generateId = (children: any) =>
  extractText(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const idCounts = new Map<string, number>();

  const getUniqueId = (baseId: string) => {
    const count = idCounts.get(baseId) || 0;
    idCounts.set(baseId, count + 1);
    return count === 0 ? baseId : `${baseId}-${count}`;
  };

  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node: _node, ref: _ref, children, ...props }: any) => <h1 className="tracking-tight font-semibold text-[2.5rem] leading-tight mt-6 mb-4 text-neutral-900" id={getUniqueId(generateId(children))} {...props}>{children}</h1>,
          h2: ({ node: _node, ref: _ref, children, ...props }: any) => <h2 className="tracking-tight font-medium text-2xl mt-8 mb-4 pb-4 border-b border-neutral-200/60 text-neutral-900 leading-snug" id={getUniqueId(generateId(children))} {...props}>{children}</h2>,
          h3: ({ node: _node, ref: _ref, children, ...props }: any) => <h3 className="tracking-tight font-medium text-xl mt-5 mb-3 text-neutral-900 leading-snug" id={getUniqueId(generateId(children))} {...props}>{children}</h3>,
          h4: ({ node: _node, ref: _ref, children, ...props }: any) => <h4 className="tracking-tight font-medium text-lg mt-4 mb-2 text-neutral-900" id={getUniqueId(generateId(children))} {...props}>{children}</h4>,
          h5: ({ node: _node, ref: _ref, children, ...props }: any) => <h5 className="tracking-tight font-medium text-lg mt-4 mb-2 text-neutral-900" id={getUniqueId(generateId(children))} {...props}>{children}</h5>,
          h6: ({ node: _node, ref: _ref, children, ...props }: any) => <h6 className="tracking-tight font-medium text-base mt-4 mb-2 text-neutral-900" id={getUniqueId(generateId(children))} {...props}>{children}</h6>,
          p: ({ node: _node, ref: _ref, ...props }: any) => {
            const text = extractText(props.children).trim();
            const ctaMatch = text.match(/^\[CTA(.*)\]$/i);
            if (ctaMatch) {
              const attrsString = ctaMatch[1] || "";
              const titleMatch = attrsString.match(/title="([^"]+)"/i);
              const descMatch = attrsString.match(/desc="([^"]+)"/i);
              const btnTxtMatch = attrsString.match(/buttonText="([^"]+)"/i);
              const btnLnkMatch = attrsString.match(/buttonLink="([^"]+)"/i);
              return (
                <BlogCta
                  title={titleMatch ? titleMatch[1] : undefined}
                  desc={descMatch ? descMatch[1] : undefined}
                  buttonText={btnTxtMatch ? btnTxtMatch[1] : undefined}
                  buttonLink={btnLnkMatch ? btnLnkMatch[1] : undefined}
                />
              );
            }

            const customIcon = parseCustomIcon(text);
            if (customIcon) {
              const { Icon, bgClass } = customIcon;

              const cleanChildren = React.Children.map(props.children, (child, i) => {
                if (i === 0 && typeof child === "string") {
                  return child.replace(/^\s*\[(!|v|x|i|\*)\]\s*/, "");
                }
                return child;
              });

              return (
                <p className="flex gap-2.5 items-start mb-4 text-[16px] leading-7 py-0 pl-1 text-neutral-700" {...props}>
                  <span className={cn("shrink-0 size-[18px] mt-[0.3em] flex items-center justify-center rounded-sm text-white", bgClass)}>
                    <Icon className="size-2.5" />
                  </span>
                  <span className="leading-relaxed flex-1">
                    {cleanChildren}
                  </span>
                </p>
              );
            }

            return <p className="text-neutral-700 leading-relaxed mb-4 text-[16px]" {...props} />;
          },
          a: ({ node: _node, ref: _ref, children, ...props }: any) => (
            <a
              className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ node: _node, ref: _ref, ...props }: any) => (
            <span className="block my-8 rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm">
              <Image
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                alt={props.alt || ""}
                src={props.src || ""}
                width={1200}
                height={675}
                sizes="100vw"
                unoptimized
              />
            </span>
          ),
          blockquote: ({ node: _node, ref: _ref, ...props }: any) => (
            <blockquote className="shadow-[inset_3px_0_0_var(--primary)] bg-neutral-50 rounded-r-2xl px-8 py-6 italic text-neutral-700 my-6" {...props}>
              {props.children}
            </blockquote>
          ),
          strong: ({ node: _node, ref: _ref, ...props }: any) => <strong className="text-neutral-900 font-semibold" {...props} />,
          ul: ({ node: _node, ref: _ref, ...props }: any) => <ul className="list-disc space-y-2.5 mb-6 pl-5 text-neutral-700 text-[16px] leading-relaxed marker:text-neutral-400" {...props} />,
          ol: ({ node: _node, ref: _ref, ...props }: any) => <ol className="list-decimal space-y-2.5 mb-6 pl-5 text-neutral-700 text-[16px] leading-relaxed marker:text-neutral-400" {...props} />,
          li: ({ node: _node, ref: _ref, ...props }: any) => {
            const childrenArray = React.Children.toArray(props.children);
            const firstChild = childrenArray[0];
            const rawText = typeof firstChild === "string" ? firstChild : "";

            const customIcon = parseCustomIcon(rawText);

            if (customIcon) {
              const { Icon, bgClass } = customIcon;

              const cleanChildren = React.Children.map(props.children, (child, i) => {
                if (i === 0 && typeof child === "string") {
                  return child.replace(/^\s*\[(!|v|x|i|\*)\]\s*/, "");
                }
                return child;
              });

              return (
                <li className="flex gap-2.5 items-start mb-1 text-[16px] leading-7 py-0 pl-1 list-none! text-neutral-700" {...props}>
                  <div className={cn("shrink-0 size-[18px] mt-[0.3em] flex items-center justify-center rounded-sm text-white", bgClass)}>
                    <Icon className="size-2.5" />
                  </div>
                  <div className="leading-relaxed flex-1">
                    {cleanChildren}
                  </div>
                </li>
              );
            }

            return (
              <li className="text-[16px] leading-7 m-0 py-0 pl-1 text-neutral-700" {...props}>
                {props.children}
              </li>
            );
          },
          table: ({ node: _node, ref: _ref, ...props }: any) => (
            <div className="overflow-x-auto my-6 border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node: _node, ref: _ref, ...props }: any) => <thead className="bg-neutral-50/80 border-b border-neutral-200" {...props} />,
          th: ({ node: _node, ref: _ref, ...props }: any) => <th className="px-6 py-3.5 text-left text-[0.8125rem] font-bold text-neutral-800 uppercase tracking-wider border-r border-neutral-200 last:border-r-0" {...props} />,
          tbody: ({ node: _node, ref: _ref, ...props }: any) => <tbody className="bg-white divide-y divide-neutral-200/80 text-neutral-700 [&>*:nth-child(even)]:bg-neutral-50/80" {...props} />,
          td: ({ node: _node, ref: _ref, ...props }: any) => <td className="px-6 py-4 text-[0.9375rem] border-r border-neutral-200/80 last:border-r-0" {...props} />,
          pre: ({ node: _node, ref: _ref, ...props }: any) => (
            <div className="w-full max-w-full overflow-hidden" {...props} />
          ),
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            
            // Inline code
            if (!match) {
              return (
                <code className="text-primary bg-primary/5 px-1.5 py-0.5 rounded-md text-[0.875rem] font-semibold font-mono break-words whitespace-pre-wrap" {...props}>
                  {children}
                </code>
              );
            }

            const codeString = String(children).replace(/\n$/, "");

            // SSR-friendly fallback for SEO: plain <pre><code> with the raw text.
            // CodeBlock (with syntax highlighting) hydrates on top of this on the client.
            return (
              <>
                <noscript>
                  <pre className="my-8 rounded-xl overflow-auto bg-[#1e1e1e] p-5 text-neutral-200 text-sm font-mono leading-relaxed">
                    <code>{codeString}</code>
                  </pre>
                </noscript>
                <LazyCodeBlock language={match[1]} value={codeString} />
              </>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
