import { motion } from 'framer-motion';

import { usePersonaStore } from '@/store/persona';
import { TimelineView } from '@/components/persona-view/recruiter';
import { DeveloperView } from '@/components/persona-view/developer/developer-view';
import { FounderView } from '@/components/persona-view/founder/founder-view';
import { LeadView } from '@/components/persona-view/lead/lead-view';
import { CuriousView } from '@/components/persona-view/curious/curious-view';
import {
  DEVELOPER,
  RECRUITER,
  FOUNDER,
  LEAD,
  CURIOUS,
} from '@/constants/personas';

export function HomePage() {
  const { getCurrentPersona } = usePersonaStore();
  const persona = getCurrentPersona();

  if (!persona) return null;

  switch (persona.id) {
    case DEVELOPER:
      return <DeveloperView />;
    case RECRUITER:
      return <TimelineView />;
    case FOUNDER:
      return <FounderView />;
    case LEAD:
      return <LeadView />;
    case CURIOUS:
      return <CuriousView />;
    default:
      return (
        <div className='container mx-auto max-w-4xl px-4 py-12'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-lg border border-border bg-card p-8 text-center'
          >
            <h1 className='font-serif text-2xl font-bold'>
              Home – {persona.label} mode
            </h1>
          </motion.div>
        </div>
      );
  }
}
