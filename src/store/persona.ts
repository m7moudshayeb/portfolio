import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PersonaId, Persona, PersonaFeatures } from '@/types/persona'

const PERSONA_LIST: Persona[] = [
  {
    id: 'developer',
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
    id: 'recruiter',
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
    id: 'founder',
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
    id: 'lead',
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
    id: 'curious',
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
]

const PERSONA_STORAGE_KEY = 'portfolio-persona'

interface PersonaState {
  currentId: PersonaId | null
  hasChosenPersona: boolean
  personas: Persona[]
  setPersona: (id: PersonaId) => void
  getCurrentPersona: () => Persona | null
  getFeatures: () => PersonaFeatures | null
  switchPersona: (id: PersonaId) => void
  resetPersona: () => void
}

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set, get) => ({
      currentId: null,
      hasChosenPersona: false,
      personas: PERSONA_LIST,

      setPersona: (id: PersonaId) => {
        set({ currentId: id, hasChosenPersona: true })
      },

      getCurrentPersona: () => {
        const { currentId, personas } = get()
        if (!currentId) return null
        return personas.find((p) => p.id === currentId) ?? null
      },

      getFeatures: () => {
        const persona = get().getCurrentPersona()
        return persona?.features ?? null
      },

      switchPersona: (id: PersonaId) => {
        set({ currentId: id })
      },

      resetPersona: () => {
        set({ currentId: null, hasChosenPersona: false })
      },
    }),
    { name: PERSONA_STORAGE_KEY }
  )
)
