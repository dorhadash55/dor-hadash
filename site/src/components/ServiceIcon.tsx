import type { ReactElement } from "react";
import type { Service } from "../content/homepage";

type IconProps = { className?: string };

function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  );
}

function LanguageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}

function SchoolIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10v6" />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18" />
    </svg>
  );
}

function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H8a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7l-4-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4h4M9 13h6M9 17h4" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <circle cx="10" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 19v-1a3 3 0 0 0-2-2.83" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 4.17a3 3 0 0 1 0 5.66" />
    </svg>
  );
}

const icons: Record<Service["icon"], (props: IconProps) => ReactElement> = {
  home: HomeIcon,
  language: LanguageIcon,
  school: SchoolIcon,
  briefcase: BriefcaseIcon,
  document: DocumentIcon,
  users: UsersIcon,
};

export default function ServiceIcon({ icon, className = "h-6 w-6" }: { icon: Service["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} />;
}
