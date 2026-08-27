// "use client";

// import { useRef, useState } from "react";
// import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
// import { Container } from "@/components/ui/container";
// import { Input, Textarea } from "@/components/ui/input";
// import { useContactForm } from "@/hooks/use-contact-form";
// import { ContactFormData } from "@/types/contact-form";
// import { Button } from "@/components/ui/button";
// import { m, AnimatePresence } from "motion/react";
// import { Turnstile } from "@marsidev/react-turnstile";
// import type { StrapiCtaFormBlock } from "@/types/home";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { renderWithHighlights } from "@/lib/utils/text-utils";

// export interface CtaFormProps {
//   data?: StrapiCtaFormBlock;
// }

// function extractPlainText(blocks: any[] | null | undefined): string {
//   if (!blocks || !Array.isArray(blocks)) return "";
//   const parts: string[] = [];
//   for (const block of blocks) {
//     if (block?.children && Array.isArray(block.children)) {
//       for (const child of block.children) {
//         if (child.type === "text") {
//           parts.push(child.text || "");
//         } else if (child.type === "link") {
//           parts.push(
//             child.children?.map((cc: any) => cc.text || "").join("") ?? ""
//           );
//         }
//       }
//     }
//   }
//   return parts.join(" ").trim();
// }

// export function CtaForm({ data }: CtaFormProps) {
//   const cfTokenRef = useRef("");
//   const [formData, setFormData] = useState<ContactFormData>({
//     fullname: "",
//     company: "",
//     email: "",
//     phone_no: "",
//     how_we_can_help: "",
//   });

//   const { submit, isLoading, isSuccess, isError, error, reset } = useContactForm();

//   function handleInputChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const payload: ContactFormData = {
//       ...formData,
//       cf_token: cfTokenRef.current,
//     };
//     const result = await submit(payload);
//     if (result) {
//       setFormData({ fullname: "", company: "", email: "", phone_no: "", how_we_can_help: "" });
//       cfTokenRef.current = "";
//       setTimeout(() => {
//         reset();
//       }, 5000);
//     }
//   }

//   const isDynamic = !!data;

//   const badge = isDynamic 
//     ? (data?.heading?.label ?? "") 
//     : "Let's Talk";

//   const titleText = isDynamic
//     ? (data?.heading?.title ? extractPlainText(data.heading.title) : "")
//     : "Ready to Write Your Own {{Success Story?}}";

//   const defaultContent = `Partner with PrimeQA to build a scalable QA strategy tailored to your industry. Tell us about your project and we'll get back within one business day.

// * Free 30-minute discovery call
// * Custom testing strategy included
// * No commitment required`;

//   const content = isDynamic ? (data?.content ?? "") : defaultContent;

//   return (
//     <section className="my-8 md:my-12">
//       <Container className="px-0 sm:px-6 lg:px-0">
//         <div className="rounded-none sm:rounded-xl overflow-hidden bg-neutral-950 border-x-0 sm:border border-neutral-800 md:shadow-md relative">
//           {/* Decorative circles */}
//           <div
//             aria-hidden
//             className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/5 blur-2xl"
//           />
//           <div
//             aria-hidden
//             className="pointer-events-none absolute bottom-0 -left-16 size-56 rounded-full bg-white/5 blur-2xl"
//           />

//           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
//             {/* ── Left: copy ── */}
//             <div className="flex flex-col justify-center p-8 sm:p-12  border-b border-white/10 lg:border-b-0 lg:border-r">
//               {badge && (
//                 <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/90 mb-5">
//                   <span className="inline-block h-px w-6 bg-white/90" />
//                   {badge}
//                 </span>
//               )}
//               {titleText && (
//                 <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight mb-4">
//                   {renderWithHighlights(titleText, "text-white")}
//                 </h2>
//               )}

//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   p: ({ children }) => (
//                     <p className="text-white/90 text-[1rem] leading-relaxed mb-8 max-w-md">
//                       {children}
//                     </p>
//                   ),
//                   ul: ({ children }) => (
//                     <ul className="flex flex-col gap-3 mb-6">
//                       {children}
//                     </ul>
//                   ),
//                   ol: ({ children }) => (
//                     <ol className="flex flex-col gap-3 list-decimal pl-5 mb-6 text-white/90">
//                       {children}
//                     </ol>
//                   ),
//                   li: ({ children }) => (
//                     <li className="flex items-start gap-2.5 text-white/90 text-base leading-snug">
//                       <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
//                       <span className="flex-1">{children}</span>
//                     </li>
//                   ),
//                   a: ({ children, href }) => (
//                     <a
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-white underline hover:text-white/80 transition-colors font-medium"
//                     >
//                       {children}
//                     </a>
//                   ),
//                 }}
//               >
//                 {content}
//               </ReactMarkdown>
//             </div>

//             {/* ── Right: form ── */}
//             <div className="p-8 sm:p-12 ">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4"
//                 id="case-studies-contact-form"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Input
//                     label="Full Name"
//                     id="cs-fullname"
//                     name="fullname"
//                     type="text"
//                     required
//                     disabled={isLoading}
//                     value={formData.fullname}
//                     onChange={handleInputChange}
//                     placeholder="Jane Smith"
//                     labelClassName="text-xs font-medium text-white/90"
//                     asteriskClassName="text-white/90"
//                     className="h-11 rounded-md bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
//                   />
//                   <Input
//                     label="Company"
//                     id="cs-company"
//                     name="company"
//                     type="text"
//                     disabled={isLoading}
//                     value={formData.company}
//                     onChange={handleInputChange}
//                     placeholder="Acme Corp"
//                     labelClassName="text-xs [required:var(--required-color)] font-medium text-white/90"
//                     className="h-11 rounded-md bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Input
//                     label="Email"
//                     id="cs-email"
//                     name="email"
//                     type="email"
//                     required
//                     disabled={isLoading}
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="jane@company.com"
//                     labelClassName="text-xs font-medium text-white/90"
//                     asteriskClassName="text-white/90"
//                     className="h-11 rounded-md bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
//                   />
//                   <Input
//                     label="Phone Number"
//                     id="cs-phone_no"
//                     name="phone_no"
//                     type="tel"
//                     required
//                     disabled={isLoading}
//                     value={formData.phone_no}
//                     onChange={handleInputChange}
//                     placeholder="+1 (555) 000-0000"
//                     labelClassName="text-xs [required:var(--required-color)] font-medium text-white/90"
//                     className="h-11 rounded-md bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
//                   />
//                 </div>

//                 <Textarea
//                   label="Tell us about your project"
//                   id="cs-how_we_can_help"
//                   name="how_we_can_help"
//                   required
//                   rows={4}
//                   disabled={isLoading}
//                   value={formData.how_we_can_help}
//                   onChange={handleInputChange}
//                   placeholder="Briefly describe your testing challenges and goals..."
//                   labelClassName="text-xs font-medium text-white/90"
//                   asteriskClassName="text-white/90"
//                   className="rounded-md bg-white/10 border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-all resize-none disabled:opacity-50"
//                 />

//                 {isError && (
//                   <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-white text-sm">
//                     <FaExclamationCircle className="mt-0.5 shrink-0 text-red-400" />
//                     <span>{error}</span>
//                   </div>
//                 )}

//                 <div className="mt-2">
//                   <Turnstile
//                     siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
//                     onSuccess={(token) => {
//                       cfTokenRef.current = token;
//                     }}
//                     onError={() => {
//                       cfTokenRef.current = "";
//                     }}
//                     onExpire={() => {
//                       cfTokenRef.current = "";
//                     }}
//                     options={{
//                       theme: "dark"
//                     }}
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="mt-2 bg-white text-neutral-950 hover:bg-neutral-100 hover:text-neutral-950 transition-all duration-200 py-2.5"
//                   variant="default"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center gap-2">
//                       <svg
//                         className="animate-spin size-4 text-primary"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                         />
//                       </svg>
//                       Sending…
//                     </span>
//                   ) : (
//                     <>
//                       Get a Free Consultation
//                     </>
//                   )}
//                 </Button>

//                 <AnimatePresence>
//                   {isSuccess && (
//                     <m.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3 text-white text-sm"
//                     >
//                       <FaCheckCircle className="mt-0.5 shrink-0 text-green-400" />
//                       <span>Thanks for reaching out! Our team will get back to you within one business day.</span>
//                     </m.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }
"use client";

import { useRef, useState } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { Container } from "@/components/ui/container";
import { Input, Textarea } from "@/components/ui/input";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactFormData } from "@/types/contact-form";
import { Button } from "@/components/ui/button";
import { m, AnimatePresence } from "motion/react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { StrapiCtaFormBlock } from "@/types/home";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderWithHighlights } from "@/lib/utils/text-utils";

export interface CtaFormProps {
  data?: StrapiCtaFormBlock;
}

function extractPlainText(blocks: any[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  const parts: string[] = [];

  for (const block of blocks) {
    if (block?.children && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child.type === "text") {
          parts.push(child.text || "");
        } else if (child.type === "link") {
          parts.push(
            child.children?.map((cc: any) => cc.text || "").join("") ?? ""
          );
        }
      }
    }
  }

  return parts.join(" ").trim();
}

