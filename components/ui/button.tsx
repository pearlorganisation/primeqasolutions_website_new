import { cn } from "@/lib/utils/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "outline-secondary" | "ghost" | "link" | "secondary";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? "span" : "button"; // Keeping it simple without extra radix deps right now
  return (
    <Comp
      className={cn(
        "inline-flex items-center hover:cursor-pointer! justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-neutral-950 text-white hover:bg-neutral-800 rounded-md text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 active:scale-[0.98]": variant === "default",
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80": variant === "secondary",
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900": variant === "outline",
          "h-auto border border-gray-200 bg-white shadow-xs hover:bg-gray-100 p-6! text-base rounded-lg font-semibold  tracking-widest text-gray-700 transition-all duration-300 hover:text-gray-900": variant === "outline-secondary",
          "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
          "text-gray-900 underline-offset-4 hover:underline": variant === "link",
          "py-2 px-5": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-md px-8": size === "lg",
          "size-9": size === "icon",
          "size-8": size === "icon-sm",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
}
Button.displayName = "Button";

export { Button };
