const BLOCKED_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "throwaway.email",
  "trashmail.com",
  "fakeinbox.com",
  "maildrop.cc",
  "getnada.com",
  "dispostable.com",
]);

export function isAllowedMailboxEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  if (BLOCKED_DOMAINS.has(domain)) return false;
  return true;
}
