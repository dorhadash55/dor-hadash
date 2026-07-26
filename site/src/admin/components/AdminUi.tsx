import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const inputClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputClass} min-h-[120px] resize-y`} {...props} />;
}

export function AdminBadge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "danger";
  children: ReactNode;
}) {
  const tones = {
    neutral: "bg-gray-100 text-gray-700",
    success: "bg-brand-teal/15 text-brand-teal",
    warning: "bg-amber-100 text-amber-900",
    danger: "bg-brand-coral/15 text-brand-coral",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function AdminPageIntro({ title, description }: { title?: string; description: string }) {
  return (
    <div className="rounded-2xl border border-brand-blue/10 bg-brand-blue/5 px-4 py-4 sm:px-5">
      {title && <p className="font-heading text-sm font-semibold text-brand-blue-deep">{title}</p>}
      <p className={`text-sm leading-relaxed text-gray-600 ${title ? "mt-1" : ""}`}>{description}</p>
    </div>
  );
}

export function AdminStatCard({
  label,
  value,
  to,
  hint,
  highlight,
}: {
  label: string;
  value: number | string;
  to: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`block rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 ${
        highlight ? "border-brand-coral/30 ring-1 ring-brand-coral/20" : "border-gray-200"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm sm:normal-case sm:tracking-normal">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </Link>
  );
}

export function AdminCard({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {(title || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          {title && <h2 className="font-heading text-base font-semibold text-brand-blue-deep">{title}</h2>}
          {action}
        </div>
      )}
      <div className="min-w-0 p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function AdminButton({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    danger: "bg-brand-coral text-white hover:bg-red-600",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function AdminLinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkProps & { variant?: "primary" | "secondary" }) {
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
      <p className="font-heading text-base font-semibold text-brand-blue-deep">{title}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
