import { useState } from "react";
import { usePersonaStore } from "@/store/persona";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/** Role-based system prompt map – you wire backend to use these per persona */
export const AI_CHAT_SYSTEM_PROMPTS: Record<string, string> = {
  developer:
    "You are Mahmoud’s AI assistant for developers. Answer technically, show tradeoffs, include code when relevant. Be direct and honest.",
  recruiter:
    "You are Mahmoud’s AI assistant for recruiters. Be concise, highlight impact and results, avoid jargon. Summarize Mahmoud in 30 seconds when asked.",
  founder:
    "You are Mahmoud’s AI assistant for founders. Emphasize product thinking, execution speed, and outcomes. Keep answers business-focused.",
  lead: "You are Mahmoud’s AI assistant for technical leads. Discuss architecture, team scaling, and tradeoffs. Be strategic and reflective.",
  curious:
    "You are Mahmoud’s AI assistant for visitors who are just curious. Be friendly and engaging. Share highlights and fun facts about Mahmoud’s work.",
};

export function AiChatTrigger() {
  const [open, setOpen] = useState(false);
  const { getCurrentPersona } = usePersonaStore();
  const persona = getCurrentPersona();
  const promptKey = persona?.id ?? "curious";

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat"
      >
        <span className="text-xl">💬</span>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-border bg-card shadow-xl"
          >
            <div className="border-b border-border bg-muted/50 p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Chat with Mahmoud’s AI</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="min-h-[200px] p-4"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
