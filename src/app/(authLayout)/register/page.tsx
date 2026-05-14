import { RegisterForm } from "@/components/modules/authentication/register-form";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] w-full items-center justify-center bg-gradient-to-b from-muted/40 via-background to-background px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
