"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Better-Auth 
import {
  Menu, ShoppingCart, UserCircle, LogOut, ChevronDown,
  LayoutDashboard, Package, Users, Store, Pill, Search, Zap
} from "lucide-react";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./modeTaggle";
import { toast } from "sonner";
import { useSelector } from 'react-redux';
import { RootState } from "@/store";

// --- Types ---
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const Navbar = () => {
  const router = useRouter();
  // const { items } = useCartStore(); 
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  // const cart = useSelector((state: RootState) => state.cart.items);
  //const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);


  // Better-Auth 
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop",
      items: [
        {
          title: "All Medicines",
          description: "Browse our complete catalog of OTC drugs",
          icon: <Pill className="size-5 text-blue-600" />,
          url: "/shop",
        },
        {
          title: "Healthcare",
          description: "Vitamins, supplements and daily care",
          icon: <Zap className="size-5 text-green-600" />,
          url: "/shop?category=healthcare",
        },
      ],
    },
    { title: "Flash Sale", url: "/offers" },

    { title: "Dashboard", url: "/dashboard" },
  ];

  //Better-Auth role base auth
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
    <section className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">

        {/* --- Logo & Desktop Nav --- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="size-10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="MediStore" width={40} height={40} className="object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter hidden sm:block">
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

        {/* --- Actions --- */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              className="pl-10 rounded-full bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border-none w-64 focus-visible:ring-blue-600 transition-all"
              placeholder="Search medicine..."
            />
          </div>

          <ModeToggle />

          <Link
            href={`/cart`}
            className="relative mr-2 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {mounted && cartCount > 0 ? (
              <span className="absolute -right-2 -top-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {/* --- User Section (Better-Auth Dynamic) --- */}
          {!isPending && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full gap-2 border-blue-600/20 bg-blue-600/5 dark:bg-blue-600/10 hover:bg-blue-600/10 dark:text-slate-200 px-2 sm:px-4 transition-all">
                  <UserCircle className="size-5 text-blue-600" />
                  <span className="hidden sm:inline font-bold">{user.name}</span>
                  <ChevronDown className="size-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl dark:bg-slate-900 dark:border-slate-800">
                <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2">
                  Account Overview
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                {/* Role base filtering*/}
                {dashboardLinks["CUSTOMER"]?.map((link) => (
                  <DropdownMenuItem key={link.url} asChild>
                    <Link href={link.url} className="flex items-center gap-3 p-2.5 font-bold rounded-xl cursor-pointer hover:bg-blue-600/10 hover:text-blue-600 dark:text-slate-300 transition-all">
                      <span className="text-blue-600/70">{link.icon}</span> {link.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 font-bold p-2.5 rounded-xl cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30">
                  <LogOut className="mr-2 size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !isPending && (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden sm:block">
                  <button className="relative p-[2px] rounded-full bg-gradient-to-r from-blue-600 to-green-600 group active:scale-95 transition-all">
                    <div className="px-6 py-1.5 rounded-full bg-white dark:bg-slate-950 group-hover:bg-transparent transition-all duration-300">
                      <span className="font-black text-sm bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:text-white transition-all">
                        Login
                      </span>
                    </div>
                  </button>
                </Link>
                <Link href="/register">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 hover:shadow-lg hover:shadow-blue-500/25 text-white rounded-full px-5 sm:px-8 font-black active:scale-95 transition-all group border-none">
                    <span className="relative z-10">Register Now</span>
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  </Button>
                </Link>
              </div>
            )
          )}

          {/* --- Mobile Menu --- */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all">
                  <Menu className="size-6 text-slate-700 dark:text-slate-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-none bg-white dark:bg-slate-950">
                <SheetHeader className="p-6 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 relative bg-white dark:bg-slate-800 rounded-xl shadow-sm p-1">
                      <Image src="/logo.png" alt="MediStore" fill className="object-contain" />
                    </div>
                    <SheetTitle className="text-2xl font-black flex items-center tracking-tight">
                      <span className="text-blue-600">Medi</span>
                      <span className="text-green-600 italic">Store</span>
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="flex flex-col h-full overflow-y-auto">
                  <div className="p-5">
                    {user ? (
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                        <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-xl uppercase">
                          {user.name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 dark:text-slate-100">{user.name}</span>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full w-fit">
                            Online
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase ml-1">Welcome Guest</p>
                        <div className="grid grid-cols-2 gap-3">
                          <Link href="/login"><Button variant="outline" className="w-full font-bold rounded-xl border-blue-600/20 text-blue-600">Login</Button></Link>
                          <Link href="/register"><Button className="w-full font-bold rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white">Register</Button></Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-20">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2">Main Menu</p>
                    <Accordion type="single" collapsible className="w-full space-y-1">
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    {user && (
                      <div className="mt-6 pt-6 border-t dark:border-slate-800">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-3">Your Account</p>
                        <div className="grid grid-cols-1 gap-2">
                          {dashboardLinks["CUSTOMER"]?.map((link) => (
                            <Link key={link.url} href={link.url} className="flex items-center gap-3 p-3 font-bold rounded-xl hover:bg-blue-600/10 hover:text-blue-600 dark:text-slate-300 transition-all group">
                              <span className="text-slate-400 group-hover:text-blue-600">{link.icon}</span>
                              {link.title}
                            </Link>
                          ))}
                          <button onClick={handleLogout} className="flex items-center gap-3 p-3 font-bold rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all mt-4">
                            <LogOut size={18} /> Logout
                          </button>
                        </div>
                      </div>
                    )}
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

// --- Helper Components ---
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-600 bg-transparent transition-colors">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900 border-none rounded-2xl shadow-2xl">
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
      <Link href={item.url} className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-bold text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-600">
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link href={item.url} className="flex flex-row gap-4 rounded-xl p-3 leading-none no-underline transition-all outline-none select-none hover:bg-blue-600/5 dark:hover:bg-blue-600/10 group">
    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
      {item.icon}
    </div>
    <div>
      <div className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{item.title}</div>
      {item.description && <p className="text-xs mt-1 text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>}
    </div>
  </Link>
);

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0 mb-2">
        <AccordionTrigger className="text-lg py-2 font-bold hover:no-underline text-slate-700 dark:text-slate-300">{item.title}</AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <Link key={subItem.title} href={subItem.url} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/5 dark:hover:bg-blue-600/10 group transition-all">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-all text-blue-600 group-hover:text-white">{subItem.icon}</div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-blue-600">{subItem.title}</div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return <Link key={item.title} href={item.url} className="text-lg font-bold text-slate-700 dark:text-slate-300 py-3 block border-b border-slate-50 dark:border-slate-900 hover:text-blue-600">{item.title}</Link>;
};

export { Navbar };