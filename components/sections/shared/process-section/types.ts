import type { StrapiAutomationProcessBlock } from "@/types/service";
import type { ProcessVariant } from "./process-resolver";

export type { ProcessVariant };

export interface ProcessSectionProps {
  data: StrapiAutomationProcessBlock;
  variant?: ProcessVariant;
  className?: string;
}
