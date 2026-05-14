"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import {
  Menu,
  ShoppingCart,
  Heart,
  LogOut,
  ChevronDown,
  Pill,
  Zap,
  Home,
  ShoppingBag,
  LogIn,
  UserPlus,
  SunMoon,
  LayoutDashboard,
  User,
  ShieldCheck,
  MoreHorizontal,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./modeTaggle";
import { NavbarNotifications } from "./NavbarNotifications";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { dashboardHrefForRole, profileHrefForRole } from "@/lib/dashboard-routes";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  items?: MenuItem[];
}

type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;
  const role = user?.role;
  const dashHref = dashboardHrefForRole(role);
  const profileHref = profileHrefForRole(role);

  const closeSheet = () => setIsSheetOpen(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch {
      /* ignore */
    }
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          closeSheet();
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const menu: MenuItem[] = [
    { title: "Home", url: "/", icon: <Home className="size-5" /> },
    {
      title: "Shop",
      url: "/shop",
      icon: <ShoppingBag className="size-5" />,
      items: [
        { title: "All Medicines", icon: <Pill className="size-5 text-blue-600" />, url: "/shop" },
        { title: "Find by Category", icon: <Zap className="size-5 text-green-600" />, url: "/find-by-cate" },
      ],
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <nav
        aria-label="Main"
        className={cn(
          "fixed top-0 z-50 w-full border-b pt-[max(0px,env(safe-area-inset-top))] transition-all duration-300",
          scrolled
            ? "border-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 py-1 shadow-md shadow-blue-900/20"
            : "border-slate-200/80 bg-white/95 py-2 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90"
        )}
      >
        <div className="container mx-auto flex h-9 min-h-9 max-w-[100vw] items-center justify-between gap-2 px-3 sm:h-10 sm:px-4 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-8">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2 outline-none">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border transition-all sm:size-8",
                  scrolled ? "border-white/30 bg-white/15" : "border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-emerald-500/10"
                )}
              >
                <Image src="/logo.png" alt="MediStore" width={28} height={28} className="object-contain p-0.5" />
              </div>
              <span className="truncate text-base font-black tracking-tighter sm:text-lg md:text-xl">
                <span className={cn(scrolled ? "text-white" : "text-blue-600")}>Medi</span>
                <span className={cn(scrolled ? "text-emerald-200" : "text-emerald-600")}>Store</span>
              </span>
            </Link>

            <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => renderMenuItem(item, pathname, scrolled))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            <div
              className={cn(
                scrolled &&
                  "[&_button]:border-white/35 [&_button]:bg-white/15 [&_button]:text-white [&_button:hover]:bg-white/25 [&_button_svg]:text-white"
              )}
            >
              <ModeToggle />
            </div>

            <div
              className={cn(
                scrolled &&
                  "[&_button]:border-white/35 [&_button]:bg-white/10 [&_button]:text-white [&_button:hover]:bg-white/20 [&_button_svg]:text-white"
              )}
            >
              <NavbarNotifications signedIn={!!user && !isPending} />
            </div>

            {user && !isPending && (
              <Link
                href="/wishlist"
                className={cn(
                  "relative flex min-h-9 min-w-9 items-center justify-center rounded-full p-1.5 touch-manipulation transition-colors",
                  scrolled ? "text-white hover:bg-white/15" : "text-slate-700 hover:text-rose-600 dark:text-slate-200"
                )}
                aria-label="Wishlist"
              >
                <Heart className="size-5" />
              </Link>
            )}

            <Link
              href="/cart"
              className={cn(
                "relative flex min-h-9 min-w-9 items-center justify-center rounded-full p-1.5 touch-manipulation transition-colors",
                scrolled ? "text-white hover:bg-white/15" : "text-slate-700 hover:text-blue-600 dark:text-slate-200"
              )}
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span
                  className={cn(
                    "absolute right-0 top-0 flex size-5 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                    scrolled ? "border-white bg-white text-blue-600" : "border-white bg-blue-600 text-white dark:border-slate-950"
                  )}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {!isPending && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 max-w-[240px] gap-2 rounded-full px-2.5 text-sm font-semibold",
                        scrolled ? "border-white/40 bg-white/10 text-white hover:bg-white/20" : "border-blue-500/25"
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {(user.name?.charAt(0) ?? "?").toUpperCase()}
                      </span>
                      <span className="truncate">{user.name}</span>
                      <ChevronDown className="size-4 shrink-0 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 rounded-2xl border p-2 shadow-xl">
                    <DropdownMenuLabel className="flex items-start gap-3 rounded-lg bg-muted/50 px-3 py-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 text-sm font-bold text-white">
                        {(user.name?.charAt(0) ?? "?").toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-1.5 truncate text-sm font-bold">
                          {user.name}
                          {role === "ADMIN" && <ShieldCheck className="size-4 shrink-0 text-blue-500" aria-hidden />}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        {role && (
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{role}</p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5">
                      <Link href={dashHref} className="flex items-center gap-2 font-medium">
                        <LayoutDashboard className="size-4 text-blue-600" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5">
                      <Link href={profileHref} className="flex items-center gap-2 font-medium">
                        <User className="size-4 text-emerald-600" />
                        Profile & settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5">
                      <Link href="/wishlist" className="flex items-center gap-2 font-medium">
                        <Heart className="size-4 text-rose-600" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer rounded-lg py-2.5 font-bold text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                    >
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "h-9 rounded-full px-4 text-sm font-bold shadow-sm",
                      scrolled ? "bg-white text-blue-700 hover:bg-emerald-50" : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-blue-500/20"
                    )}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-9 rounded-full border-2 px-4 text-sm font-bold shadow-sm",
                      scrolled
                        ? "border-white/60 bg-white/15 text-white hover:bg-white/25 hover:text-white"
                        : "border-emerald-600/40 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/50 dark:bg-slate-900 dark:text-emerald-100 dark:hover:bg-emerald-950/40"
                    )}
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "rounded-full",
                      scrolled ? "border-white/40 bg-white/10 text-white hover:bg-white/20" : "border-slate-200"
                    )}
                  >
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-none bg-white p-0 dark:bg-slate-950">
                  <SheetHeader className="border-b bg-slate-50/80 p-6 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <Image src="/logo.png" alt="MediStore" width={32} height={32} />
                      <SheetTitle className="text-left text-xl font-black">
                        <span className="text-blue-600">Medi</span>
                        <span className="text-emerald-600">Store</span>
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto px-4 py-6">
                    {user && (
                      <div className="mb-6 space-y-2 rounded-2xl border border-blue-500/15 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Signed in</p>
                        <p className="truncate font-bold">{user.name}</p>
                        <div className="flex flex-col gap-2 pt-1">
                          <Link
                            href={dashHref}
                            onClick={closeSheet}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white"
                          >
                            <LayoutDashboard className="size-4" />
                            Dashboard
                          </Link>
                          <Link
                            href={profileHref}
                            onClick={closeSheet}
                            className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold"
                          >
                            <User className="size-4" />
                            Profile & settings
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={closeSheet}
                            className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2.5 text-sm font-semibold text-rose-700 dark:text-rose-300"
                          >
                            <Heart className="size-4" />
                            Wishlist
                          </Link>
                        </div>
                      </div>
                    )}

                    <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu</p>
                    <Accordion type="single" collapsible className="w-full">
                      {menu.map((item) => renderMobileMenuItem(item, closeSheet, pathname))}
                    </Accordion>

                    <div className="mt-8 px-2">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Appearance</p>
                      <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
                        <span className="flex items-center gap-2 text-sm font-bold">
                          <SunMoon className="size-4 text-blue-600" /> Theme
                        </span>
                        <ModeToggle />
                      </div>
                    </div>

                    {!user && (
                      <div className="mt-auto flex flex-col gap-3 pt-8">
                        <Link href="/login" onClick={closeSheet}>
                          <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 py-6 text-lg font-bold text-white">
                            <LogIn className="mr-2 size-5" /> Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={closeSheet}>
                          <Button variant="outline" className="w-full rounded-2xl border-2 py-6 text-lg font-bold">
                            <UserPlus className="mr-2 size-5" /> Register
                          </Button>
                        </Link>
                      </div>
                    )}

                    {user && (
                      <div className="mt-auto border-t pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            closeSheet();
                            void handleLogout();
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl p-4 font-bold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut size={20} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "min-h-[calc(2.25rem+0.5rem+0.5rem+env(safe-area-inset-top,0px))] sm:min-h-[calc(2.5rem+0.5rem+0.5rem+env(safe-area-inset-top,0px))]",
          scrolled && "min-h-[calc(2.25rem+0.25rem+0.25rem+env(safe-area-inset-top,0px))] sm:min-h-[calc(2.5rem+0.25rem+0.25rem+env(safe-area-inset-top,0px))]"
        )}
        aria-hidden
      />

      <div className="lg:hidden fixed bottom-0 left-0 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom,0px))] w-full items-stretch justify-around border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <BottomTab label="Home" icon={<Home size={22} />} href="/" active={pathname === "/"} />
        <BottomTab label="Shop" icon={<ShoppingBag size={22} />} href="/shop" active={pathname === "/shop"} />
        {user ? (
          <>
            <BottomTab
              label="Account"
              icon={<LayoutDashboard size={22} />}
              href={dashHref}
              active={
                pathname.startsWith("/dashboard") ||
                pathname.startsWith("/admin-dashboard") ||
                pathname.startsWith("/seller-dashboard")
              }
            />
            <BottomTab
              label="More"
              icon={<MoreHorizontal size={22} />}
              active={isSheetOpen}
              onClick={() => setIsSheetOpen(true)}
            />
          </>
        ) : (
          <>
            <BottomTab label="Login" icon={<LogIn size={22} />} href="/login" active={pathname === "/login"} />
            <BottomTab label="Register" icon={<UserPlus size={22} />} href="/register" active={pathname === "/register"} />
          </>
        )}
      </div>
    </>
  );
};

