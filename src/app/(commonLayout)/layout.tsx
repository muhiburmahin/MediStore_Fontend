import { Navbar } from "@/components/layout/Navbar";

export default async function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <Navbar />
        {children}
    </div>;
}