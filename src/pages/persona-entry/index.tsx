import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePersonaStore } from '@/store/persona';
import type { PersonaId } from '@/types/persona';
import { PERSONA_IDS } from '@/constants/personas';

const VALID_PERSONAS = new Set<PersonaId>(PERSONA_IDS);

/**
 * When user lands on /:persona (e.g. /developer), set persona in store and redirect to /.
 * Enables direct links and gate navigation to /developer etc. without full reload.
 */
export function PersonaEntryPage() {
  const { persona } = useParams<{ persona: string }>();
  const navigate = useNavigate();
  const setPersona = usePersonaStore((s) => s.setPersona);

  useEffect(() => {
    const id = persona as PersonaId | undefined;
    if (id && VALID_PERSONAS.has(id)) {
      setPersona(id);
      navigate('/', { replace: true });
    } else {
      navigate('/welcome', { replace: true });
    }
  }, [persona, setPersona, navigate]);

  return null;
}
