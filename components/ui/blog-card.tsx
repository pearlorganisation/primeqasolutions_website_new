"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { FaArrowRight } from "react-icons/fa";
import { H3 } from "./typography";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "listing";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "listing") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-start hover:bg-neutral-200/5 justify-between py-6 border-b border-neutral-200/60 last:border-0 cursor-pointer"
      >
        {/* Left Side: Title & Excerpt */}
        <div className="flex-1 flex flex-col gap-1 min-w-0 pr-6">
          {/* <h3 className="text-[1.0625rem] font-semibold text-neutral-800 group-hover:text-primary transition-colors duration-200 leading-snug">
            {post.title}
          </h3> */}
          <H3>{post.title}</H3>
          <p className="text-[0.875rem] text-neutral-400 font-normal leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Right Side: Published Date */}
        <span className="text-[0.8125rem] text-neutral-400 font-normal shrink-0 mt-0.5 select-none">
          {post.published}
        </span>
      </Link>
    );
  }

  // Default Variant (vertical box card for grid layouts)
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer"
    >
      <div className="flex flex-col">
        {/* Top Category & Read Time */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            {post.category}
          </span>
          <span className="text-neutral-300 text-[11px]">•</span>
          <span className="text-[11px] font-semibold text-neutral-400">
            {post.readTime}
          </span>
        </div>

        {/* Title & Excerpt */}
        <h3 className="text-[1.125rem] font-bold text-neutral-900 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[0.875rem] text-neutral-500 leading-relaxed line-clamp-2 mt-2">
          {post.excerpt}
        </p>
      </div>

      {/* Bottom Info: Author & Action Link */}
      <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-neutral-100 text-xs shrink-0">
        <span className="font-semibold text-neutral-600">By {post.author.name}</span>
        <div className="inline-flex items-center gap-1.5 font-bold text-primary/80 group-hover:text-primary transition-colors duration-200">
          <span>Read Post</span>
          <FaArrowRight className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
