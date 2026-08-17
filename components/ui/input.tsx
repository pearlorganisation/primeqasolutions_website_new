import React from "react";
import { cn } from "@/lib/utils/utils";

// ─── Input ───────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  asteriskClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  label,
  required,
  id,
  wrapperClassName,
  labelClassName,
  asteriskClassName,
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-neutral-700 leading-none", labelClassName)}
        >
          {label}
          {required && <span className={cn("text-primary ml-1", asteriskClassName)}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400",
          "bg-white border border-neutral-200",
          "outline-none transition-colors",
          "hover:border-neutral-300",
          "focus:border-neutral-300 shadow-xs",
          // "focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  );
}
Input.displayName = "Input";

// ─── Textarea ────────────────────────────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  asteriskClassName?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({
  label,
  required,
  id,
  wrapperClassName,
  labelClassName,
  asteriskClassName,
  className,
  ref,
  ...props
}: TextareaProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-neutral-700 leading-none", labelClassName)}
        >
          {label}
          {required && <span className={cn("text-primary ml-1", asteriskClassName)}>*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400",
          "bg-white border border-neutral-200",
          "outline-none transition-colors resize-none",
          "hover:border-neutral-300",
          "focus:border-neutral-300 shadow-xs ",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  );
}
Textarea.displayName = "Textarea";
