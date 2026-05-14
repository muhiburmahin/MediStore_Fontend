/**
 * Demo credentials — keep in sync with MediStore_Backend `src/scripts/seed.ts` defaults / `.env`.
 */
export const DEMO_LOGIN = {
  admin: {
    title: "Admin",
    email: "developermdmahin@gmail.com",
    password: "pass1234a",
  },
  seller: {
    title: "Seller",
    email: "mdmahincse@gmail.com",
    password: "pass1234a",
  },
  customer: {
    title: "Customer",
    email: "muhiburmahin.edu@gmail.com",
    password: "pass1234a",
  },
} as const;

export const DEMO_REGISTER_PREFILL = {
  customer: {
    name: "Demo Customer",
    email: "muhiburmahin.edu@gmail.com",
    password: "pass1234a",
    role: "CUSTOMER" as const,
  },
  seller: {
    name: "Demo Seller",
    email: "mdmahincse@gmail.com",
    password: "pass1234a",
    role: "SELLER" as const,
  },
} as const;
