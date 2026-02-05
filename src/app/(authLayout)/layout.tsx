
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="w-full max-w-md p-4">
                {children}
            </div>
        </div>
    );
}