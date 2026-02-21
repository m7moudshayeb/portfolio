export type PersonaId =
  | 'developer'
  | 'recruiter'
  | 'founder'
  | 'lead'
  | 'curious';

export interface PersonaFeatures {
  cli: boolean;
  debugMe: boolean;
  games: boolean;
  timeline: boolean;
  cvDownload: boolean;
  flowDiagrams: boolean;
  saasDemo: boolean;
}

export interface Persona {
  id: PersonaId;
  label: string;
  description: string;
  features: PersonaFeatures;
}

/* Persona config (gate, theme, AI tone) – used by welcome gate and AppShell */
export type PersonaTheme =
  | 'terminal'
  | 'minimal'
  | 'product'
  | 'architecture'
  | 'playful';

export type FeatureKey =
  | 'cli'
  | 'debugLab'
  | 'architectureOverlay'
  | 'timeline'
  | 'impactCards'
  | 'saasSimulation'
  | 'caseStudy'
  | 'scalingGuide'
  | 'games';

export type AITone =
  | 'technical'
  | 'concise'
  | 'business'
  | 'strategic'
  | 'friendly';

/** Intro animation / entry feel: terminal, smooth, saas, structured, playful */
export type EntryExperience =
  | 'terminal'
  | 'smooth'
  | 'saas'
  | 'structured'
  | 'playful';

export interface PersonaConfigItem {
  theme: PersonaTheme;
  features: FeatureKey[];
  aiTone: AITone;
  gate: {
    label: string;
    emoji: string;
    description: string;
  };
  /** First-screen entry: headline, subline, intro type (drives layout/animation). */
  entry?: {
    headline: string;
    subline: string;
    experience: EntryExperience;
  };
}
