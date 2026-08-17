"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function LottieAnimation({ animationData, ...props }: any) {
  return <Lottie animationData={animationData} {...props} />;
}
