"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import { motion } from "framer-motion";
import {
  Menu, ShoppingCart, UserCircle, LogOut, ChevronDown,
  Pill, Zap, Home, ShoppingBag, LayoutDashboard,
  LogIn, UserPlus, SunMoon
} from "lucide-react";

import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./modeTaggle";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  items?: MenuItem[];
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeSheet = () => setIsSheetOpen(false);

  const handleLogout = async () => {
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
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard className="size-5" /> },
  ];

  return (
    <>
      <section className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="size-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="MediStore" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter">
                <span className="text-blue-600">Medi</span>
                <span className="text-green-600 italic">Store</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <ModeToggle />

            {/* Cart Button */}
            <Link href="/cart" className="relative p-2 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors" />
              {mounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white dark:border-slate-950">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!isPending && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full gap-2 border-blue-600/20 px-4">
                      <UserCircle className="size-5 text-blue-600" />
                      <span className="font-bold">{user.name}</span>
                      <ChevronDown className="size-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 font-bold cursor-pointer">
                      <LogOut className="mr-2 size-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-xl font-black text-lg shadow-xl active:scale-95 disabled:grayscale flex justify-center items-center transition-all">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-xl font-black text-lg shadow-xl active:scale-95 disabled:grayscale flex justify-center items-center transition-all">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full border-slate-200">
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0 border-none bg-white dark:bg-slate-950">
                  <SheetHeader className="p-6 border-b bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <Image src="/logo.png" alt="MediStore" width={32} height={32} />
                      <SheetTitle className="text-xl font-black italic">
                        <span className="text-blue-600">Medi</span>
                        <span className="text-green-600">Store</span>
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Navigation</p>
                    <Accordion type="single" collapsible className="w-full">
                      {menu.map((item) => renderMobileMenuItem(item, closeSheet))}
                    </Accordion>

                    <div className="mt-8 px-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Settings</p>
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-bold flex items-center gap-2">
                          <SunMoon className="size-4 text-blue-600" /> Mode
                        </span>
                        <ModeToggle />
                      </div>
                    </div>

                    {mounted && !user && (
                      <div className="mt-10 flex flex-col gap-3 px-2">
                        <Link href="/login" onClick={closeSheet} className="w-full">
                          <Button className="w-full from-green-600 to-blue-600 text-white font-bold rounded-2xl py-7 text-lg shadow-lg shadow-blue-100 dark:shadow-none transition-all border-none">
                            <LogIn className="mr-2 size-5" /> Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={closeSheet} className="w-full">
                          <Button variant="outline" className="w-full border-2 from-green-600 to-blue-600 hover:bg-green-50 dark:hover:bg-green-950 font-bold rounded-2xl py-7 text-lg transition-all shadow-sm">
                            <UserPlus className="mr-2 size-5" /> Register
                          </Button>
                        </Link>
                      </div>
                    )}

                    {user && (
                      <div className="mt-auto mb-10 border-t pt-4 px-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 p-4 font-bold text-red-500 w-full hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all"
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
      </section>

      {/* --- Colorfull Mobile Bottom Navigation --- */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pb-1">
        <BottomTab label="Home" icon={<Home size={22} />} url="/" active={pathname === "/"} activeColor="text-blue-600" />
        <BottomTab label="Shop" icon={<ShoppingBag size={22} />} url="/shop" active={pathname === "/shop"} activeColor="text-green-600" />
        <BottomTab label="Dashboard" icon={<LayoutDashboard size={22} />} url="/dashboard" active={pathname.includes("/dashboard")} activeColor="text-blue-600" />
        <BottomTab label="Login" icon={<UserCircle size={22} />} url="/login" active={pathname === "/login"} activeColor="text-blue-600" />
        <BottomTab label="Register" icon={<UserCircle size={22} />} url="/register" active={pathname === "/register"} activeColor="text-blue-600" />
      </div>
    </>
  );
};

const BottomTab = ({ label, icon, url, active, activeColor }: { label: string, icon: any, url: string, active: boolean, activeColor: string }) => (
  <Link href={url} className="flex flex-col items-center justify-center flex-1 h-full relative group">
    <div className={`transition-all duration-300 transform ${active ? `${activeColor} -translate-y-1.5 scale-110` : 'text-slate-400 group-hover:text-slate-600'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-bold mt-1 transition-colors ${active ? activeColor : 'text-slate-400'}`}>
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="activeTabIndicator"
        className={`absolute -top-[1px] w-10 h-1 rounded-full ${activeColor.replace('text', 'bg')}`}
      />
    )}
  </Link>
);

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900 border-none rounded-2xl shadow-2xl">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link href={subItem.url} className="flex flex-row gap-4 rounded-xl p-3 hover:bg-blue-600/5 group">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">{subItem.icon}</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">{subItem.title}</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <Link href={item.url} className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, closeFn: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0 mb-2">
        <AccordionTrigger className="text-lg py-3 font-bold hover:no-underline text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-600">{item.icon}</div>
            {item.title}
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-4">
          {item.items.map((subItem) => (
            <Link key={subItem.title} href={subItem.url} onClick={closeFn} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/5 group">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">{subItem.icon}</div>
              <div className="font-bold text-sm text-slate-800 dark:text-slate-200">{subItem.title}</div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <Link key={item.title} href={item.url} onClick={closeFn} className="text-lg font-bold py-3 flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600">
      <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-600">{item.icon}</div>
      {item.title}
    </Link>
  );
};

export { Navbar };