import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function SectionWrapper<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: SectionWrapperProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
