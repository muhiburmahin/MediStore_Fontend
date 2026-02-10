"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, TabletIcon as Medicine } from "lucide-react";

const footerLinks = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Our Services", href: "/services" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
    ],
    quickLinks: [
        { name: "Shop All", href: "/shop" },
        { name: "Prescription", href: "/prescription" },
        { name: "Baby Care", href: "/category/baby-care" },
        { name: "Personal Care", href: "/category/personal-care" },
    ],
    support: [
        { name: "Order Tracking", href: "/track" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Contact Us", href: "/contact" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12 pt-16 pb-8">

                {/* Top Section: Brand & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Identity */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-600 to-green-500 p-2 rounded-xl">
                                <Medicine className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                                <span className="text-blue-600">MediStore</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                            Your trusted partner for authentic medicines and healthcare essentials. Delivering wellness to your doorstep with care and reliability.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <Link key={idx} href="#" className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 transition-all">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Links Grid */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                +880 1234 567 890
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600">
                                    <Mail className="w-4 h-4" />
                                </div>
                                support@medimart.com
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                Dhanmondi, Dhaka,<br />Bangladesh
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Payments */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {new Date().getFullYear()} <span className="font-bold text-slate-700 dark:text-slate-300">MediMart</span>. All rights reserved.
                    </p>

                    {/* Simple Payment Badges */}
                    <div className="flex items-center gap-4 grayscale opacity-60 dark:invert">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/BKash_Logo.svg/1200px-BKash_Logo.svg.png" alt="Bkash" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
}