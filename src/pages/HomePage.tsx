import { motion } from "framer-motion";

import { usePersonaStore } from "@/store/persona";
import { TimelineView } from "@/components/persona-view/timeline";
import { CliView } from "@/components/persona-view/debugger-cli";
import {
  DEVELOPER,
  RECRUITER,
  // FOUNDER,
  // LEAD,
  // CURIOUS,
} from "@/constants/personas";

export function HomePage() {
  const { getCurrentPersona } = usePersonaStore();
  const persona = getCurrentPersona();

  if (!persona) return null;

  const returnViewPerPersona = () => {
    switch (persona.id) {
      case DEVELOPER:
        return <CliView />;
      case RECRUITER:
        return <TimelineView />;
      default:
        return (
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-border bg-card p-8 text-center"
            >
              <h1 className="font-serif text-2xl font-bold">
                Home – {persona.label} mode
              </h1>
            </motion.div>
          </div>
        );
    }
  };

  // Founder, Lead, Curious: you implement (Epics 3, 4, 5).
  return returnViewPerPersona();
}
