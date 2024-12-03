"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="dark" // Set a consistent default theme
      attribute="class"
      enableSystem={false} // Disable system preference to avoid theme switching during hydration
    >
      {children}
    </NextThemesProvider>
  );
}
