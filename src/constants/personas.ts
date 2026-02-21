import type { Persona, PersonaId, PersonaConfigItem } from '@/types/persona';

export const DEVELOPER = 'developer';
export const RECRUITER = 'recruiter';
export const FOUNDER = 'founder';
export const LEAD = 'lead';
export const CURIOUS = 'curious';

export const PERSONAS: Record<PersonaId, PersonaId> = {
  [DEVELOPER]: DEVELOPER,
  [RECRUITER]: RECRUITER,
  [FOUNDER]: FOUNDER,
  [LEAD]: LEAD,
  [CURIOUS]: CURIOUS,
};

export const PERSONA_IDS: PersonaId[] = [
  'developer',
  'recruiter',
  'founder',
  'lead',
  'curious',
];

/** Gate, theme, entry experience, and AI tone per persona. */
export const personaConfig: Record<PersonaId, PersonaConfigItem> = {
  developer: {
    theme: 'terminal',
    features: ['cli', 'debugLab', 'architectureOverlay'],
    aiTone: 'technical',
    gate: {
      label: 'Developer',
      emoji: '👨‍💻',
      description: 'Dive into architecture, performance & experiments.',
    },
    entry: {
      headline: 'Booting developer mode...',
      subline:
        'CLI + content. Try: about, projects, stack, architecture. Press A for architecture overlay.',
      experience: 'terminal',
    },
  },
  recruiter: {
    theme: 'minimal',
    features: ['timeline', 'impactCards'],
    aiTone: 'concise',
    gate: {
      label: 'Recruiter',
      emoji: '🧑‍💼',
      description: 'Quick overview, impact, and results.',
    },
    entry: {
      headline: '',
      subline: '',
      experience: 'smooth',
    },
  },
  founder: {
    theme: 'product',
    features: ['saasSimulation'],
    aiTone: 'business',
    gate: {
      label: 'Founder',
      emoji: '🚀',
      description: 'Product thinking, outcomes, and speed.',
    },
    entry: {
      headline: 'I build frontend systems that convert, scale, and ship fast.',
      subline: 'Product thinking · SaaS simulation · Shipping philosophy',
      experience: 'saas',
    },
  },
  lead: {
    theme: 'architecture',
    features: ['caseStudy', 'scalingGuide'],
    aiTone: 'strategic',
    gate: {
      label: 'Technical Lead',
      emoji: '🧠',
      description: 'Architecture, scaling, and tradeoffs.',
    },
    entry: {
      headline: 'Scaling frontend systems without chaos.',
      subline:
        'Case studies · State philosophy · Team scaling · Mistakes I made',
      experience: 'structured',
    },
  },
  curious: {
    theme: 'playful',
    features: ['games'],
    aiTone: 'friendly',
    gate: {
      label: 'Just Curious',
      emoji: '🎲',
      description: 'Explore, play, and discover.',
    },
    entry: {
      headline: 'Playground',
      subline: 'Mini games · Easter eggs · Dev journey (coming soon)',
      experience: 'playful',
    },
  },
};

export const PERSONA_LIST: Persona[] = [
  {
    id: DEVELOPER,
    label: 'Developer',
    description: 'Terminal, CLI, Debug Me, code',
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
    label: 'Recruiter',
    description: 'Impact, timeline, CV',
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
    label: 'Founder',
    description: 'Product, outcomes, SaaS',
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
    label: 'Technical Lead',
    description: 'Architecture, diagrams, tradeoffs',
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
    label: 'Just Curious',
    description: 'Games, easter eggs, fun',
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
