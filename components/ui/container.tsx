import { cn } from "@/lib/utils/utils";

// --- CONTAINER ---
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: ContainerSize;
}

const containerSizes: Record<ContainerSize, string> = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-6xl",
  xl:   "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  className,
  as: Component = "div",
  size = "xl",
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full ",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// --- SECTION ---
type SectionSpacing = "sm" | "md" | "lg";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: SectionSpacing;
}

const sectionSpacing: Record<SectionSpacing, string> = {
  sm: "py-8  md:py-12",
  md: "py-16 md:py-20",
  lg: "py-24 ",
};

export function Section({
  className,
  as: Component = "section",
  spacing = "md",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(sectionSpacing[spacing], "px-4 md:px-8 lg:px-12  ", className)}
      {...props}
    >
      {children}
    </Component>
  );
}