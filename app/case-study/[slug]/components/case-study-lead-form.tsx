"use client";

import { useRef, useState } from "react";
import { FaArrowRight, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { m, AnimatePresence } from "motion/react";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactFormData } from "@/types/contact-form";
import { Turnstile } from "@marsidev/react-turnstile";

interface CaseStudyLeadFormProps {
  title?: string;
  description?: string;
}

export function CaseStudyLeadForm({
  title = "Ready for Similar Results?",
  description = "Let's talk about your project and build a QA strategy that delivers measurable outcomes."
}: CaseStudyLeadFormProps) {
  const cfTokenRef = useRef("");
  const [formData, setFormData] = useState<ContactFormData>({
    fullname: "",
    email: "",
    company: "",
    phone_no: "",
    how_we_can_help: "",
  });

  const { submit, isLoading, isSuccess, isError, error, reset } = useContactForm();

  function updateLeadFormField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: ContactFormData = {
      ...formData,
      cf_token: cfTokenRef.current,
    };
    await submit(payload);
  }

  return (
    <div className="rounded-none sm:rounded-2xl p-6 sm:p-7 bg-neutral-900 text-white shadow-lg shadow-neutral-950/20 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
      <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <m.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center gap-4 py-8"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white mb-2">
              <FaCheckCircle size={28} />
            </div>
            <h4 className="text-[1.125rem] font-semibold tracking-tight">Message Received!</h4>
            <p className="text-white/75 text-[0.875rem] leading-relaxed max-w-[240px]">
              Thanks for reaching out. Our team will be in touch shortly.
            </p>
            <button type="button" 
              onClick={() => {
                reset();
                setFormData({ fullname: "", email: "", company: "", phone_no: "", how_we_can_help: "" });
                cfTokenRef.current = "";
              }}
              className="text-white/80 text-[0.75rem] font-bold hover:text-white transition-colors"
            >
              Send another message
            </button>
          </m.div>
        ) : (
          <m.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h4 className="text-[1.125rem] font-semibold tracking-tight mb-2.5">
              {title}
            </h4>
            <p className="text-white/75 text-sm leading-relaxed mb-6">
              {description}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sidebar-fullname" className="text-xs font-medium text-white/90">
                  Full Name <span className="text-white/50">*</span>
                </label>
                <input
                  id="sidebar-fullname"
                  name="fullname"
                  type="text"
                  required
                  disabled={isLoading}
                  value={formData.fullname}
                  onChange={updateLeadFormField}
                  placeholder="Jane Smith"
                  className="h-10 rounded-lg bg-white/15 border border-white/20 px-3.5 text-[0.875rem] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all disabled:opacity-50"
                />
              </div>
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sidebar-email" className="text-xs font-medium text-white/90">
                  Work Email <span className="text-white/50">*</span>
                </label>
                <input
                  id="sidebar-email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={updateLeadFormField}
                  placeholder="jane@company.com"
                  className="h-10 rounded-lg bg-white/15 border border-white/20 px-3.5 text-[0.875rem] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all disabled:opacity-50"
                />
              </div>

              {/* Company & Phone (Row) */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="sidebar-company" className="text-xs font-medium text-white/90">
                    Company
                  </label>
                  <input
                    id="sidebar-company"
                    name="company"
                    type="text"
                    disabled={isLoading}
                    value={formData.company}
                    onChange={updateLeadFormField}
                    placeholder="Acme Corp"
                    className="h-10 rounded-lg bg-white/15 border border-white/20 px-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="sidebar-phone" className="text-xs font-medium text-white/90">
                    Phone
                  </label>
                  <input
                    id="sidebar-phone"
                    name="phone_no"
                    type="tel"
                    disabled={isLoading}
                    value={formData.phone_no}
                    onChange={updateLeadFormField}
                    placeholder="+1 (555) 000"
                    className="h-10 rounded-lg bg-white/15 border border-white/20 px-3.5 text-[0.875rem] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              
              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sidebar-message" className="text-xs font-medium text-white/90">
                  How can we help? <span className="text-white/50">*</span>
                </label>
                <textarea
                  id="sidebar-message"
                  name="how_we_can_help"
                  required
                  disabled={isLoading}
                  rows={3}
                  value={formData.how_we_can_help}
                  onChange={updateLeadFormField}
                  placeholder="Tell us about your project..."
                  className="rounded-lg bg-white/15 border border-white/20 px-3.5 py-2.5 text-[0.875rem] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all resize-none disabled:opacity-50"
                />
              </div>

              {isError && (
                <div className="p-3 rounded-lg bg-white/10 border border-white/10 flex items-start gap-2.5 text-white text-[0.75rem] font-medium">
                  <FaExclamationCircle className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-1">
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
                    theme: "light"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-white text-neutral-900 hover:bg-neutral-100 font-semibold text-[0.875rem] rounded-md px-4 py-3 transition-colors shadow-sm disabled:opacity-70 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="size-3.5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    Get a Free Consultation
                    <FaArrowRight className="size-3" />
                  </>
                )}
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
