"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

interface ClutchWidgetV1Props {
  scale?: string;
  scalePosition?: "center" | "left" | "right";
  height?: string;
  hideHeader?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

declare global {
  interface Window {
    CLUTCHCO?: { Init: () => void };
  }
}

export function ClutchWidgetV1({
  scale = "100",
  scalePosition = "center",
  height = "375",
  hideHeader = false,
  backgroundColor = "ffffff",
  textColor = "#1e1b4b",
}: ClutchWidgetV1Props) {
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const scriptReadyRef = useRef(false);
  const initFrameRef = useRef<number | null>(null);

  const cancelScheduledInit = useCallback(() => {
    if (initFrameRef.current !== null) {
      cancelAnimationFrame(initFrameRef.current);
      initFrameRef.current = null;
    }
  }, []);

  const scheduleInit = useCallback(() => {
    if (!scriptReadyRef.current || !widgetRef.current) {
      return;
    }

    cancelScheduledInit();

    initFrameRef.current = requestAnimationFrame(() => {
      window.CLUTCHCO?.Init();
      initFrameRef.current = null;
    });
  }, [cancelScheduledInit]);

  const setScriptReady = useCallback((ready: boolean) => {
    scriptReadyRef.current = ready;
    if (ready) {
      scheduleInit();
    }
  }, [scheduleInit]);

  const setWidgetNode = useCallback((node: HTMLDivElement | null) => {
    widgetRef.current = node;
    if (node) {
      scheduleInit();
    }
  }, [scheduleInit]);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => cancelScheduledInit, [cancelScheduledInit]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[375px] w-full"
      style={{ backgroundColor: `#${backgroundColor}` }}
    >
      {shouldLoad ? (
        <>
          <Script
            src="https://widget.clutch.co/static/js/widget.js"
            strategy="lazyOnload"
            onLoad={() => setScriptReady(true)}
          />

          <div
            className={`relative w-full overflow-hidden ${
              hideHeader ? "h-[310px]" : "h-auto"
            }`}
            style={{ backgroundColor: `#${backgroundColor}` }}
          >
            <div
              ref={setWidgetNode}
              className={`clutch-widget w-full ${hideHeader ? "-mt-[65px]" : ""}`}
              style={{ backgroundColor: `#${backgroundColor}` }}
              data-url="https://widget.clutch.co"
              data-widget-type="12"
              data-height={height}
              data-nofollow="false"
              data-expandifr="true"
              data-scale={scale}
              data-scale-position={scalePosition}
              data-clutchcompany-id="2124187"
              data-background-color={backgroundColor}
              data-text-color={textColor}
            />
          </div>
        </>
      ) : (
        <div
          className="min-h-[375px] w-full animate-pulse rounded-lg"
          style={{ backgroundColor: `#${backgroundColor}` }}
        />
      )}
    </div>
  );
}

export function ClutchWidgetResolver() {
  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      <ClutchWidgetV1 backgroundColor="ffffff" textColor="#1e1b4b" />
    </section>
  );
}
