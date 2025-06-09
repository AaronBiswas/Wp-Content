import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { Container } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/app/site.config";

import Logo from "@/public/logo.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="pb-2">
        <div className="flex flex-col p-5 md:p-7 gap-8">
          <div className="w-screen flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex flex-col flex-1 gap-4 not-prose">
              <Link href="/">
                <h3 className="sr-only">{siteConfig.site_name}</h3>
              </Link>
              <p className="text-lg md:text-3xl font-semibold leading-tight">
                <Balancer>{siteConfig.site_description}</Balancer>
              </p>
            </div>

            <div className="flex flex-col flex-1 gap-8 md:gap-16 md:flex-row">
              <div className="flex flex-col gap-3">
                <h2 className="font-medium text-lg underline underline-offset-4">
                  Website
                </h2>
                <div className="flex flex-col gap-1.5">
                  {Object.entries(mainMenu).map(([key, href]) => (
                    <Link
                      className="hover:underline underline-offset-4 text-base transition-colors"
                      key={href}
                      href={href}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h5 className="font-medium text-lg underline underline-offset-4">
                  Blog
                </h5>
                <div className="flex flex-col gap-1.5">
                  {Object.entries(contentMenu).map(([key, href]) => (
                    <Link
                      className="hover:underline underline-offset-4 text-base transition-colors"
                      key={href}
                      href={href}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-2 mt-2">
            <p className="text-muted-foreground text-sm">
              &copy; All rights reserved. 2025–present.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
