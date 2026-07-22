"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSNAME =
  "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // The resolved theme is unknown during SSR, so nothing that depends on it —
  // label, handler, or icon — may render until after mount, or React reports a
  // hydration mismatch.
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <span aria-hidden="true" className={TOGGLE_CLASSNAME}>
        <span className="h-4 w-4" />
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={TOGGLE_CLASSNAME}
    >
      {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
