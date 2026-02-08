"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { APP_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export const MainNav = () => {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-8  md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            aria-label="Home page"
          >
            <span className="hidden font-bold sm:inline-block">
              {APP_CONFIG.TITLE}
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {APP_CONFIG.NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      active={isActive}
                      className={cn(navigationMenuTriggerStyle(), {
                        "bg-yellow-500": isActive,
                      })}
                    >
                      <Link href={item.href} passHref>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};