export function CtaForm({ data }: CtaFormProps) {
  const cfTokenRef = useRef("");

  const [formData, setFormData] = useState<ContactFormData>({
    fullname: "",
    company: "",
    email: "",
    phone_no: "",
    how_we_can_help: "",
  });

  const { submit, isLoading, isSuccess, isError, error, reset } =
    useContactForm();

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: ContactFormData = {
      ...formData,
      cf_token: cfTokenRef.current,
    };

    const result = await submit(payload);

    if (result) {
      setFormData({
        fullname: "",
        company: "",
        email: "",
        phone_no: "",
        how_we_can_help: "",
      });

      cfTokenRef.current = "";

      setTimeout(() => {
        reset();
      }, 5000);
    }
  }

  const isDynamic = !!data;

  const badge = isDynamic
    ? (data?.heading?.label ?? "")
    : "Let's Talk";

  const titleText = isDynamic
    ? data?.heading?.title
      ? extractPlainText(data.heading.title)
      : ""
    : "Ready to Write Your Own {{Success Story?}}";

  const defaultContent = `Partner with PrimeQA to build a scalable QA strategy tailored to your industry. Tell us about your project and we'll get back within one business day.

* Free 30-minute discovery call
* Custom testing strategy included
* No commitment required`;

  const content = isDynamic ? (data?.content ?? "") : defaultContent;

  return (
    <section className="my-8 md:my-12">
      <Container className="px-0 sm:px-6 lg:px-0">
        <div className="relative overflow-hidden rounded-none sm:rounded-xl bg-cream brightness-[0.97] md:shadow-md">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="flex flex-col justify-center p-8 sm:p-12 border-b border-primary/10 lg:border-b-0 lg:border-r">
              {badge && (
                <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-primary mb-5">
                  <span className="inline-block h-px w-6 bg-primary" />
                  {badge}
                </span>
              )}

              {titleText && (
                <h2 className="text-xl md:text-3xl font-medium text-primary tracking-tight leading-tight mb-4">
                  {renderWithHighlights(titleText, "text-primary")}
                </h2>
              )}

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="text-secondary text-[1rem] leading-relaxed mb-8 max-w-md">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="flex flex-col gap-3 mb-6">{children}</ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="flex flex-col gap-3 list-decimal pl-5 mb-6 text-secondary">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="flex items-start gap-2.5 text-secondary text-base leading-snug">
                      <FaCheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="flex-1">{children}</span>
                    </li>
                  ),

                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/70 transition-colors font-medium"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* Right Form */}
            <div className="p-8 sm:p-12">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                id="case-studies-contact-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="cs-fullname"
                    name="fullname"
                    type="text"
                    required
                    disabled={isLoading}
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                    labelClassName="text-xs font-medium text-primary"
                    asteriskClassName="text-primary"
                    className="h-11 rounded-md bg-white/60 border-primary/15 text-primary placeholder:text-secondary/50 focus:border-primary/40 focus:bg-white/80 transition-all disabled:opacity-50"
                  />

                  <Input
                    label="Company"
                    id="cs-company"
                    name="company"
                    type="text"
                    disabled={isLoading}
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Corp"
                    labelClassName="text-xs font-medium text-primary"
                    className="h-11 rounded-md bg-white/60 border-primary/15 text-primary placeholder:text-secondary/50 focus:border-primary/40 focus:bg-white/80 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    id="cs-email"
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@company.com"
                    labelClassName="text-xs font-medium text-primary"
                    asteriskClassName="text-primary"
                    className="h-11 rounded-md bg-white/60 border-primary/15 text-primary placeholder:text-secondary/50 focus:border-primary/40 focus:bg-white/80 transition-all disabled:opacity-50"
                  />

                  <Input
                    label="Phone Number"
                    id="cs-phone_no"
                    name="phone_no"
                    type="tel"
                    required
                    disabled={isLoading}
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    labelClassName="text-xs font-medium text-primary"
                    asteriskClassName="text-primary"
                    className="h-11 rounded-md bg-white/60 border-primary/15 text-primary placeholder:text-secondary/50 focus:border-primary/40 focus:bg-white/80 transition-all disabled:opacity-50"
                  />
                </div>

                <Textarea
                  label="Tell us about your project"
                  id="cs-how_we_can_help"
                  name="how_we_can_help"
                  required
                  rows={4}
                  disabled={isLoading}
                  value={formData.how_we_can_help}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your testing challenges and goals..."
                  labelClassName="text-xs font-medium text-primary"
                  asteriskClassName="text-primary"
                  className="rounded-md bg-white/60 border-primary/15 px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:border-primary/40 focus:bg-white/80 transition-all resize-none disabled:opacity-50"
                />

                {isError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-primary text-sm">
                    <FaExclamationCircle className="mt-0.5 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="mt-2">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => {
                      cfTokenRef.current = token;
                    }}
                    onError={() => {
                      cfTokenRef.current = "";
                    }}
                    onExpire={() => {
                      cfTokenRef.current = "";
                    }}
                    options={{
                      theme: "light",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 bg-primary text-cream hover:bg-primary/90 hover:text-cream transition-all duration-200 py-2.5"
                  variant="default"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin size-4 text-cream"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <>Get a Free Consultation</>
                  )}
                </Button>

                <AnimatePresence>
                  {isSuccess && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3 text-primary text-sm"
                    >
                      <FaCheckCircle className="mt-0.5 shrink-0 text-green-600" />
                      <span>
                        Thanks for reaching out! Our team will get back to you
                        within one business day.
                      </span>
                    </m.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
