import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";

interface LogoProps {
  /**
   * The visual style of the logo.
   * "default" uses /logo.svg (for light backgrounds)
   * "light" uses /logo-light.svg (for dark backgrounds)
   */
  variant?: "default" | "light";
  /**
   * Additional CSS classes applied to the wrapping <Link> element.
   * Use this to control the rendered size, e.g. className="w-36" or className="w-40".
   */
  className?: string;
  /**
   * Whether to prioritize loading the image (set true for LCP images like the header logo).
   * @default false
   */
  priority?: boolean;
}

/**
 * Reusable Logo component for PrimeQA.
 *
 * Size is controlled by className on the wrapper Link — the Image always fills
 * the wrapper width and derives height automatically via
 *   style={{ width: '100%', height: 'auto' }}
 * This is necessary because Next.js inspects inline style (not Tailwind classes)
 * to verify that both CSS dimensions are set, suppressing the aspect-ratio warning.
 */
export function Logo({
  variant = "default",
  className,
  priority = false,
}: LogoProps) {
  const logo =
    variant === "light"
      ? { src: "/logo-light.svg", width: 182, height: 31 }
      : { src: "/logo.svg", width: 467, height: 87 };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center transition-opacity ",
        className
      )}
    >
      <Image
        src={logo.src}
        alt="PrimeQA Logo"
        // Intrinsic SVG dimensions - used by the browser to reserve space.
        // The actual rendered size comes from the wrapper className.
        width={logo.width}
        height={logo.height}
        fetchPriority={"high"}
        preload={priority}
        // Use style (not Tailwind) so Next.js can verify both axes are handled.
        style={{ width: "100%", height: "auto" }}
      />
    </Link>
  );
}
