import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { H2 } from "./typography";

export interface BlogCtaProps {
  title?: string;
  desc?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function BlogCta({
  title = "Ready to ship better software, faster?",
  desc = "Partner with PrimeQA to build a scalable testing strategy that reduces time-to-market and eliminates production bugs. Let's discuss your project requirements.",
  buttonText = "Get a Free Estimate",
  buttonLink = "/contact-us",
  className,
}: BlogCtaProps) {
  return (
    <div
      className={cn(
        "my-12 rounded-xl p-8 sm:p-10 bg-primary! shadow-lg shadow-primary/20 text-center flex flex-col items-center border border-white/10",
        className
      )}
    >
      <H2 className="text-[1.5rem] sm:text-[1.75rem]! text-primary-foreground font-bold font-space tracking-tight mb-4 leading-tight">
        {title}
      </H2>
      <p className="text-primary-foreground/90 text-[0.9375rem] sm:text-[1rem] leading-relaxed max-w-2xl mb-8 font-medium">
        {desc}
      </p>
      <Link
        href={buttonLink}
        className="inline-flex items-center justify-center bg-white text-primary hover:bg-slate-50 font-semibold text-[0.9375rem] rounded-lg px-7 py-3 transition-colors shadow-sm tracking-wide"
      >
        {buttonText}
      </Link>
    </div>
  );
}
