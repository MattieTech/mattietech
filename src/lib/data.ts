export const profile = {
  name: "Matthew Aliu",
  brand: "MattieTech",
  title: "Software Engineering Student",
  location: "Lokoja, Kogi State, Nigeria",
  status: "Open to internships, freelance work and graduate software engineering roles.",
  statusShort: "open to internships & freelance work",
  quote: "Building solutions that solve real-world problems.",
  email: "matthewaliu001@gmail.com",
  github: "https://github.com/MattieTech",
  linkedin: "https://linkedin.com/in/mattietech",
  instagram: "https://www.instagram.com/mattietechdev",
  tiktok: "https://www.tiktok.com/@mattietech",
  twitter: "https://x.com/mattie_tech",
  threads: "https://threads.net/@mattietechdev",
  facebook: "https://facebook.com/profile.php?id=61577319774801",
  youtube: "https://www.youtube.com/@Mattie_Tech",
  whatsapp: "https://wa.me/2348088686829",
  whatsappNumber: "+234 808 868 6829",
  resumeHref: "/resume/matthew-aliu-resume.pdf",
};

export const heroStats = [
  { value: "4+", label: "Shipped products" },
  { value: "113", label: "Files in CodeQuest AI" },
  { value: "100+", label: "Days of #100DaysOfCode" },
  { value: "6", label: "Platforms documenting the build" },
];

export const services = [
  {
    title: "Web development",
    description:
      "Landing pages, business websites, and web apps built with React, Next.js, and Tailwind — fast, responsive, and easy to maintain.",
  },
  {
    title: "AI-powered tools",
    description:
      "Custom tools that put LLMs to work on a specific problem — study aids, content generation, internal assistants.",
  },
  {
    title: "Campus & student tools",
    description:
      "GPA/CGPA calculators, course guides, and student-facing portals built from first-hand understanding of the need.",
  },
  {
    title: "E-commerce setup",
    description:
      "WordPress/WooCommerce storefronts for small businesses selling physical goods — including gadgets and accessories.",
  },
  {
    title: "Brand-in-public strategy",
    description:
      "Guidance on turning your build process into content — platform-specific captions, cadence, and consistency.",
  },
];

export const faqs = [
  {
    question: "Are you available for internships or freelance work?",
    answer:
      "Yes — I'm actively open to internships, remote junior roles, and freelance web projects, alongside my studies.",
  },
  {
    question: "What's your usual tech stack for freelance projects?",
    answer:
      "Usually React or Next.js with Tailwind CSS on the frontend, and Node.js/Express or Supabase on the backend — but I'll match the stack to the project, including WordPress/WooCommerce for e-commerce.",
  },
  {
    question: "Where are you based, and what time zone do you work in?",
    answer: `Based in ${profile.location} — West Africa Time (UTC+1). Comfortable working async with clients in other time zones.`,
  },
  {
    question: "Can I follow along with what you're building?",
    answer:
      "Yes — I document the whole build process publicly under #100DaysOfCode and #MattieTech across Instagram, TikTok, Threads, YouTube Shorts, Facebook and X.",
  },
];

export const followPlatforms = [
  { label: "Instagram Reels", href: "https://www.instagram.com/mattietechdev" },
  { label: "TikTok", href: "https://www.tiktok.com/@mattietech" },
  { label: "Threads", href: "https://threads.net/@mattietechdev" },
  { label: "YouTube Shorts", href: "https://www.youtube.com/@Mattie_Tech" },
  { label: "Facebook", href: "https://facebook.com/profile.php?id=61577319774801" },
  { label: "X", href: "https://x.com/mattie_tech" },
];


export const headlines = [
  "I build software.",
  "I solve real problems.",
  "I create modern web experiences.",
  "I design scalable systems.",
  "I build AI-powered products.",
];

