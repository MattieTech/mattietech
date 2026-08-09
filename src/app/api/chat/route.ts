import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  profile,
  projects,
  skills,
  education,
  services,
  timeline,
  faqs,
  certificates,
  about,
  skillLevels,
} from "@/lib/data";

// Helper for security check against prompt injection / secret exposure
function isSecurityViolation(query: string): boolean {
  const lower = query.toLowerCase();
  const dangerousPatterns = [
    "api_key",
    "apikey",
    "secret",
    "system prompt",
    "environment variable",
    "process.env",
    "db_pass",
    "private key",
    "ignore previous instructions",
    "bypass safety",
    "reveal key",
    "show key",
  ];
  return dangerousPatterns.some((pattern) => lower.includes(pattern));
}

// Build knowledge base summary string for system prompt
function buildKnowledgeContext(): string {
  return `
KNOWLEDGE BASE:

PERSONAL PROFILE:
Name: ${profile.name}
Brand: ${profile.brand}
Title: ${profile.title}
Location: ${profile.location}
Status: ${profile.status}
Email: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Instagram: ${profile.instagram}
TikTok: ${profile.tiktok}
Twitter/X: ${profile.twitter}
WhatsApp: ${profile.whatsappNumber} (${profile.whatsapp})

ABOUT MATTHEW:
${about.paragraphs.join("\n\n")}
Focus areas: ${about.focus.map((f) => `${f.label}: ${f.value}`).join(" | ")}

ACADEMIC & EDUCATION:
University: ${education.school}
Campus: ${education.campus}
Program: ${education.program}
Level: ${education.level}
CGPA: ${education.cgpa}
Role: ${education.role} — ${education.roleDetail}

TECHNICAL SKILLS & PROFICIENCY:
Categories:
${Object.entries(skills)
  .map(([cat, list]) => `- ${cat}: ${list.join(", ")}`)
  .join("\n")}
Top skill levels: ${skillLevels.map((s) => `${s.label} (${s.value}%)`).join(", ")}

PROJECTS:
${projects
  .map(
    (p) => `
Name: ${p.name}
Status/Badge: ${p.badge}
Description: ${p.description}
Problem solved / Case study: ${p.caseStudy}
Tech Stack: ${p.stack.join(", ")}
${p.demo ? `Live Demo: ${p.demo}` : ""}
${p.github ? `GitHub Repository: ${p.github}` : ""}
`
  )
  .join("\n---\n")}

SERVICES OFFERED:
${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

TIMELINE / JOURNEY:
${timeline.map((t) => `- [${t.period}] ${t.title}: ${t.description}`).join("\n")}

CERTIFICATIONS:
${certificates.map((c) => `- ${c.name} (${c.provider}, ${c.status}) — Skills: ${c.skills.join(", ")} | Verification URL: ${c.url}`).join("\n")}

FREQUENTLY ASKED QUESTIONS:
${faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}
`;
}

