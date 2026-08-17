import type { StrapiServiceBlock } from "@/types/home";
import type { ServicesVariant } from "./services-resolver";

export type { ServicesVariant };

export interface ServicesProps {
  data: StrapiServiceBlock;
  variant?: ServicesVariant;
  className?: string;
}
