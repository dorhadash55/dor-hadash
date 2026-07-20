import type { Service } from "../content/homepage";

const paths: Record<Service["icon"], string> = {
  home: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  language: "m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1m16 20-5-10-5 10M14 18h6",
  school: "M12 3 2 8l10 5 10-5-10-5ZM6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5",
  briefcase:
    "M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  document:
    "M8 3h6l4 4v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 0v4h4M9 12h6M9 16h6M9 8h2",
  users:
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-3 3-5 6-5s6 2 6 5M15 15c2.5 0 6 1.5 6 5",
};

export default function ServiceIcon({ icon, className = "h-7 w-7" }: { icon: Service["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[icon]} />
    </svg>
  );
}
