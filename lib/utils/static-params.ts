const CACHE_COMPONENTS_PLACEHOLDER_SLUG = "__cache-components-placeholder__";

export function toSlugStaticParams(slugs: string[]): Array<{ slug: string }> {
  return (slugs.length > 0 ? slugs : [CACHE_COMPONENTS_PLACEHOLDER_SLUG]).map(
    (slug) => ({ slug }),
  );
}
