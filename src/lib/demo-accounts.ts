/**
 * Demo credentials shown on auth screens — keep in sync with MediStore_Backend `src/scripts/seed.ts` defaults.
 */
export const DEMO_LOGIN = {
  admin: {
    title: "Admin",
    description: "Platform & catalog",
    email: "developermdmahin@gmail.com",
    password: "pass1234a",
  },
  seller: {
    title: "Seller",
    description: "List medicines & orders",
    email: "demo.seller@medistore.com",
    password: "pass1234a",
  },
  customer: {
    title: "Customer",
    description: "Browse & purchase",
    email: "demo.customer@medistore.com",
    password: "pass1234a",
  },
} as const;

export const DEMO_REGISTER_PREFILL = {
  customer: {
    name: "Demo Customer",
    email: DEMO_LOGIN.customer.email,
    password: DEMO_LOGIN.customer.password,
    role: "CUSTOMER" as const,
  },
  seller: {
    name: "Demo Seller",
    email: DEMO_LOGIN.seller.email,
    password: DEMO_LOGIN.seller.password,
    role: "SELLER" as const,
  },
} as const;
