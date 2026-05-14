"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";
import type { Medicine } from "@/types/medicine.type";

type WishlistEntry = {
  id: string;
  medicineId: string;
  medicine: Medicine & { category?: { id: string; name: string } };
};

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<WishlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!session?.user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/wishlist", { credentials: "include", cache: "no-store" });
      const j = (await r.json().catch(() => ({}))) as { data?: WishlistEntry[]; message?: string };
      if (!r.ok) throw new Error(j.message || "Failed to load wishlist");
      setItems(Array.isArray(j.data) ? j.data : []);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Could not load wishlist");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (medicineId: string) => {
    try {
      const r = await fetch(`/api/wishlist/medicine/${medicineId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error((j as { message?: string }).message || "Remove failed");
      }
      setItems((prev) => prev.filter((x) => x.medicineId !== medicineId));
      toast.success("Removed from wishlist");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not remove");
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <Heart className="mx-auto mb-4 size-14 text-rose-400" />
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Your wishlist</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in to view and manage saved medicines.</p>
        <Button asChild className="mt-8 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-8 font-bold">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <Heart className="mx-auto mb-4 size-14 text-slate-300 dark:text-slate-600" />
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Wishlist is empty</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Browse the shop and tap the heart on any medicine to save it here.</p>
        <Button asChild variant="outline" className="mt-8 rounded-full border-2 font-bold">
          <Link href="/shop">Browse medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-2 border-b border-slate-200 pb-6 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-rose-600">Saved</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">Wishlist</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{items.length} item{items.length === 1 ? "" : "s"}</p>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((row) => {
          const m = row.medicine;
          const img = m.images?.[0] || "/placeholder.png";
          return (
            <li
              key={row.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <Link href={`/medicine/${m.id}`} className="relative block aspect-[4/3] bg-slate-50 dark:bg-slate-950">
                <Image src={img} alt={m.name} fill className="object-contain p-4 transition group-hover:scale-[1.02]" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-4">
                {m.category?.name && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">{m.category.name}</span>
                )}
                <Link href={`/medicine/${m.id}`} className="line-clamp-2 font-bold text-slate-900 hover:text-blue-600 dark:text-white">
                  {m.name}
                </Link>
                <p className="text-lg font-black text-blue-600">৳{m.price.toFixed(2)}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 font-bold text-white"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          medicine: {
                            ...m,
                            createdAt: String(m.createdAt),
                            updatedAt: String(m.updatedAt),
                          },
                          quantity: 1,
                        })
                      );
                      toast.success("Added to cart");
                    }}
                  >
                    <ShoppingCart className="mr-1 size-4" />
                    Add to cart
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30"
                    onClick={() => void remove(row.medicineId)}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
