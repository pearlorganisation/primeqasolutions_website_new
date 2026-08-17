import { CaseStudyLeadForm } from "./case-study-lead-form";

export function CaseStudySidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-5 sticky top-34">
      {/* Lead Generation Form */}
      <CaseStudyLeadForm 
        title="Ready for Similar Results?" 
        description="Let's talk about your project and build a QA strategy that delivers measurable outcomes."
      />
    </aside>
  );
}
