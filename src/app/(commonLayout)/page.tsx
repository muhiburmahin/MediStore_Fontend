// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";

// export default async function Home() {
//   const session = await authClient.getSession();
//   console.log(session)
//   return (
//     <div>
//       <Button>Click hare</Button>
//     </div>
//   );
// }

// src/app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Heart, ChevronRight, LayoutGrid, Clock, Package, ShieldCheck, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input"; // নিশ্চিত করুন আপনার UI কম্পোনেন্টগুলো এই পাথে আছে
import { Button } from "@/components/ui/button"; // নিশ্চিত করুন আপনার UI কম্পোনেন্টগুলো এই পাথে আছে
import { cn } from "@/lib/utils"; // shadcn/ui এর জন্য প্রয়োজনীয়

// ডেমো ডাটা - আপনার ব্যাকএন্ড থেকে এই ডাটা আসবে
const heroBanners = [
  { id: 1, title: "Your Health, Our Priority", description: "Get your essential medicines delivered safely and swiftly.", image: "/hero-banner-1.jpg" },
  { id: 2, title: "Exclusive Discounts", description: "Save big on your daily health needs.", image: "/hero-banner-2.jpg" },
];

const featuredCategories = [
  { id: 1, name: "Pain Relief", icon: <Image src="/icons/pain-relief.png" alt="Pain Relief" width={40} height={40} /> },
  { id: 2, name: "Vitamins & Supplements", icon: <Image src="/icons/vitamins.png" alt="Vitamins" width={40} height={40} /> },
  { id: 3, name: "Skin Care", icon: <Image src="/icons/skin-care.png" alt="Skin Care" width={40} height={40} /> },
  { id: 4, name: "Diabetes Care", icon: <Image src="/icons/diabetes.png" alt="Diabetes Care" width={40} height={40} /> },
  { id: 5, name: "First Aid", icon: <Image src="/icons/first-aid.png" alt="First Aid" width={40} height={40} /> },
];

const trendingProducts = [
  { id: 1, name: "Paracetamol 500mg", price: "৳30", imageUrl: "/products/paracetamol.jpg" },
  { id: 2, name: "Vitamin C 1000mg", price: "৳120", imageUrl: "/products/vitamin-c.jpg" },
  { id: 3, name: "Antacid Syrup", price: "৳80", imageUrl: "/products/antacid.jpg" },
  { id: 4, name: "Hand Sanitizer (50ml)", price: "৳60", imageUrl: "/products/sanitizer.jpg" },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Note: Hero banner images need to be in your public folder or accessible via URL
  // Example paths: /public/hero-banner-1.jpg, /public/products/paracetamol.jpg

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header - Assuming you have a separate Header component in src/components/layout/header.tsx */}
      {/* For simplicity, I'm integrating a basic header here. */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="MediStore Logo" width={40} height={40} className="rounded-full shadow-md" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Medi<span className="text-green-500">Store</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/shop" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium hidden md:flex">Shop</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium hidden md:flex">Categories</Link>
            <Link href="/flash-sale" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium hidden md:flex">Flash Sale</Link>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-60"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">0</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart size={20} />
            </Button>
            <Link href="/login" passHref>
              <Button>
                <User size={18} className="mr-2" /> Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white">
          <Image
            src={heroBanners[currentBanner].image}
            alt="Hero Banner"
            fill
            style={{ objectFit: "cover", opacity: 0.6 }}
            className="z-0"
          />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-up">
              {heroBanners[currentBanner].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-100">
              {heroBanners[currentBanner].description}
            </p>
            <Link href="/shop" passHref>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-lg transition-transform transform hover:scale-105">
                Shop Now <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Clock size={48} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-400">Always here to help you with your health needs.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Package size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">Get your medicines delivered right to your doorstep.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <ShieldCheck size={48} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">Safe and reliable payment options for peace of mind.</p>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredCategories.map((category) => (
              <Link href={`/category/${category.id}`} key={category.id} passHref>
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {category.icon}
                  <p className="mt-4 text-lg font-semibold text-center">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-blue-600 mb-4">{product.price}</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" passHref>
              <Button size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">
                View All Products <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer - Assuming a separate Footer component */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-200 dark:text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="MediStore Logo" width={30} height={30} className="rounded-full" />
              <span className="text-xl font-bold text-blue-400">Medi<span className="text-green-300">Store</span></span>
            </Link>
            <p className="text-sm">Your trusted online pharmacy for all your health needs. Quality medicines, delivered fast.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul>
              <li className="mb-2"><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li className="mb-2"><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li className="mb-2"><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
              <li className="mb-2"><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul>
              {featuredCategories.slice(0, 4).map((category) => (
                <li key={category.id} className="mb-2"><Link href={`/category/${category.id}`} className="hover:text-blue-400">{category.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <p className="flex items-center gap-2 mb-2"><Phone size={16} /> +880 1XXXXXXXXX</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@medistore.com</p>
            <div className="flex gap-4 mt-4">
              {/* Social media icons */}
              <Link href="#" className="hover:text-blue-400"><Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} /></Link>
              <Link href="#" className="hover:text-blue-400"><Image src="/icons/twitter.png" alt="Twitter" width={24} height={24} /></Link>
              <Link href="#" className="hover:text-blue-400"><Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} /></Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center text-sm border-t border-gray-700 pt-6">
          &copy; {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}