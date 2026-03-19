import { OrderSuccess } from '@/components/modules/success/OrderSuccess';



interface OrderSuccessPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
    const params = await searchParams;
    const orderId = typeof params.orderId === 'string' ? params.orderId : "N/A";

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <OrderSuccess orderId={orderId} />
        </main>
    );
}