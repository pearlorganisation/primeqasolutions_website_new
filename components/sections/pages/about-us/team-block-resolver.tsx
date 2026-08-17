/**
 * TeamBlockResolver
 * ──────────────────
 * Adapts the raw Strapi `block.team-block` payload into the shape
 * expected by the TeamSection component. Registered in the block registry
 * as the handler for BLOCKS.TEAM_BLOCK.
 */

import { TeamSection } from "@/components/sections/pages/about-us/team-section";
import { strapiMediaUrl } from "@/http/client";
import type { StrapiTeamBlock } from "@/types/about-us";

function extractHeadingText(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (Array.isArray(blocks)) {
    return blocks
      .map((block: any) =>
        block.children?.map((c: any) => c.text || "").join("") ?? ""
      )
      .join("\n");
  }
  return "";
}

interface TeamBlockResolverProps {
  data: StrapiTeamBlock;
}

export function TeamBlockResolver({ data }: TeamBlockResolverProps) {
  if (!data?.members?.length) return null;

  const badge = data.heading?.label;
  const title = extractHeadingText(data.heading?.title);
  const description = extractHeadingText(data.heading?.description);
  const variant = data.variant || "v2";

  const members = data.members.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    image: strapiMediaUrl(member.image?.url) || "",
    socials: {
      linkedin: member.linkedin || undefined,
      twitter: member.twitter || undefined,
    },
  }));

  return (
    <TeamSection
      data={{
        variant,
        badge,
        title,
        description,
        members,
      }}
    />
  );
}
