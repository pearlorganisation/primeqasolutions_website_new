"use client";

import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

export function CodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl overflow-hidden group border border-slate-700/60 bg-[#1e1e1e] shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-slate-700/50">
        <span className="text-[0.75rem] font-mono text-slate-300 lowercase">
          {language || "text"}
        </span>
        <button type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-transparent hover:border-slate-600 bg-white/5 hover:bg-white/10 text-slate-300 text-[0.75rem] font-medium transition-colors"
        >
          {copied ? <FaCheck className="size-3 text-green-400" /> : <FaRegCopy className="size-3 text-slate-400" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      
      {/* Code Content */}
      <div className="text-[14px] overflow-x-auto">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1.25rem 1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
