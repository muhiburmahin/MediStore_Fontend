"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WishlistRow = { medicineId: string };

export function WishlistHeartButton({
  medicineId,
  className,
  size = "default",
}: {
  medicineId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const { data: session, isPending } = authClient.useSession();
  const signedIn = !!session?.user;
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const sync = useCallback(async () => {
    if (!signedIn) {
      setActive(false);
      return;
    }
    try {
      const r = await fetch("/api/wishlist", { credentials: "include", cache: "no-store" });
      const j = (await r.json().catch(() => ({}))) as { data?: WishlistRow[] };
      const list = Array.isArray(j.data) ? j.data : [];
      setActive(list.some((w) => w.medicineId === medicineId));
    } catch {
      /* ignore */
    }
  }, [signedIn, medicineId]);

  useEffect(() => {
    void sync();
  }, [sync]);

  const toggle = async () => {
    if (!signedIn) {
      toast.info("Sign in to save items to your wishlist.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/wishlist/toggle", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineId }),
      });
      const j = (await r.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        data?: { inWishlist?: boolean };
      };
      if (!r.ok) throw new Error(j.message || "Could not update wishlist");
      const next = !!j.data?.inWishlist;
      setActive(next);
      toast.success(next ? "Saved to wishlist" : "Removed from wishlist");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Wishlist update failed");
    } finally {
      setLoading(false);
    }
  };

  const iconSize = size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5";
  const btnSize = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="icon"
      disabled={loading || isPending}
      onClick={() => void toggle()}
      className={cn(
        "shrink-0 rounded-full border-2 shadow-sm transition-all",
        active && "border-rose-500 bg-gradient-to-br from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700",
        !active && "border-slate-200 hover:border-rose-300 hover:text-rose-600 dark:border-slate-700",
        btnSize,
        className
      )}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
    >
      {loading ? <Loader2 className={cn(iconSize, "animate-spin")} /> : <Heart className={cn(iconSize, active && "fill-current")} />}
    </Button>
  );
}
