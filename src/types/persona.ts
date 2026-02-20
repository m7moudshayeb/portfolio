export type PersonaId = 'developer' | 'recruiter' | 'founder' | 'lead' | 'curious'

export interface PersonaFeatures {
  cli: boolean
  debugMe: boolean
  games: boolean
  timeline: boolean
  cvDownload: boolean
  flowDiagrams: boolean
  saasDemo: boolean
}

export interface Persona {
  id: PersonaId
  label: string
  description: string
  features: PersonaFeatures
}

export const PERSONA_IDS: PersonaId[] = [
  'developer',
  'recruiter',
  'founder',
  'lead',
  'curious',
]
