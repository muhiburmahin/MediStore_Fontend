import { LoginForm } from "@/components/modules/authentication/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}