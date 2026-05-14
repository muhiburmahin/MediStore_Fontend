import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/providers/Providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <main className="pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-[env(safe-area-inset-top,0px)] max-w-[100vw] overflow-x-hidden">
                    {children}
                </main>
            </div>
        </Providers>
    );
}