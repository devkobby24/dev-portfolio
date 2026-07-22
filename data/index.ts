export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  /** Live deployment, when there is one. */
  liveLink?: string;
  /** Public repository, when the source is open. */
  sourceLink?: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const profile = {
  name: "Justice Duah",
  fullName: "Duah Justice Abban",
  role: "Full-stack developer",
  location: "Accra, Ghana",
  email: "justiceduah09@gmail.com",
  githubUsername: "devkobby24",
  intro:
    "I build web applications end to end — from the interface down to the pipeline that ships it. Most of my recent time has gone into CI/CD, AWS, and making deployments boring.",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Pulse", href: "#pulse" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  paragraphs: [
    "I'm a full-stack developer who cares more about what ships than what demos well. Most of my work sits between a clean interface and the infrastructure that keeps it running — building features, wiring the pipelines that deploy them, and fixing what breaks after.",
    "I've been writing code in public since 2022, mostly across React, Next.js, Vue, and TypeScript, with a recent stretch spent deep in GitHub Actions, AWS, and deployment workflows. I like short feedback loops and working closely with other people.",
  ],
  focus: [
    "Full-stack web — React, Next.js, Vue, TypeScript",
    "CI/CD — GitHub Actions, automated deployments",
    "Cloud — managing and monitoring AWS services",
    "Mobile — React Native and Expo",
  ],
  /** Sourced from the public GitHub profile; see lib/github.ts for the live figures. */
  stats: [
    { label: "Coding since", value: "2022" },
    { label: "Public repos", value: "26" },
    { label: "Languages", value: "7" },
  ],
} as const;

export const projects: Project[] = [
  {
    title: "IntruScan",
    tagline: "Network threat detection with a real-time dashboard",
    description:
      "Final-year capstone. Classifies live network traffic and surfaces actionable alerts on a dashboard, with a Python service behind a Next.js front end.",
    tech: ["Next.js", "Python", "TensorFlow", "Tailwind CSS"],
    year: "2025",
    liveLink: "https://intruscan.vercel.app/",
    sourceLink: "https://github.com/devkobby24/capstone",
  },
  {
    title: "PlugPoint",
    tagline: "Charging-station finder for electric-vehicle owners",
    description:
      "A mobile companion that locates nearby charging stations using live map integration and search, so drivers are never far from a charge.",
    tech: ["React Native", "Expo", "Firebase", "Google Maps"],
    year: "2025",
    sourceLink: "https://github.com/devkobby24/mini-project",
  },
  {
    title: "TraceFlow",
    tagline: "Issue tracking for small teams",
    description:
      "An issue tracker for creating, assigning, and following work across projects, with error monitoring wired in from the start.",
    tech: ["Next.js", "TypeScript", "Prisma", "Sentry"],
    year: "2024",
    liveLink: "https://traceflow.vercel.app",
  },
  {
    title: "RoamAI",
    tagline: "Trip planning from a destination and a budget",
    description:
      "Turns a destination, budget, and length of stay into a day-by-day itinerary, with saved trips backed by Firebase.",
    tech: ["React", "Vite", "Firebase", "Tailwind CSS"],
    year: "2024",
    liveLink: "https://roamai.vercel.app",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Frontend & DevOps Intern",
    company: "Syncline IT",
    period: "2025",
    description:
      "Built responsive web interfaces and supported the CI/CD pipelines and deployments behind client web and application projects.",
  },
  {
    role: "Full-Stack Developer Intern",
    company: "TST IT Agency",
    period: "2024",
    description:
      "Developed custom web applications end to end, shipping features from concept to deployment as part of an agile delivery team.",
  },
];

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "devkobby24",
    href: "https://github.com/devkobby24",
  },
  {
    label: "LinkedIn",
    handle: "justice-duah",
    href: "https://www.linkedin.com/in/justice-duah-7ab6b4239",
  },
  {
    label: "X",
    handle: "kay_dev24",
    href: "https://twitter.com/kay_dev24",
  },
];