function BottomTab(props: {
  label: string;
  icon: React.ReactNode;
  href?: string;
  active: boolean;
  onClick?: () => void;
}) {
  const { label, icon, href, active, onClick } = props;
  const activeColor = "text-blue-600 dark:text-sky-400";
  const content = (
    <>
      <div className={`transition-all duration-300 ${active ? `${activeColor} -translate-y-1 scale-110` : "text-slate-400"}`}>
        {icon}
      </div>
      <span className={`mt-1 text-[10px] font-bold ${active ? activeColor : "text-slate-400"}`}>{label}</span>
      {active && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute -top-px h-1 w-10 rounded-full bg-blue-600"
          transition={{ type: "spring", duration: 0.45 }}
        />
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative flex flex-1 flex-col items-center justify-center py-1"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? "/"} className="relative flex flex-1 flex-col items-center justify-center py-1">
      {content}
    </Link>
  );
}

const renderMenuItem = (item: MenuItem, pathname: string, scrolled: boolean) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            "rounded-full bg-transparent font-bold",
            scrolled ? "text-white hover:bg-white/15" : "text-slate-600 hover:text-blue-600 dark:text-slate-400"
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 rounded-2xl border-none p-4 shadow-2xl md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link href={subItem.url} className="group flex flex-row gap-4 rounded-xl p-3 hover:bg-blue-600/5">
                    <div className="rounded-lg bg-slate-50 p-2 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800">
                      {subItem.icon}
                    </div>
                    <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 dark:text-slate-200">{subItem.title}</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  const isActive = pathname === item.url;
  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={cn(
          "relative inline-flex h-10 items-center rounded-full px-4 text-[15px] font-bold transition-colors",
          scrolled
            ? isActive
              ? "bg-white/20 text-white"
              : "text-white/90 hover:bg-white/10"
            : isActive
              ? "bg-blue-600/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
              : "text-slate-600 hover:text-blue-600 dark:text-slate-400"
        )}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, closeFn: () => void, pathname: string) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="mb-2 border-b-0">
        <AccordionTrigger className="py-3 text-lg font-bold hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-slate-800">{item.icon}</div>
            {item.title}
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-4">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              onClick={closeFn}
              className="group flex items-center gap-3 rounded-xl p-3 hover:bg-blue-600/5"
            >
              <div className="rounded-lg bg-slate-50 p-2 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800">
                {subItem.icon}
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{subItem.title}</div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  const isActive = pathname === item.url;
  return (
    <Link
      key={item.title}
      href={item.url}
      onClick={closeFn}
      className={cn(
        "flex items-center gap-3 py-3 text-lg font-bold",
        isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600 dark:text-slate-300"
      )}
    >
      <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-slate-800">{item.icon}</div>
      {item.title}
    </Link>
  );
};

export { Navbar };
