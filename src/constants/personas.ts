import type { Persona } from "@/types/persona";

export const DEVELOPER = "developer";
export const RECRUITER = "recruiter";
export const FOUNDER = "founder";
export const LEAD = "lead";
export const CURIOUS = "curious";

export const PERSONAS = {
  [DEVELOPER]: DEVELOPER,
  [RECRUITER]: RECRUITER,
  [FOUNDER]: FOUNDER,
  [LEAD]: LEAD,
  [CURIOUS]: CURIOUS,
};

export const PERSONA_LIST: Persona[] = [
  {
    id: DEVELOPER,
    label: "Developer",
    description: "Terminal, CLI, Debug Me, code",
    features: {
      cli: true,
      debugMe: true,
      games: false,
      timeline: false,
      cvDownload: false,
      flowDiagrams: false,
      saasDemo: false,
    },
  },
  {
    id: RECRUITER,
    label: "Recruiter",
    description: "Impact, timeline, CV",
    features: {
      cli: false,
      debugMe: false,
      games: false,
      timeline: true,
      cvDownload: true,
      flowDiagrams: false,
      saasDemo: false,
    },
  },
  {
    id: FOUNDER,
    label: "Founder",
    description: "Product, outcomes, SaaS",
    features: {
      cli: false,
      debugMe: false,
      games: false,
      timeline: false,
      cvDownload: false,
      flowDiagrams: false,
      saasDemo: true,
    },
  },
  {
    id: LEAD,
    label: "Technical Lead",
    description: "Architecture, diagrams, tradeoffs",
    features: {
      cli: false,
      debugMe: false,
      games: false,
      timeline: false,
      cvDownload: false,
      flowDiagrams: true,
      saasDemo: false,
    },
  },
  {
    id: CURIOUS,
    label: "Just Curious",
    description: "Games, easter eggs, fun",
    features: {
      cli: false,
      debugMe: false,
      games: true,
      timeline: false,
      cvDownload: false,
      flowDiagrams: false,
      saasDemo: false,
    },
  },
];
