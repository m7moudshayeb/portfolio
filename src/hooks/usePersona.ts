import { usePersonaStore } from '@/store/persona'

export function usePersona() {
  const currentId = usePersonaStore((s) => s.currentId)
  const personas = usePersonaStore((s) => s.personas)
  const persona = currentId
    ? (personas.find((p) => p.id === currentId) ?? null)
    : null
  const features = persona ? persona.features : null
  const setPersona = usePersonaStore((s) => s.setPersona)
  const switchPersona = usePersonaStore((s) => s.switchPersona)
  const resetPersona = usePersonaStore((s) => s.resetPersona)
  const hasChosenPersona = usePersonaStore((s) => s.hasChosenPersona)
  return {
    currentId,
    persona,
    features,
    setPersona,
    switchPersona,
    resetPersona,
    hasChosenPersona,
  }
}