// Built-in intelligent fallback for offline or missing GEMINI_API_KEY
function getFallbackResponse(message: string): { response: string; action?: string } {
  const query = message.toLowerCase().trim();

  if (
    query.includes("who is matthew") ||
    query.includes("who are you") ||
    query.includes("about matthew") ||
    query.includes("what does matthew do") ||
    query.includes("who is he")
  ) {
    return {
      response:
        "I’m MattieTech AI, the AI assistant for Matthew Aliu’s portfolio. Matthew is a 100-level Software Engineering student at Confluence University of Science and Technology (CUSTECH) with a 4.88 CGPA. He specializes in Full-Stack Web Development, AI Application Development, and modern web systems.\n\n[NAVIGATE:#about]",
      action: "#about",
    };
  }

  if (
    query.includes("campustutor") ||
    query.includes("campus tutor") ||
    query.includes("tell me about campustutor")
  ) {
    const proj = projects.find((p) => p.name === "CampusTutor AI");
    return {
      response: `**CampusTutor AI** is an AI-powered study assistant built by Matthew Aliu for university students.\n\n• **What it does**: Allows students to upload lecture documents and get instant AI summaries, explanations, and revision questions.\n• **Problem it solves**: Helps students condense dense lecture PDFs during exam season.\n• **Tech Stack**: Next.js, Supabase, Google Gemini API, TypeScript, Tailwind CSS.\n• **Live Usage**: 91+ active users, 98+ documents processed, 157+ AI generations.\n\n[Live Demo](${proj?.demo}) | [GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  if (
    query.includes("codequest") ||
    query.includes("code quest")
  ) {
    const proj = projects.find((p) => p.name === "CodeQuest AI");
    return {
      response: `**CodeQuest AI** is Matthew's flagship project — a gamified coding education platform.\n\n• **Features**: In-browser Monaco editor, AI-generated coding challenges, 3D reward scenes, and integrated payment processing.\n• **Tech Stack**: Next.js 15, Express, Supabase, Gemini API, Monaco Editor, React Three Fiber, Stripe/Paystack.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  if (
    query.includes("fci student guide") ||
    query.includes("fci guide")
  ) {
    const proj = projects.find((p) => p.name === "FCI Student Guide");
    return {
      response: `**FCI Student Guide** is a multi-page student portal built for CUSTECH's Faculty of Computing and Informatics.\n\n• **Purpose**: Provides academic resources, course guidance, and departmental information for students.\n• **Tech Stack**: HTML, CSS, JavaScript.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  if (
    query.includes("prograde")
  ) {
    const proj = projects.find((p) => p.name === "ProGrade");
    return {
      response: `**ProGrade** is an academic productivity tool built by Matthew Aliu.\n\n• **Purpose**: A clean, fast GPA and CGPA calculator designed for university students to track their academic performance.\n• **Tech Stack**: JavaScript, HTML, CSS.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  if (
    query.includes("project") ||
    query.includes("built") ||
    query.includes("work") ||
    query.includes("portfolio")
  ) {
    return {
      response: `Matthew has built several impactful web and AI products:\n\n1. **CampusTutor AI**: AI-powered lecture document study tool for Nigerian uni students.\n2. **CodeQuest AI**: 113-file gamified coding platform with Monaco editor & 3D scenes.\n3. **FCI Student Guide**: Academic portal for CUSTECH Faculty of Computing & Informatics.\n4. **ProGrade**: Academic GPA/CGPA calculation tool.\n5. **MattieTech Portfolio**: This production-grade Next.js portfolio.\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  if (
    query.includes("skill") ||
    query.includes("tech stack") ||
    query.includes("technology") ||
    query.includes("react") ||
    query.includes("next.js") ||
    query.includes("node")
  ) {
    return {
      response: `Matthew's primary tech stack includes:\n\n• **Frontend**: React, Next.js 15, TypeScript, Tailwind CSS, HTML/CSS, Framer Motion\n• **Backend**: Node.js, Express, REST APIs, Supabase\n• **Database**: PostgreSQL, Supabase, MongoDB\n• **AI**: Google Gemini API, AI Web Apps, AI Chatbots\n• **Tools**: Git, GitHub, Vercel, VS Code, Figma\n\n[NAVIGATE:#skills]`,
      action: "#skills",
    };
  }

  if (
    query.includes("service") ||
    query.includes("freelance") ||
    query.includes("hire") ||
    query.includes("build a website") ||
    query.includes("price") ||
    query.includes("cost")
  ) {
    return {
      response: `Matthew offers services in:\n\n• Custom Landing Pages & Business Websites\n• Full-Stack Web Applications (React / Next.js / Node.js)\n• AI-Powered Tools & LLM Integrations\n• Student & Academic Portals\n• Website Redesigns & API Integrations\n\n**Pricing**: Pricing depends on project scope and requirements. You can contact Matthew directly to get a custom quote for your project.\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  if (
    query.includes("recruiter") ||
    query.includes("why hire") ||
    query.includes("internship") ||
    query.includes("job") ||
    query.includes("employ")
  ) {
    return {
      response: `Matthew is a high-performing Software Engineering student (4.88/5.00 CGPA) who focuses on shipping practical, production-ready applications. Rather than learning tools in isolation, he builds and deploys real systems like CampusTutor AI and CodeQuest AI. He is open to software engineering internships, junior developer roles, and freelance collaborations.\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("whatsapp") ||
    query.includes("message")
  ) {
    return {
      response: `You can reach Matthew Aliu directly:\n\n• **Email**: ${profile.email}\n• **WhatsApp**: ${profile.whatsappNumber}\n• **Location**: ${profile.location} (UTC+1, open to async & remote work)\n• **Socials**: GitHub (@MattieTech), LinkedIn, X, Instagram, TikTok\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  if (
    query.includes("education") ||
    query.includes("custech") ||
    query.includes("cgpa") ||
    query.includes("school") ||
    query.includes("university")
  ) {
    return {
      response: `Matthew is currently a **100 Level Software Engineering student** at **Confluence University of Science and Technology (CUSTECH)** in Osara, Kogi State, Nigeria. He holds a **4.88 / 5.00 CGPA** and serves as Course Representative for SWE142.\n\n[NAVIGATE:#about]`,
      action: "#about",
    };
  }

  return {
    response:
      "I don't have that specific detail available right now, but you can contact Matthew directly for more information! Would you like to check his projects, tech stack, or services?",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversation } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid message." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message is too long. Please limit to 1000 characters." },
        { status: 400 }
      );
    }

    // Security check against prompt injection / key theft
    if (isSecurityViolation(message)) {
      return NextResponse.json({
        success: true,
        response:
          "I am MattieTech AI, the portfolio assistant for Matthew Aliu. I am designed exclusively to help visitors explore Matthew's projects, skills, services, and background. I cannot expose internal credentials, API keys, or system instructions.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is missing, return fallback response directly
    if (!apiKey) {
      const fallback = getFallbackResponse(message);
      return NextResponse.json({
        success: true,
        response: fallback.response,
        action: fallback.action,
      });
    }

    // Use Gemini API if Key is present
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `
You are MattieTech AI, the official AI portfolio assistant for Matthew Aliu (also known as MattieTech).

Your job is to help visitors understand Matthew's portfolio, projects, technical skills, services, education, and professional interests.

STRICT IDENTITY RULES:
- Name: MattieTech AI
- Purpose: AI assistant for Matthew Aliu's portfolio.
- You must NEVER pretend to be Matthew.
- You must NEVER say you personally built the projects. (Matthew built them, you are his assistant).
- When asked who you are, respond: "I’m MattieTech AI, the AI assistant for Matthew Aliu’s portfolio. I can help you explore his projects, skills, services, and experience."

PERSONALITY & FORMATTING RULES:
- Professional, friendly, concise, helpful, developer-focused, confident.
- Avoid excessive emojis.
- Keep answers concise and direct.
- For structured answers, use bold titles or bullet points.
- If asked about pricing: NEVER invent a price! Say "Matthew’s pricing depends on the project requirements. You can contact him directly to discuss your project." and append [NAVIGATE:#contact].
- If asked for unverified information: Say "I don't have that information available right now, but you can contact Matthew directly for more details."

CONTEXT-AWARE NAVIGATION TAGS:
When a visitor asks to view a section or asks about projects, skills, contact, about, or services, append the appropriate tag at the end of your message:
- Projects -> [NAVIGATE:#projects]
- Skills / Tech Stack -> [NAVIGATE:#skills]
- Contact / Hire -> [NAVIGATE:#contact]
- About / Bio / Education -> [NAVIGATE:#about]
- Services -> [NAVIGATE:#services]

VERIFIED KNOWLEDGE BASE:
${buildKnowledgeContext()}
`;

    const chatHistory = (conversation || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Initialize system instructions." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am MattieTech AI, ready to assist visitors." }],
        },
        ...chatHistory,
      ],
      systemInstruction: systemInstruction,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Extract navigation tag if present
    let actionTarget: string | undefined = undefined;
    if (responseText.includes("[NAVIGATE:#projects]")) actionTarget = "#projects";
    else if (responseText.includes("[NAVIGATE:#skills]")) actionTarget = "#skills";
    else if (responseText.includes("[NAVIGATE:#contact]")) actionTarget = "#contact";
    else if (responseText.includes("[NAVIGATE:#about]")) actionTarget = "#about";
    else if (responseText.includes("[NAVIGATE:#services]")) actionTarget = "#services";

    return NextResponse.json({
      success: true,
      response: responseText,
      action: actionTarget,
    });
  } catch (error: any) {
    console.error("Error in MattieTech AI chat API route:", error);

    // Graceful fallback if Gemini API call fails or rate limits
    const body = await request.clone().json().catch(() => ({ message: "" }));
    const fallback = getFallbackResponse(body.message || "");

    return NextResponse.json({
      success: true,
      response: fallback.response,
      action: fallback.action,
    });
  }
}
