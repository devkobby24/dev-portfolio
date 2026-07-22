"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems, profile } from "@/data";
import ThemeToggle from "./ui/ThemeToggle";

/** Matches Tailwind's `sm` breakpoint, where the inline links take over. */
const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";

const formatIndex = (position: number) => String(position + 1).padStart(2, "0");

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    // Growing past the breakpoint reveals the inline links, so the overlay —
    // and its scroll lock — must not survive the resize.
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    desktopMedia.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      desktopMedia.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="content-column flex h-16 items-center justify-between gap-6">
          <Link
            href="#top"
            onClick={() => setIsMenuOpen(false)}
            className="-my-1.5 shrink-0 py-1.5 font-mono text-sm tracking-tight text-foreground transition-colors hover:text-link"
          >
            {profile.name}
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
            >
              {isMenuOpen ? (
                <FiX className="h-4 w-4" />
              ) : (
                <FiMenu className="h-4 w-4" />
              )}
            </button>

            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Deliberately a sibling of <header>: the header's backdrop-filter makes
          it the containing block for fixed children, which collapses this panel
          to zero height and leaves it transparent. */}
      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-background sm:hidden"
        >
          <ul className="content-column pt-6">
            {navItems.map((item, itemIndex) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-baseline gap-5 border-b border-border py-5 transition-colors hover:text-link"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatIndex(itemIndex)}
                  </span>
                  <span className="text-2xl font-medium tracking-tight text-foreground">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Nav;
