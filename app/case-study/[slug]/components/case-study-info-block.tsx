 
/**
 * CaseStudy Info Block — renders industry, testing type, and published date.
 * Stub component — will be fleshed out when the full detail page is wired up.
 */

interface Props {
  data: any;
}

export function CaseStudyInfoBlock({ data }: Props) {
  if (!data) return null;

  return (
    <section className="flex flex-wrap gap-6 text-sm text-neutral-600">
      {data.Industry && (
        <div>
          <span className="font-semibold text-neutral-900">Industry:</span>{" "}
          {data.Industry}
        </div>
      )}
      {data.testing_type && (
        <div>
          <span className="font-semibold text-neutral-900">Testing Type:</span>{" "}
          {data.testing_type}
        </div>
      )}
      {(data.Headquarters || data.headquarters) && (
        <div>
          <span className="font-semibold text-neutral-900">Headquarters:</span>{" "}
          {data.Headquarters || data.headquarters}
        </div>
      )}
      {data.published && (
        <div>
          <span className="font-semibold text-neutral-900">Published:</span>{" "}
          {data.published}
        </div>
      )}
    </section>
  );
}
