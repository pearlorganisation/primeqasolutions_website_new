"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils/utils";
import React from "react";

interface CaseStudyMarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Case Study Specific Markdown Renderer
 * ──────────────────────────────────────
 * Custom styles for headings, paragraphs, and lists to match the 
 * premium Case Study aesthetic.
 */
export function CaseStudyMarkdownRenderer({ content, className }: CaseStudyMarkdownRendererProps) {
  return (
    <div className={cn("case-study-markdown", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Heading 2 - The primary section header
          h2: ({ node: _node, ...props }) => (
            <h2 className="text-[1.75rem] font-semibold text-neutral-900 tracking-tight leading-snug mb-4 first:mt-0">
              {props.children}
            </h2>
          ),

          // Heading 3 - Subheaders
          h3: ({ node: _node, ...props }) => (
            <h3 className="text-[1.25rem] font-bold text-neutral-900 tracking-tight leading-snug mt-10 mb-4">
              {props.children}
            </h3>
          ),

          // Paragraphs
          p: ({ node: _node, ...props }) => (
            <p className="text-[16px] text-neutral-700 leading-relaxed mb-6 last:mb-0">
              {props.children}
            </p>
          ),

          // Lists
          ul: ({ node: _node, ...props }) => (
            <ul className="flex flex-col gap-2 mb-6 last:mb-0">{props.children}</ul>
          ),

          li: ({ node: _node, ...props }) => {
            const childrenArray = React.Children.toArray(props.children);
            const firstChild = childrenArray[0];
            const rawText = typeof firstChild === "string" ? firstChild : "";

            const isChallenge = rawText.startsWith("[!]");
            const isSuccess = rawText.startsWith("[v]");

            if (isChallenge || isSuccess) {
              const Icon = isChallenge ? FaExclamationCircle : FaCheckCircle;
              const colorClass = isChallenge ? "text-red-500" : "text-emerald-500";

              const cleanChildren = React.Children.map(props.children, (child, i) => {
                if (i === 0 && typeof child === "string") {
                  return child.replace(/^\[(!|v)\]\s*/, "");
                }
                return child;
              });

              return (
                <li className="flex gap-2.5 items-start mb-1">
                  <div className={cn("shrink-0 size-5 mt-[0.3em]", colorClass)}>
                    <Icon className="size-full" />
                  </div>
                  <div className="text-[16px] text-neutral-700 leading-7">
                    {cleanChildren}
                  </div>
                </li>
              );
            }

            // Default browser-style list item
            return (
              <li className="list-disc ml-6 text-[16px] text-neutral-700 leading-7 mb-1">
                {props.children}
              </li>
            );
          },

          // Bold text
          strong: ({ node: _node, ...props }) => (
            <strong className="font-bold text-neutral-800">{props.children}</strong>
          ),

          // Blockquotes
          blockquote: ({ node: _node, ...props }) => (
            <blockquote className="shadow-[inset_3px_0_0_var(--primary)] bg-neutral-50 rounded-r-xl px-6 py-5 italic text-neutral-700 my-8">
              {props.children}
            </blockquote>
          ),

          // Tables
          table: ({ node: _node, ...props }) => (
            <div className="overflow-x-auto my-10 border border-neutral-200 custom-scrollbar shadow-sm">
              <table className="w-full text-left border-collapse min-w-full" {...props} />
            </div>
          ),
          thead: ({ node: _node, ...props }) => (
            <thead className="bg-neutral-50 border-b border-neutral-200" {...props} />
          ),
          th: ({ node: _node, ...props }) => (
            <th
              className={cn(
                "px-4 py-3 text-[0.8125rem] font-bold text-neutral-900 uppercase tracking-[0.05em] border-r border-neutral-200 last:border-r-0",
                props.style?.textAlign === "center" && "text-center",
                props.style?.textAlign === "right" && "text-right"
              )}
              {...props}
            />
          ),
          tbody: ({ node: _node, ...props }) => (
            <tbody className="bg-white divide-y divide-neutral-200" {...props} />
          ),
          td: ({ node: _node, ...props }) => (
            <td
              className={cn(
                "px-4 py-3 text-[0.9375rem] text-neutral-600 leading-relaxed border-r border-neutral-200 last:border-r-0",
                props.style?.textAlign === "center" && "text-center",
                props.style?.textAlign === "right" && "text-right"
              )}
              {...props}
            />
          ),
          tr: ({ node: _node, ...props }) => (
            <tr className="even:bg-neutral-50/80 hover:bg-neutral-100/30 transition-colors group" {...props} />
          ),
          pre: ({ node: _node, ...props }) => (
            <pre className="w-full max-w-full overflow-hidden" {...props} />
          ),
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            
            if (!match) {
              return (
                <code className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded-md text-[0.875rem] font-mono break-words whitespace-pre-wrap" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="overflow-x-auto my-6 bg-[#1e1e1e] rounded-xl border border-neutral-800 p-4 shadow-lg text-[0.875rem] font-mono text-neutral-200">
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
