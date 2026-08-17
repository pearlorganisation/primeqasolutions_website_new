"use client";

import React, { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaArrowRight, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { m, AnimatePresence } from "motion/react";

import { StrapiContactFormBlock, StrapiStatItem } from "@/types/home";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactFormData } from "@/types/contact-form";
import { Turnstile } from "@marsidev/react-turnstile";

interface MiddleCTAProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  stats?: StrapiStatItem[];
  form?: StrapiContactFormBlock;
}

export function MiddleCTAV2({
  badge,
  title,
  titleHighlight,
  description,
  stats,
  form,
}: MiddleCTAProps) {
  const cfTokenRef = useRef("");
  const [formData, setFormData] = useState<ContactFormData>({
    fullname: "",
    company: "",
    email: "",
    phone_no: "",
    how_we_can_help: "",
  });

  const { submit, isLoading, isSuccess, isError, error, reset } = useContactForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ContactFormData = {
      ...formData,
      cf_token: cfTokenRef.current,
    };
    await submit(payload);
  };

  if (!form) return null;

  const displayFormTitle = form.title || "Request a Consultation";
  const displayFormSubtitle = form.subtitle || "Expert guidance for your quality assurance needs.";
  const displayButtonText = form.buttonText || "Get Started";
  const displayPrivacy = form.privacyDisclaimer || "We respect your data and privacy.";

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 lg:py-24 border-y border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Side: Content ── */}
          <div className="lg:col-span-7">
            <SectionHeaderResolver  
              align="left"
              badge={badge}
              title={title}
              titleHighlight={titleHighlight}
              description={description}
              className="max-w-xl"
            />

            {/* Professional Stats: Clean Grid with Dividers */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-slate-200">
                {stats.map((stat) => (
                  <div key={stat.id || stat.label} className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {stat.number}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Side: Minimalist Form ── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-200 min-h-[450px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <m.div 
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="size-16 rounded-full bg-green-50 flex items-center justify-center mb-5 text-green-500">
                      <FaCheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-[280px]">
                      We&apos;ve received your request and will contact you shortly.
                    </p>
                    <button type="button" 
                      onClick={() => {
                        reset();
                        setFormData({ fullname: "", company: "", email: "", phone_no: "", how_we_can_help: "" });
                        cfTokenRef.current = "";
                      }}
                      className="text-primary text-sm font-bold hover:underline transition-all"
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
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {displayFormTitle}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium">
                        {displayFormSubtitle}
                      </p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4">
                        
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="fullname-v2" className="text-[0.8rem] font-bold text-slate-600 ml-0.5">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <input
                            id="fullname-v2"
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            required
                            disabled={isLoading}
                            value={formData.fullname}
                            onChange={handleInputChange}
                            className="h-11 rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="company-v2" className="text-[0.8rem] font-bold text-slate-600 ml-0.5">
                            Company
                          </label>
                          <input
                            id="company-v2"
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            disabled={isLoading}
                            value={formData.company}
                            onChange={handleInputChange}
                            className="h-11 rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email-v2" className="text-[0.8rem] font-bold text-slate-600 ml-0.5">
                            Email <span className="text-primary">*</span>
                          </label>
                          <input
                            id="email-v2"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-11 rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="phone-v2" className="text-[0.8rem] font-bold text-slate-600 ml-0.5">
                            Phone
                          </label>
                          <input
                            id="phone-v2"
                            type="tel"
                            name="phone_no"
                            placeholder="Phone Number"
                            disabled={isLoading}
                            value={formData.phone_no}
                            onChange={handleInputChange}
                            className="h-11 rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="message-v2" className="text-[0.8rem] font-bold text-slate-600 ml-0.5">
                            Message <span className="text-primary">*</span>
                          </label>
                          <textarea
                            id="message-v2"
                            name="how_we_can_help"
                            rows={3}
                            placeholder="How can we help you?"
                            required
                            disabled={isLoading}
                            value={formData.how_we_can_help}
                            onChange={handleInputChange}
                            className="rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none disabled:opacity-50"
                          />
                        </div>

                      </div>

                      {isError && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-medium">
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
                        className="mt-4 h-12 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white text-sm tracking-wide uppercase transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {displayButtonText}
                            <FaArrowRight className="text-xs" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[0.75rem] font-medium text-slate-400 mt-2">
                        {displayPrivacy}
                      </p>
                    </form>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
