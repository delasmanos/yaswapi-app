"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const JumpMenuVariants = cva("", {
  variants: {
    variant: {
      row: "flex-row",
      col: "flex-col",
    },
    placement: {
      sticky: "sticky top-4 z-10 w-fit mx-auto",
      default: "",
    },
  },
  defaultVariants: {
    variant: "row",
  },
});

type Section = {
  id: string;
  label: string;
};
type JumpMenuProps = {
  sections: Section[];
} & React.ComponentProps<"ul"> &
  VariantProps<typeof JumpMenuVariants>;

/**
 * If there is a hash in theurl scroll to the element.
 * Observe sections and update the url hash when they enter the viewport.
 *
 */
export function JumpMenu({ sections, variant, placement }: JumpMenuProps) {
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      // when element enter midle of screen setactive feels better
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      router.push(`${pathname}#${id}`, { scroll: false });

      const element = document.getElementById(id);

      if (element) {
        // Section already loaded
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // wait for streaming elements to load and then scroll
        const observer = new MutationObserver(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }
    },
    [router, pathname],
  );

  return (
    <NavigationMenu className={cn(JumpMenuVariants({ placement }))}>
      <NavigationMenuList className={cn(JumpMenuVariants({ variant }))}>
        {sections.map(({ id, label }) => (
          <NavigationMenuItem key={id}>
            <NavigationMenuLink
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className={navigationMenuTriggerStyle()}
              data-active={activeSection === id}
            >
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
