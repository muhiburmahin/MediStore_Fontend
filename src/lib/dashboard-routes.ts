/** Role-based app routes (match MediStore app router). */
export function dashboardHrefForRole(role?: string | null): string {
  if (role === "ADMIN") return "/admin-dashboard/dashboard";
  if (role === "SELLER") return "/seller-dashboard/dashboard";
  return "/dashboard";
}

export function profileHrefForRole(role?: string | null): string {
  if (role === "ADMIN") return "/admin-dashboard/my-profile";
  if (role === "SELLER") return "/seller-dashboard/my-profile";
  return "/dashboard/my-profile";
}
