import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  action?: ReactNode;
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "mx-auto max-w-2xl text-center"
          : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      }
    >
      <div className={centered ? undefined : "max-w-2xl"}>
        <p className="font-accent text-xs font-medium uppercase tracking-[0.22em] text-brand-teal sm:text-sm">
          {label}
        </p>
        <h2
          className={`mt-2 font-heading text-2xl font-semibold leading-tight text-brand-blue-deep text-balance sm:text-3xl lg:text-[2.125rem] ${centered ? "sm:mt-3" : ""}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-3 text-sm leading-relaxed text-gray-600 sm:text-base ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
      {action && centered && <div className="mt-4">{action}</div>}
    </div>
  );
}