export const about = {
  paragraphs: [
    "I'm a Software Engineering student at Confluence University of Science and Technology, currently ranked at the top of my class with a 4.88/5.00 CGPA, and I build products that solve real problems for real people.",
    "My work spans frontend engineering, backend systems, UI/UX and AI-powered applications — from a document-intelligence assistant used by dozens of students, to internal tools for my own department. I care as much about how something feels to use as I do about how it's built.",
    "I learn in public. Since starting this journey I've documented almost every line of progress across Facebook, Threads, X, TikTok, Instagram and YouTube under #100DaysOfCode and #MattieTech — partly for accountability, mostly because I think the process is as useful to share as the outcome.",
    "Software, to me, is a discipline of trade-offs: performance against readability, speed against correctness, simplicity against flexibility. I'm still early in my career, but I already know I want to spend it building things that are both technically sound and genuinely pleasant to use.",
  ],
  focus: [
    { label: "Currently", value: "Full-stack development, AI-powered tooling" },
    { label: "Learning", value: "System design, AI engineering, cybersecurity fundamentals" },
    { label: "Method", value: "Learn in public — build, ship, document, repeat" },
  ],
};

export const education = {
  school: "Confluence University of Science and Technology (CUSTECH)",
  campus: "Osara, Kogi State, Nigeria",
  program: "B.Sc. Software Engineering",
  level: "100 Level",
  cgpa: "4.88 / 5.00",
  role: "Course Representative, SWE142",
  roleDetail: "Manage academic records and coordination for 100+ students in the department.",
};

export const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "REST APIs"],
  Database: ["PostgreSQL", "Supabase", "MongoDB"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  Learning: ["System Design", "AI Engineering", "Cybersecurity"],
};

export const skillLevels = [
  { label: "JavaScript / TypeScript", value: 88 },
  { label: "Supabase / PostgreSQL", value: 75 },
  { label: "React & Next.js", value: 90 },
  { label: "Payments — Stripe / Paystack", value: 55 },
  { label: "Tailwind CSS / UI engineering", value: 85 },
  { label: "Applied AI (Gemini / LLM APIs)", value: 65 },
  { label: "Node.js / Express", value: 70 },
  { label: "Motion — Framer Motion", value: 60 },
];

export type Project = {
  name: string;
  badge: string;
  description: string;
  caseStudy: string;
  stack: string[];
  github?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
  accent: "cyan" | "indigo" | "violet" | "teal";
  preview?: string;
};

