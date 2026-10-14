export const profile = {
  name: "Gulcan Damdelen",
  firstName: "Gulcan",
  role: "Full Stack Developer",
  location: "Nicosia, Cyprus",
  email: "damdelengulcan@gmail.com",
  linkedin: "https://www.linkedin.com/in/gulcan-damdelen",
  summary:
    "I’m a Full Stack Developer with over 2 years of experience building scalable web applications using Angular and Spring Boot. I have hands-on experience across frontend and backend development, RESTful APIs, SQL databases, and enterprise application architecture.",
};

export const skillGroups = [
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Typed, component-driven interfaces that scale with the business.",
    items: ["Angular 16+", "TypeScript", "React", "Next.js", "JavaScript", "Tailwind CSS"],
  },
  {
    key: "backend",
    title: "Backend",
    blurb: "Robust services and clean contracts between systems.",
    items: ["Java", "Spring Boot", "REST APIs", "JPA"],
  },
  {
    key: "data",
    title: "Data",
    blurb: "Relational models that stay fast and honest.",
    items: ["PostgreSQL", "SQL"],
  },
  {
    key: "architecture",
    title: "Architecture",
    blurb: "Enterprise application design, end to end.",
    items: ["Enterprise apps", "API design", "Full-stack delivery"],
  },
];

export const languages = [
  { name: "English", level: "Native / Bilingual", value: 100 },
  { name: "Turkish", level: "Native / Bilingual", value: 100 },
  { name: "Greek", level: "Limited working", value: 45 },
];

export const certifications = [
  "GitHub Copilot Beginner to Pro — AI for Coding & Development",
  "Fundamentals of Deep Learning",
  "Advanced Software Engineering Virtual Experience Program",
];

export type JourneyItem = {
  kind: "role" | "education";
  title: string;
  org: string;
  period: string;
  duration?: string;
  location?: string;
  description: string;
  tech?: string[];
  current?: boolean;
};

export const journey: JourneyItem[] = [
  {
    kind: "role",
    title: "Full Stack Developer",
    org: "Consolidated Contractors Company",
    period: "Apr 2024 — Present",
    duration: "2 yrs 7 mos",
    location: "Nicosia, Cyprus",
    description:
      "Building and evolving enterprise web applications end to end — Angular front ends, Spring Boot services, and PostgreSQL persistence through JPA, wired together with REST APIs.",
    tech: ["Angular 16+", "TypeScript", "Spring Boot", "PostgreSQL", "JPA", "REST APIs"],
    current: true,
  },
  {
    kind: "role",
    title: "Junior Frontend Developer",
    org: "University of Nicosia",
    period: "May 2023 — Mar 2024",
    duration: "11 mos",
    description:
      "Shipped modern, responsive interfaces with React and Next.js, styled with Tailwind CSS — the foundation of a product-minded frontend practice.",
    tech: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
  },
  {
    kind: "role",
    title: "Teaching Assistant",
    org: "University of Nicosia",
    period: "Oct 2022 — Dec 2022",
    duration: "3 mos",
    description:
      "Supported students and faculty in the classroom — sharpening the ability to explain complex technical ideas clearly.",
  },
  {
    kind: "role",
    title: "Administrative Assistant",
    org: "MSc in Data Science — University of Nicosia",
    period: "Nov 2021 — Jan 2023",
    duration: "1 yr 3 mos",
    description:
      "Kept a graduate data science programme running smoothly — operations, coordination, and attention to detail behind the scenes.",
  },
  {
    kind: "education",
    title: "BSc, Computer Science",
    org: "University of Nicosia",
    period: "2020 — 2023",
    description:
      "Computer science fundamentals — algorithms, software engineering, and systems — that underpin everything built since.",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  status: "Live" | "In build" | "Queued";
  summary?: string;
  tags?: string[];
  href?: string;
};

// Add a `href` (and summary/tags) to turn a placeholder into a live portfolio card.
export const projects: Project[] = [
  { id: "PRJ-001", title: "Case Study 01", category: "Full Stack · Angular × Spring Boot", status: "In build" },
  { id: "PRJ-002", title: "Case Study 02", category: "Frontend · Next.js", status: "Queued" },
  { id: "PRJ-003", title: "Case Study 03", category: "Open slot", status: "Queued" },
];

export const marquee = [
  "Angular",
  "Spring Boot",
  "TypeScript",
  "Java",
  "PostgreSQL",
  "REST APIs",
  "JPA",
  "Next.js",
  "React",
  "Tailwind CSS",
];
