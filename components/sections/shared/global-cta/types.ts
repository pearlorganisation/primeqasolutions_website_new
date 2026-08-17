import type { StrapiCtaButtonBlock } from "@/types/home";

export type GlobalCtaVariant = "v1" ;

export interface GlobalCtaProps {
  data?: StrapiCtaButtonBlock;
  variant?: GlobalCtaVariant;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  className?: string;
}

export interface ResolvedGlobalCtaProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

export function resolveGlobalCtaProps(props: GlobalCtaProps): ResolvedGlobalCtaProps {
  const { data, title, description, buttonLabel, buttonLink } = props;

  return {
    title: title ?? data?.title ?? "Ready to Scale Your AI Vision?",
    description: description ?? data?.description ?? "Let’s design a custom AI-powered solution that delivers measurable impact for your business. From strategic roadmap to custom deployment, we help you navigate the AI revolution with security and scale.",
    buttonLabel: buttonLabel ?? data?.button?.label ?? "Contact Us",
    buttonLink: buttonLink ?? data?.button?.link ?? "/",
  };
}
