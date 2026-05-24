"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only render the icon after mount.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-[6000] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-foreground/5"
    >
      {mounted ? (
        isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
