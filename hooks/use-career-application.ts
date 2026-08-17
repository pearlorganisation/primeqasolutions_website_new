"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CareerApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  message?: string;
  resume: File;
  cf_token?: string;
}

export interface CareerApplicationResponse {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  message: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UseCareerApplicationReturn {
  submit: (data: CareerApplicationData) => Promise<CareerApplicationResponse | null>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * React hook for submitting career applications to Strapi.
 *
 * Handles the two-step process required by Strapi for file uploads:
 *  1. Upload the resume file via POST /api/upload
 *  2. Create the career-application entry with the uploaded file ID
 */
export function useCareerApplication(): UseCareerApplicationReturn {
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

  const submit = async (
    data: CareerApplicationData,
  ): Promise<CareerApplicationResponse | null> => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      const submitForm = new FormData();
      submitForm.append("firstName", data.firstName);
      submitForm.append("lastName", data.lastName);
      submitForm.append("email", data.email);
      if (data.phone) submitForm.append("phone", data.phone);
      if (data.linkedin) submitForm.append("linkedin", data.linkedin);
      if (data.message) submitForm.append("message", data.message);
      if (data.cf_token) submitForm.append("cf_token", data.cf_token);
      submitForm.append("resume", data.resume);

      const res = await fetch("/api/career-applications", {
        method: "POST",
        body: submitForm,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error ?? `Application submission failed (${res.status})`,
        );
      }

      const json = await res.json();
      const result = (json?.data ?? json) as CareerApplicationResponse;

      setIsSuccess(true);
      return result;
    } catch (err: any) {
      console.error("[CAREER_APPLICATION_ERROR]:", err);
      setIsError(true);

      const errorMessage =
        err?.response?.data?.error?.message ??
        err?.message ??
        "Something went wrong while submitting your application. Please try again.";

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
