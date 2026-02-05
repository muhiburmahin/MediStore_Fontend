import { RegisterForm } from "@/components/modules/authentication/register-form";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
}