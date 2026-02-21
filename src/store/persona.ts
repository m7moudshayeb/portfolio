import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersonaId, Persona, PersonaFeatures } from "@/types/persona";
import { PERSONA_LIST } from "@/constants/personas";

const PERSONA_STORAGE_KEY = "portfolio-persona";

interface PersonaState {
  currentId: PersonaId | null;
  hasChosenPersona: boolean;
  personas: Persona[];
  setPersona: (id: PersonaId) => void;
  getCurrentPersona: () => Persona | null;
  getFeatures: () => PersonaFeatures | null;
  switchPersona: (id: PersonaId) => void;
  resetPersona: () => void;
}

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set, get) => ({
      currentId: null,
      hasChosenPersona: false,
      personas: PERSONA_LIST,

      setPersona: (id: PersonaId) => {
        set({ currentId: id, hasChosenPersona: true });
      },

      getCurrentPersona: () => {
        const { currentId, personas } = get();
        if (!currentId) return null;
        return personas.find((p) => p.id === currentId) ?? null;
      },

      getFeatures: () => {
        const persona = get().getCurrentPersona();
        return persona?.features ?? null;
      },

      switchPersona: (id: PersonaId) => {
        set({ currentId: id });
      },

      resetPersona: () => {
        set({ currentId: null, hasChosenPersona: false });
      },
    }),
    { name: PERSONA_STORAGE_KEY },
  ),
);