export const projects: Project[] = [
  {
    name: "CampusTutor AI",
    badge: "Live",
    description:
      "An AI-powered study assistant built for Nigerian university students. Upload a lecture document and it generates clean summaries, explanations and revision questions in seconds.",
    caseStudy:
      "Built to solve a real problem I saw every exam season: students drowning in dense lecture PDFs with no time to condense them. CampusTutor AI now has 91 active users, has processed 98 documents, and has produced 157 AI generations — real usage, not a demo.",
    stack: ["Next.js", "Supabase", "Google Gemini API", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/mattietech/campustutor-ai",
    demo: "https://campustutor-ai.vercel.app",
    demoLabel: "Live demo",
    featured: true,
    accent: "cyan",
    preview: "/images/projects/campustutor-ai.png",
  },
  {
    name: "CodeQuest AI",
    badge: "Flagship",
    description:
      "A gamified, AI-powered coding education platform — a 113-file production-ready build with quests, progress tracking, and an AI tutor guiding learners through real coding challenges.",
    caseStudy:
      "My most ambitious build to date: an in-browser Monaco editor, AI-generated challenges, 3D reward scenes and integrated payments, architected as a genuine production system rather than a tutorial project.",
    stack: ["Next.js 15", "Express", "Supabase", "Gemini API", "Monaco Editor", "React Three Fiber", "Stripe / Paystack"],
    github: "https://github.com/mattietech/codequest-ai",
    demoLabel: "Request early access",
    featured: true,
    accent: "indigo",
    preview: "/images/projects/codequest-ai.png",
  },
  {
    name: "FCI Student Guide",
    badge: "Shipped",
    description:
      "A multi-page portal for CUSTECH's Faculty of Computing and Informatics, giving students a single place to find course information, departmental resources and guidance.",
    caseStudy:
      "Started as a simple HTML/CSS site to help my own faculty find scattered information, then grew into a maintained multi-page portal used across multiple sessions.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mattietech/fci-student-guide",
    featured: true,
    accent: "violet",
    preview: "/images/projects/fci-student-guide.png",
  },
  {
    name: "ProGrade",
    badge: "Shipped",
    description:
      "A clean, fast GPA and CGPA calculator built for university students, branded under MattieTech — one of my earliest shipped tools and still in active use.",
    caseStudy:
      "One of my first real products. Simple by design, but it taught me the fundamentals of shipping something other people actually rely on.",
    stack: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/mattietech/prograde",
    accent: "teal",
    preview: "/images/projects/prograde.png",
  },
  {
    name: "MattieTech Portfolio",
    badge: "Live",
    description:
      "This site — a production-grade personal portfolio with a custom design system, dark/light theming, an interactive terminal and full accessibility and performance passes.",
    caseStudy:
      "Rebuilt from scratch with a deliberate design system rather than a template — every section, animation and interaction chosen to reflect how I actually work.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/mattietech/portfolio",
    demo: "https://mattietech.dev",
    demoLabel: "Live demo",
    accent: "cyan",
    preview: "/images/projects/mattietech-portfolio.png",
  },
];

export type Certificate = {
  name: string;
  provider: string;
  badge: string;
  id: string;
  status: string;
  url: string;
  skills: string[];
};

export const certificates: Certificate[] = [
  {
    name: "CSS Basics Certification",
    provider: "HackerRank",
    badge: "HR",
    id: "fbb421ee...",
    status: "Verified Credential",
    url: "https://www.hackerrank.com/certificates/fbb421ee03ec",
    skills: ["CSS Grid & Flexbox", "Responsive Design", "Selectors & Specificity"],
  },
  {
    name: "JavaScript Basics Certification",
    provider: "HackerRank",
    badge: "HR",
    id: "5ac96aba...",
    status: "Verified Credential",
    url: "https://www.hackerrank.com/certificates/5ac96aba4539",
    skills: ["ES6+ Data Structures", "Functions & Scope", "Asynchronous JavaScript"],
  },
  {
    name: "JavaScript Developer Certification",
    provider: "freeCodeCamp",
    badge: "FCC",
    id: "javascript-v9...",
    status: "Verified Credential",
    url: "https://www.freecodecamp.org/certification/mattie_tech/javascript-v9",
    skills: ["Algorithms & Problem Solving", "Object-Oriented Programming", "Functional Programming"],
  },
];

export type Milestone = {
  period: string;
  title: string;
  description: string;
};

export const timeline: Milestone[] = [
  {
    period: "Origin",
    title: "First lines of code — on a phone",
    description:
      "Started learning web development from a mobile device, working through HTML and CSS fundamentals and building the first authentication UI mockups.",
  },
  {
    period: "Foundations",
    title: "HTML, CSS & JavaScript",
    description:
      "Built ProGrade, a GPA/CGPA calculator, and the first version of the FCI Student Guide — moving from tutorials to shipping tools other students actually used.",
  },
  {
    period: "Leveling up",
    title: "React, Next.js & real products",
    description:
      "Adopted React and Next.js, rebuilt the FCI Student Guide as a full faculty portal, and started documenting the journey publicly as #100DaysOfCode / #MattieTech.",
  },
  {
    period: "AI era",
    title: "Building AI-powered applications",
    description:
      "Shipped CampusTutor AI to real users and built CodeQuest AI, a 113+ file gamified learning platform — combining AI APIs, payments and 3D interfaces.",
  },
  {
    period: "Now",
    title: "Software Engineering @ CUSTECH",
    description:
      "100-level Software Engineering student with a 4.88/5.00 CGPA, serving as Course Representative for SWE142, and preparing for internship applications with a growing portfolio.",
  },
  {
    period: "Next",
    title: "Internships & deeper systems work",
    description:
      "Targeting a software engineering internship, deepening system design fundamentals, and laying groundwork for a long-term interest in cybersecurity.",
  },
];

export const terminalCommands = {
  whoami: `Matthew Aliu — "MattieTech"
Software Engineering student, CUSTECH.
Building full-stack + AI-powered products.
Learning in public since day one.`,
  skills: Object.entries(skills)
    .map(([category, items]) => `${category.padEnd(10)} ${items.join(", ")}`)
    .join("\n"),
  education: `${education.program}
${education.school}
${education.campus}
Level: ${education.level}   CGPA: ${education.cgpa}
Role: ${education.role}`,
  projects: projects
    .map((p) => `- ${p.name}: ${p.stack.slice(0, 3).join(", ")}`)
    .join("\n"),
  contact: `email     ${profile.email}
github    ${profile.github.replace("https://", "")}
linkedin  ${profile.linkedin.replace("https://", "")}
status    ${profile.status}`,
  help: `Available commands:
  whoami      about me
  skills      technical skills
  education   academic background
  projects    featured work
  contact     get in touch
  clear       clear the terminal`,
};
