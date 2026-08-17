"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useCareerApplication } from "@/hooks/use-career-application";
import type { CareerApplicationData } from "@/hooks/use-career-application";
import { Turnstile } from "@marsidev/react-turnstile";

export function ApplyForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const cfTokenRef = useRef("");
  const [fileName, setFileName] = useState<string | null>(null);
  const { submit, isLoading, isSuccess, isError, error } =
    useCareerApplication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const resumeFile = (form.elements.namedItem("resume") as HTMLInputElement)
      ?.files?.[0];

    if (!resumeFile) return;

    const payload: CareerApplicationData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      linkedin: (formData.get("linkedin") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
      resume: resumeFile,
      cf_token: cfTokenRef.current,
    };

    const res = await submit(payload);
    if (res) {
      cfTokenRef.current = "";
      form.reset();
      setFileName(null);
    }
  };

  // ─── Form ─────────────────────────────────────────────────────────────────

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      {/* Error Banner */}
      {isError && error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-in fade-in duration-200">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Submission failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="first-name"
            className="text-[15px] font-medium text-neutral-900"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Jane"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="last-name"
            className="text-[15px] font-medium text-neutral-900"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[15px] font-medium text-neutral-900"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="jane.doe@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-[15px] font-medium text-neutral-900"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="linkedin"
          className="text-[15px] font-medium text-neutral-900"
        >
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="https://linkedin.com/in/janedoe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="resume-upload" className="text-[15px] font-medium text-neutral-900">
          Resume/CV <span className="text-red-500">*</span>
        </label>
        <label
          htmlFor="resume-upload"
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-lg hover:border-neutral-400 transition-colors cursor-pointer bg-neutral-50 hover:bg-neutral-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="space-y-1 text-center">
            <Paperclip className="mx-auto size-8 text-neutral-400" />
            <div className="flex text-[15px] text-neutral-600 justify-center">
              <span className="relative cursor-pointer rounded-md font-medium text-neutral-900 focus-within:outline-none hover:underline">
                {fileName ? fileName : "Upload a file"}
              </span>
              {!fileName && <p className="pl-1">or drag and drop</p>}
            </div>
            {!fileName && (
              <p className="text-xs text-neutral-500">
                PDF, DOC, DOCX up to 10MB
              </p>
            )}
          </div>
          <input
            id="resume-upload"
            name="resume"
            type="file"
            className="sr-only"
            accept=".pdf,.doc,.docx"
            required
            disabled={isLoading}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
              }
            }}
          />
        </label>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-[15px] font-medium text-neutral-900"
        >
          Cover Letter / Additional Information
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed resize-y"
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

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
          options={{ theme: "light" }}
        />
      </div>

      <Button type="submit" size="lg" disabled={isLoading || isSuccess} variant="default">
        {isLoading ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      {/* Success Banner */}
      {isSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium animate-in fade-in duration-200">
          <CheckCircle className="size-4 shrink-0" />
          Application submitted successfully. Our team will be in touch soon.
        </div>
      )}
    </form>
  );
}
