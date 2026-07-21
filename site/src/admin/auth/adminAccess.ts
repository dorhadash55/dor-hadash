const DEFAULT_ADMIN_EMAIL = "dor.hadash55@gmail.com";

export function getAllowedAdminEmails(): string[] {
  const fromEnv = import.meta.env.VITE_ADMIN_EMAIL;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((email: string) => email.trim().toLowerCase())
      .filter(Boolean);
  }
  return [DEFAULT_ADMIN_EMAIL];
}

export function getDefaultAdminEmail(): string {
  return getAllowedAdminEmails()[0] ?? DEFAULT_ADMIN_EMAIL;
}

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}
