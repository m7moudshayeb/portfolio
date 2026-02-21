import { PERSONAS } from "@/constants/personas";

export type PersonaId = keyof typeof PERSONAS;

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
