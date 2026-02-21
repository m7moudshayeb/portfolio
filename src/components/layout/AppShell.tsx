import { usePersonaStore } from "@/store/persona";
import type { PersonaId } from "@/types/persona";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { AiChatTrigger } from "@/components/ai-chat/AiChatTrigger";
import { NavRecruiter } from "@/components/persona-view/recruiter";
import { motion, AnimatePresence } from "framer-motion";

const PERSONA_LABELS: Record<PersonaId, string> = {
  developer: "Developer",
  recruiter: "Recruiter",
  founder: "Founder",
  lead: "Technical Lead",
  curious: "Just Curious",
};

export function AppShell() {
  const { currentId, switchPersona, getCurrentPersona, personas } =
    usePersonaStore();
  const persona = getCurrentPersona();

  if (!currentId || !persona) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans antialiased"
      data-persona={currentId}
    >
      {/* Switch persona – you can move to a dropdown or nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <nav className="flex items-center gap-2">
            {persona.features.timeline ? (
              <NavRecruiter />
            ) : persona.features.cli ? (
              <div className="text-sm text-muted-foreground">
                CLI bar placeholder – you implement CLI (e.g. /about, /projects)
              </div>
            ) : (
              <a href="/" className="font-serif font-bold">
                Mahmoud Shayeb
              </a>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">View as:</span>
            {personas.map((p) => (
              <Button
                key={p.id}
                variant={currentId === p.id ? "default" : "ghost"}
                size="sm"
                onClick={() => switchPersona(p.id)}
              >
                {PERSONA_LABELS[p.id]}
              </Button>
            ))}
            <a
              href="/welcome"
              className="text-xs text-muted-foreground underline"
            >
              Re-pick
            </a>
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI chat – present in all modes */}
      <AiChatTrigger />
    </div>
  );
}
