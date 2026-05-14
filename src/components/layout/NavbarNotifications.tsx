"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, Check, Loader2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type NotificationRow = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  createdAt: string;
};

export function NavbarNotifications({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NotificationRow[]>([]);

  const load = useCallback(async () => {
    if (!signedIn) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?unread=false", {
        credentials: "include",
        cache: "no-store",
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        data?: NotificationRow[];
        message?: string;
      };
      if (!res.ok) {
        if (res.status === 401) {
          setItems([]);
          return;
        }
        throw new Error(body.message || "Could not load notifications");
      }
      setItems(Array.isArray(body.data) ? body.data : []);
    } catch (e) {
      console.error(e);
      toast.error("Notifications could not be loaded");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [signedIn]);

  useEffect(() => {
    if (open && signedIn) void load();
  }, [open, signedIn, load]);

  const unread = items.filter((n) => !n.isRead).length;

  const markOne = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) return;
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch {
      /* ignore */
    }
  };

  const markAll = async () => {
    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) return;
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All marked read");
    } catch {
      toast.error("Could not mark all read");
    }
  };

  if (!signedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative size-10 shrink-0 rounded-full text-slate-600 dark:text-slate-300"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[min(100vw-2rem,22rem)] p-4">
          <p className="text-center text-sm font-medium text-slate-500">
            Sign in to see your notifications.
          </p>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-10 shrink-0 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[min(100vw-2rem,22rem)] max-h-[min(70vh,24rem)] overflow-hidden rounded-2xl border border-slate-200 p-0 shadow-xl dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">
            Notifications
          </span>
          {items.some((n) => !n.isRead) && (
            <button
              type="button"
              onClick={() => void markAll()}
              className="text-[10px] font-bold uppercase text-blue-600 hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-[min(60vh,20rem)] overflow-y-auto overscroll-contain">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="size-8 animate-spin text-blue-600" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-slate-500">
              <Inbox className="size-10 opacity-40" />
              <p className="text-sm font-medium">You&apos;re all caught up.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!n.isRead) void markOne(n.id);
                    }}
                    className={`flex w-full gap-3 px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-900 ${
                      !n.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-blue-600">
                      {!n.isRead ? (
                        <span className="block size-2 rounded-full bg-blue-600" />
                      ) : (
                        <Check className="size-4 text-slate-400" aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-900 dark:text-slate-100">
                        {n.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                        {n.message}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
