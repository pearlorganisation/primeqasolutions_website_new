import { Section, Container } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import type { StrapiJobListItem } from "@/types/career";

// ─── Props ────────────────────────────────────────────────────────────────────

interface JobListingsProps {
  jobs: StrapiJobListItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function JobListings({ jobs }: JobListingsProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <Section id="openings" className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-4">
              Open Positions
            </h2>
            <p className="text-neutral-600 text-lg">
              There are no open positions at the moment. Please check back later!
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="openings" className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-4">Open Positions</h2>
            <p className="text-neutral-600 text-lg">
              Find the perfect role to challenge yourself and grow your career.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Link 
                key={job.id} 
                href={`/company/careers/${job.slug}`}
                className="group block p-6 md:p-8 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-md mb-3">
                      {job.role}
                    </div>
                    <h3 className="text-xl font-medium text-neutral-900 mb-2 transition-colors">
                      {job.title}
                    </h3>
                    {job.short_description && (
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2 max-w-2xl">
                        {job.short_description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        {job.job_type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end shrink-0 mt-2 md:mt-0">
                    <span className="flex items-center text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      View details
                      <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
