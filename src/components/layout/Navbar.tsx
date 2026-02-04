"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, ShoppingCart, UserCircle, LogOut, ChevronDown,
  LayoutDashboard, Package, Users, Store, Pill, Search, Zap
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// --- Types ---
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; role: "ADMIN" | "SELLER" | "CUSTOMER" } | null>({
    name: "Shohan",
    role: "ADMIN",
  });

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop",
      items: [
        {
          title: "All Medicines",
          description: "Browse our complete catalog of OTC drugs",
          icon: <Pill className="size-5 text-brand" />,
          url: "/shop",
        },
        {
          title: "Healthcare",
          description: "Vitamins, supplements and daily care",
          icon: <Zap className="size-5 text-brand" />,
          url: "/shop?category=healthcare",
        },
      ],
    },
    { title: "Flash Sale", url: "/offers" },
  ];

  const dashboardLinks = {
    CUSTOMER: [
      { title: "My Orders", url: "/orders", icon: <Package size={16} /> },
      { title: "Settings", url: "/profile", icon: <UserCircle size={16} /> },
    ],
    SELLER: [
      { title: "Dashboard", url: "/seller/dashboard", icon: <LayoutDashboard size={16} /> },
      { title: "Inventory", url: "/seller/medicines", icon: <Store size={16} /> },
    ],
    ADMIN: [
      { title: "Admin Panel", url: "/admin", icon: <Users size={16} /> },
      { title: "All Orders", url: "/admin/orders", icon: <Package size={16} /> },
    ],
  };

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">

        {/* --- Logo & Desktop Nav --- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="size-11 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="MediStore"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter hidden sm:block">
              <span className="text-brand-blue">Medi</span>
              <span className="text-brand italic">Store</span>
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

        {/* --- Search & Actions --- */}
        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input className="pl-10 rounded-full bg-slate-100 border-none w-64 focus-visible:ring-brand" placeholder="Search medicine..." />
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-brand/10 hover:text-brand rounded-full transition-colors">
              <ShoppingCart className="size-6" />
              <span className="absolute -top-1 -right-1 bg-brand text-black text-[10px] h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                0
              </span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full gap-2 border-brand/20 bg-brand/5 hover:bg-brand/10 px-2 sm:px-4 transition-all">
                  <UserCircle className="size-5 text-brand" />
                  <span className="hidden sm:inline font-bold text-slate-700">{user.name}</span>
                  <ChevronDown className="size-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
                <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2">
                  {user.role} Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dashboardLinks[user.role].map((link) => (
                  <DropdownMenuItem key={link.url} asChild>
                    <Link href={link.url} className="flex items-center gap-3 p-2.5 font-bold rounded-xl cursor-pointer hover:bg-brand/10 hover:text-brand transition-all">
                      <span className="text-brand/70">{link.icon}</span> {link.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUser(null)} className="text-red-500 font-bold p-2.5 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600">
                  <LogOut className="mr-2 size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-brand hover:bg-brand/90 text-black rounded-full px-6 font-bold shadow-lg shadow-brand/20 active:scale-95 transition-all">
              <Link href="/login">Join Free</Link>
            </Button>
          )}

          {/* --- Mobile Menu --- */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-slate-200">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] rounded-l-[30px] p-0 overflow-y-auto">
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle className="flex items-center gap-2 text-2xl font-black italic">
                    <span className="text-brand-blue">Medi</span>
                    <span className="text-brand">Store</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6 flex flex-col gap-8">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <Button asChild variant="outline" className="rounded-xl border-brand/20 text-brand font-bold hover:bg-brand/5">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-brand hover:bg-brand/90 text-black rounded-xl font-bold">
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Helper Components (No changes needed in logic, just inherits colors) ---

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="font-bold text-slate-600 hover:text-brand bg-transparent transition-colors">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SubMenuLink item={subItem} />
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
      <Link
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-bold text-slate-600 transition-colors hover:text-brand"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0 mb-2">
        <AccordionTrigger className="text-lg py-2 font-bold hover:no-underline text-slate-700">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <Link key={subItem.title} href={subItem.url} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand/5 group transition-all">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-brand group-hover:text-black transition-all">
                {subItem.icon}
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm group-hover:text-brand">{subItem.title}</div>
                <div className="text-xs text-slate-500 line-clamp-1">{subItem.description}</div>
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-lg font-bold text-slate-700 py-3 block border-b border-slate-50 hover:text-brand">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-xl p-3 leading-none no-underline transition-all outline-none select-none hover:bg-brand/5 group"
      href={item.url}
    >
      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-brand group-hover:text-black transition-all shadow-sm">
        {item.icon}
      </div>
      <div>
        <div className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors">{item.title}</div>
        {item.description && (
          <p className="text-xs mt-1 leading-snug text-slate-500 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };