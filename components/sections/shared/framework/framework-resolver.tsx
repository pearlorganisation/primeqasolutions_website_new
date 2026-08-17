import type { StrapiCollaborationFrameworkBlock } from "@/types/home";
import { CollaborationFramework } from "./collaboration-framework-v1";
import { CollaborationFrameworkV2 } from "./collaboration-framework-v2";
import { CollaborationFrameworkV3 } from "./collaboration-framework-v3";
import { resolveFrameworkProps } from "./types";

/**
 * FrameworkResolver
 * ─────────────────
 * Maps Strapi data to the CollaborationFramework UI component.
 */
export function FrameworkResolver({
  data,
}: {
  data: StrapiCollaborationFrameworkBlock;
}) {
  const { variant } = resolveFrameworkProps({ data });

  if (variant === "v3") {
    return <CollaborationFrameworkV3 data={data} />;
  }

  if (variant === "v2") {
    return <CollaborationFrameworkV2 data={data} />;
  }

  return <CollaborationFramework data={data} />;
}
