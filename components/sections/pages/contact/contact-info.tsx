"use client";

import { useRef, useState } from "react";
import { Section, Container } from "@/components/ui/container";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useContactForm } from "@/hooks/use-contact-form";
import { AnimatePresence, m as motion } from "motion/react";
import { Turnstile } from "@marsidev/react-turnstile";

const offices = [
  {
    id: 1,
    name: "India Headquarters",
    address: "A-904, Ganesh Glory 11, Jagatpur Rd,\nnear BSNL Office, Off SG Highway, Jagatpur,\nAhmedabad, Gujarat 382470, INDIA",
    phone: "+91 95584 08386",
    email: "piyush@PrimeQAsolutions.com",
    mapQuery: "Ganesh+Glory+11,Ahmedabad,Gujarat",
  },
  {
    id: 2,
    name: "USA Operations",
    address: "PrimeQA Solutions Inc.,\n28 GEARY ST SUITE 650\nSAN FRANCISCO, CA 94108",
    phone: "+1 (415) 639-9555",
    email: "piyush@PrimeQAsolutions.com",
    mapQuery: "28+Geary+St,San+Francisco,CA",
  },
];

export function ContactInfo() {
  const cfTokenRef = useRef("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    how_we_can_help: "",
  });

  const { submit, isLoading, isSuccess, isError, error, reset } = useContactForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Map firstName + lastName → fullname for the shared hook
    const payload = {
      fullname: `${formData.firstName} ${formData.lastName}`.trim(),
      company: formData.company,
      email: formData.email,
      phone_no: formData.phone,
      how_we_can_help: formData.how_we_can_help,
      cf_token: cfTokenRef.current,
    };

    const result = await submit(payload);
    if (result) {
      setFormData({ firstName: "", lastName: "", company: "", email: "", phone: "", how_we_can_help: "" });
      cfTokenRef.current = "";
      setTimeout(() => reset(), 5000);
    }
  };

  return (
    <Section >
      <Container>
        {/* Top Layout: Form & General Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Contact Form */}
          <div className="lg:col-span-7 flex flex-col ">
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl font-medium text-neutral-900 mb-3 tracking-tight">
                Send us a Message
              </h2>
              <p className="text-base md:text-lg text-neutral-500">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  disabled={isLoading}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  disabled={isLoading}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Email Address"
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                />

                <Input
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  disabled={isLoading}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <Input
                label="Company Name"
                id="company"
                name="company"
                type="text"
                disabled={isLoading}
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company"
              />

              <Textarea
                label="How can we help?"
                id="how_we_can_help"
                name="how_we_can_help"
                rows={5}
                required
                disabled={isLoading}
                value={formData.how_we_can_help}
                onChange={handleInputChange}
                placeholder="Tell us about your inquiry..."
              />

              {/* Error message */}
              {isError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm">
                  <FaExclamationCircle className="mt-0.5 shrink-0" />
                  <span>{error || "Something went wrong. Please try again."}</span>
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
                    theme: "light"
                  }}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full sm:w-auto group flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                    <span>Sending&hellip;</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </Button>

              {/* Inline success message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3 text-green-700 text-sm"
                  >
                    <FaCheckCircle className="shrink-0 text-green-500" size={18} />
                    <span className="font-medium">
                      Your message has been sent! We&apos;ll get back to you within 24 hours.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Headquarters Info */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pl-10">
            <div className="mb-10">
              <h3 className="text-2xl font-medium text-neutral-900 mb-3 tracking-tight">
                Our Headquarters
              </h3>
              <p className="text-lg text-neutral-600">
                Reach out to our dedicated teams directly at our global offices.
              </p>
            </div>

            <div className="space-y-12">
              {offices.map((office) => (
                <div key={office.id} className="flex flex-col">
                  <h4 className="text-xl font-medium text-neutral-900 mb-5">
                    {office.name}
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <HiOutlineLocationMarker className="size-5 text-neutral-400 mt-0.5 shrink-0" />
                      <p className="text-neutral-600 whitespace-pre-line leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <HiOutlinePhone className="size-5 text-neutral-400 shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                        className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <HiOutlineMail className="size-5 text-neutral-400 shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
