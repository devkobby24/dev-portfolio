'use client';

import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import { navItems } from "@/data";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground flex flex-col justify-center items-center mx-auto sm:px-10 px-5 overflow-clip">
      <ThemeToggle />
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
