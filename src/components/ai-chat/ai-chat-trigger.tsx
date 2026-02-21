import { useState } from 'react';
import { usePersonaStore } from '@/store/persona';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { aiSystemPrompts, aiChatPreSeeds } from '@/constants/ai';

export const AI_CHAT_SYSTEM_PROMPTS = aiSystemPrompts;

export function AiChatTrigger() {
  const [open, setOpen] = useState(false);
  const { getCurrentPersona } = usePersonaStore();
  const persona = getCurrentPersona();
  const preSeed = persona ? aiChatPreSeeds[persona.id] : aiChatPreSeeds.curious;

  return (
    <>
      <Button
        className='fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg'
        size='icon'
        onClick={() => setOpen((o) => !o)}
        aria-label='Open AI chat'
      >
        <span className='text-xl'>💬</span>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className='fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-border bg-card shadow-xl'
          >
            <div className='border-b border-border bg-muted/50 p-3'>
              <div className='flex items-center justify-between'>
                <span className='font-medium'>Chat with Mahmoud's AI</span>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className='min-h-[200px] p-4'>
              <p className='text-xs text-muted-foreground'>
                Suggested: {preSeed}
              </p>
              <p className='mt-4 text-sm text-muted-foreground'>
                Chat UI (backend wiring coming soon).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
