"use client";

import { useState } from "react";
import { strapiClient } from "@/http/client";
import { ContactFormData, ContactFormResponse } from "@/types/contact-form";

interface UseContactFormReturn {
  submit: (data: ContactFormData) => Promise<ContactFormResponse | null>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * Senior-level React hook for handling Strapi contact form submissions.
 * Provides clean state management (loading, success, error) and easy setup.
 */
export function useContactForm(): UseContactFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  };

  const submit = async (data: ContactFormData): Promise<ContactFormResponse | null> => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      // Send email to admin via Next.js API route first (this also validates the payload)
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      
      const emailResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page_url: pageUrl }),
      });

      if (!emailResponse.ok) {
        const errData = await emailResponse.json().catch(() => ({}));
        if (errData.details) {
          const messages = Object.values(errData.details).flat().join(", ");
          throw new Error(messages || errData.error || "Validation failed");
        }
        throw new Error(errData.error || "Failed to send email. Please try again.");
      }

      // Strapi v5+ (and v4) SDK: create() wraps the payload in { data: ... } automatically
      // or we might need to specify it depending on the SDK version.
      // Given the schema and @strapi/client usage in the project:
      const { cf_token, ...strapiData } = data;
      const response = await strapiClient.collection("contact-forms").create(strapiData);

      // Strapi responses usually return the created object in response.data
      const result = (response?.data ?? response) as ContactFormResponse;

      setIsSuccess(true);
      return result;
    } catch (err: any) {
      console.error("[CONTACT_FORM_ERROR]:", err);
      setIsError(true);
      
      // Extract a meaningful error message if possible
      const errorMessage = 
        err?.response?.data?.error?.message || 
        err?.message || 
        "Something went wrong while submitting the form. Please try again.";
      
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  };
}
