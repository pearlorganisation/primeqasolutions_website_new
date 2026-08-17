/**
 * Case Studies Listing — Server Component wrapper.
 *
 * Fetches data at build time (SSG) and revalidates via ISR.
 * Passes the pre-fetched studies and filter counts to the interactive
 * client component that handles search + filter.
 */

import {
  getAllCaseStudies,
  buildIndustryCounts,
  buildTestingTypeCounts,
} from "@/http/case-study";
import { CaseStudiesListingClient } from "./case-studies-listing-client";

export async function CaseStudiesListing() {
  const studies = await getAllCaseStudies();
  const industryCounts = buildIndustryCounts(studies);
  const testingTypeCounts = buildTestingTypeCounts(studies);

  return (
    <CaseStudiesListingClient
      studies={studies}
      industryCounts={industryCounts}
      testingTypeCounts={testingTypeCounts}
    />
  );
}
