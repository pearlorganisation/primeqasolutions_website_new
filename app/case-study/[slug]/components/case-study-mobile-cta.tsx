import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Container } from "@/components/ui/container";

export function CaseStudyMobileCTA() {
  return (
    <div className="lg:hidden bg-neutral-900 py-10">
      <Container>
        <div className="flex flex-col items-center text-center bg-[var(--color-page-canvas)] gap-4">
          <h3 className="text-2xl font-bold text-white">
            Ready for Similar Results?
          </h3>
          <p className="text-white/70 max-w-sm">
            Let's build a QA strategy that delivers measurable outcomes for
            your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-[0.9375rem] rounded-xl px-7 py-3.5 transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            Book a Free Consultation
            <FaArrowRight className="size-3.5" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
