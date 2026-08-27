"use client";

import React, { useRef, useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { StrapiContactFormBlock, StrapiStatItem } from "@/types/home";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactFormData } from "@/types/contact-form";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@marsidev/react-turnstile";
import { H3 } from "@/components/ui/typography";

interface MiddleCTAProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  stats?: StrapiStatItem[];
  form?: StrapiContactFormBlock;
}

export function MiddleCTAV1({
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
    const result = await submit(payload);
    if (result) {
      setFormData({ fullname: "", company: "", email: "", phone_no: "", how_we_can_help: "" });
      cfTokenRef.current = "";
      setTimeout(() => {
        reset();
      }, 5000);
    }
  };

  // Derivations from Strapi form data (metadata/titles only now)
  const displayFormTitle = form?.title || "Get in Touch";
  const displayFormSubtitle = form?.subtitle || "Let's discuss how we can help your business.";
  const displayButtonText = form?.buttonText || "Send Message";
  const displayPrivacy = form?.privacyDisclaimer || "By submitting this form, you agree to our privacy policy.";

  if (!form) return null;

  return (
    <Section className="relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Content & Stats ── */}
          <div className="flex flex-col lg:pt-4">
            <SectionHeaderResolver
              align="left"
              badge={badge}
              title={title}
              titleHighlight={titleHighlight}
              description={description}
            />

            {/* Stats Grid - Highlighted Numbers */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-y-12 gap-x-8 pt-8 border-t border-neutral-200">
                {stats.map((stat) => (
                  <div
                    key={stat.id || stat.label}
                    className="flex flex-col gap-2 group cursor-default"
                  >
                    <span className="font-display text-2xl min[998px]:text-2xl font-medium text-primary tabular-nums tracking-tight">
                      {stat.number}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Form ── */}
          {/* <div className="relative">
            Form Backglow
            <div className="absolute -inset-2 lg:-inset-6 bg-gradient-to-b from-black/5 blur-[120px] rounded-[3rem] -z-10" />
            
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] border border-neutral-200/50 relative z-10 flex flex-col justify-center">
              
              <div className="mb-5">
                <H3 className="text-xl">
                  {displayFormTitle}
                </H3>
                <p className="text-neutral-500 text-[13px] font-medium leading-relaxed">{displayFormSubtitle}</p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  Full Name
                  <div className="flex flex-col">
                    <input
                      id="fullname"
                      type="text"
                      name="fullname"
                      placeholder="Full Name *"
                      required
                      disabled={isLoading}
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-neutral-200/80 bg-neutral-50/10 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400/80 outline-none hover:border-neutral-300 focus:border-neutral-900 focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  Company
                  <div className="flex flex-col">
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      disabled={isLoading}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-neutral-200/80 bg-neutral-50/10 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400/80 outline-none hover:border-neutral-300 focus:border-neutral-900 focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  Email
                  <div className="flex flex-col">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      disabled={isLoading}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-neutral-200/80 bg-neutral-50/10 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400/80 outline-none hover:border-neutral-300 focus:border-neutral-900 focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  Phone
                  <div className="flex flex-col">
                    <input
                      id="phone_no"
                      type="tel"
                      name="phone_no"
                      placeholder="Phone Number"
                      disabled={isLoading}
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-neutral-200/80 bg-neutral-50/10 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400/80 outline-none hover:border-neutral-300 focus:border-neutral-900 focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  How we can help
                  <div className="flex flex-col sm:col-span-2">
                    <textarea
                      id="how_we_can_help"
                      name="how_we_can_help"
                      rows={3}
                      placeholder="How can we help? *"
                      required
                      disabled={isLoading}
                      value={formData.how_we_can_help}
                      onChange={handleInputChange}
                      className="rounded-lg border border-neutral-200/80 bg-neutral-50/10 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400/80 outline-none hover:border-neutral-300 focus:border-neutral-900 focus:bg-white transition-all duration-200 resize-none disabled:opacity-50"
                    />
                  </div>

                </div>

                {isError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm">
                    <FaExclamationCircle className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                Left-aligned Turnstile Widget
                <div className="my-1 flex justify-start w-full">
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

                Submit
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{displayButtonText}</>
                  )}
                </Button>

                {isSuccess && (
                  <div className="p-4 mt-2 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3 text-green-700 text-sm">
                    <FaCheckCircle className="shrink-0 text-green-500" size={20} />
                    <span className="font-medium">Your inquiry has been submitted successfully!</span>
                  </div>
                )}

                <p className="text-center text-xs font-medium text-slate-400 mt-2">
                  {displayPrivacy}
                </p>
              </form>
            </div>
          </div> */}

          <div className="relative">
            {/* Form Backglow */}
            <div className="absolute -inset-2 lg:-inset-6 bg-gradient-to-b from-primary/5 blur-[120px] rounded-[3rem] -z-10" />

            <div className="bg-cream brightness-[0.97] backdrop-blur-xl rounded-2xl p-6 sm:p-8 relative z-10 flex flex-col justify-center">

              <div className="mb-5">
                <H3 className="text-xl text-primary">
                  {displayFormTitle}
                </H3>

                <p className="text-secondary text-[13px] font-medium leading-relaxed">
                  {displayFormSubtitle}
                </p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div className="flex flex-col">
                    <input
                      id="fullname"
                      type="text"
                      name="fullname"
                      placeholder="Full Name *"
                      required
                      disabled={isLoading}
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-secondary/20 bg-white/90 px-3.5 text-sm text-primary placeholder:text-secondary/60 outline-none hover:border-secondary/40 focus:border-primary focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col">
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      disabled={isLoading}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-secondary/20 bg-white/90 px-3.5 text-sm text-primary placeholder:text-secondary/60 outline-none hover:border-secondary/40 focus:border-primary focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      disabled={isLoading}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-secondary/20 bg-white/90 px-3.5 text-sm text-primary placeholder:text-secondary/60 outline-none hover:border-secondary/40 focus:border-primary focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <input
                      id="phone_no"
                      type="tel"
                      name="phone_no"
                      placeholder="Phone Number"
                      disabled={isLoading}
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      className="h-10 rounded-lg border border-secondary/20 bg-white/90 px-3.5 text-sm text-primary placeholder:text-secondary/60 outline-none hover:border-secondary/40 focus:border-primary focus:bg-white transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* How we can help */}
                  <div className="flex flex-col sm:col-span-2">
                    <textarea
                      id="how_we_can_help"
                      name="how_we_can_help"
                      rows={3}
                      placeholder="How can we help? *"
                      required
                      disabled={isLoading}
                      value={formData.how_we_can_help}
                      onChange={handleInputChange}
                      className="rounded-lg border border-secondary/20 bg-white/90 px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary/60 outline-none hover:border-secondary/40 focus:border-primary focus:bg-white transition-all duration-200 resize-none disabled:opacity-50"
                    />
                  </div>

                </div>

                {isError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm">
                    <FaExclamationCircle className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Turnstile */}
                <div className="my-1 flex justify-start w-full">
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

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-cream hover:bg-primary/90"
                >
                  {isLoading ? (
                    <div className="size-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  ) : (
                    <>{displayButtonText}</>
                  )}
                </Button>

                {isSuccess && (
                  <div className="p-4 mt-2 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3 text-green-700 text-sm">
                    <FaCheckCircle
                      className="shrink-0 text-green-500"
                      size={20}
                    />
                    <span className="font-medium">
                      Your inquiry has been submitted successfully!
                    </span>
                  </div>
                )}

                <p className="text-center text-xs font-medium text-secondary/70 mt-2">
                  {displayPrivacy}
                </p>
              </form>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
