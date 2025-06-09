import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.svg";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/app/site.config";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileNav } from "@/components/nav/mobile-nav";

export function Navbar({ className }) {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background ${
        className || ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold text-3xl sm:inline-block">
              {siteConfig.site_name}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-4">
          {Object.entries(mainMenu).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
