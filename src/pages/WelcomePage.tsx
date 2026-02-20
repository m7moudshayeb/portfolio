import { useNavigate } from "react-router-dom";
import { usePersonaStore } from "@/store/persona";
import type { PersonaId } from "@/types/persona";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const PERSONA_CONFIG: Record<
  PersonaId,
  { label: string; emoji: string; description: string }
> = {
  developer: {
    label: "Developer",
    emoji: "👨‍💻",
    description: "Terminal, CLI, Debug Me, code",
  },
  recruiter: {
    label: "Recruiter",
    emoji: "🧑‍💼",
    description: "Impact, timeline, CV",
  },
  founder: {
    label: "Founder",
    emoji: "🚀",
    description: "Product, outcomes, SaaS",
  },
  lead: {
    label: "Technical Lead",
    emoji: "🧠",
    description: "Architecture, diagrams, tradeoffs",
  },
  curious: {
    label: "Just Curious",
    emoji: "🎲",
    description: "Games, easter eggs, fun",
  },
};

export function WelcomePage() {
  const navigate = useNavigate();
  const setPersona = usePersonaStore((s) => s.setPersona);

  const handleSelect = (id: PersonaId) => {
    setPersona(id);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Before we continue…
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Who are you?</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(
          Object.entries(PERSONA_CONFIG) as [
            PersonaId,
            typeof PERSONA_CONFIG.developer,
          ][]
        ).map(([id, { label, emoji, description }], i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (i + 1) }}
          >
            <Card
              className="cursor-pointer transition-colors hover:border-primary hover:bg-accent/5"
              onClick={() => handleSelect(id)}
            >
              <CardHeader>
                <span className="text-3xl">{emoji}</span>
                <CardTitle className="text-xl">{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
