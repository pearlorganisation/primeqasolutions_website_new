"use client";

import dynamic from "next/dynamic";

const CookieConsentApiBtns = dynamic(
  () => import("@/components/sections/shared/cookie/modal"),
  { ssr: false }
);

export default function LazyCookieConsent() {
  return <CookieConsentApiBtns />;
}
