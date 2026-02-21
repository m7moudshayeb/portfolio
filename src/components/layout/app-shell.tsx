import { useRef, useEffect, useState } from 'react';
import { usePersonaStore } from '@/store/persona';
import type { PersonaId } from '@/types/persona';
import { Outlet, useNavigate } from 'react-router-dom';
import { AiChatTrigger } from '@/components/ai-chat/ai-chat-trigger';
import { NavRecruiter } from '@/components/persona-view/recruiter';
import { motion, AnimatePresence } from 'framer-motion';
import { personaConfig } from '@/constants/personas';

const PERSONA_LABELS: Record<PersonaId, string> = {
  developer: 'Developer',
  recruiter: 'Recruiter',
  founder: 'Founder',
  lead: 'Technical Lead',
  curious: 'Just Curious',
};

export function AppShell() {
  const navigate = useNavigate();
  const { currentId, switchPersona, getCurrentPersona, personas } =
    usePersonaStore();
  const persona = getCurrentPersona();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentId || !persona) {
    return null;
  }

  const handleSwitch = (id: PersonaId) => {
    switchPersona(id);
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <div
      className='min-h-screen bg-background text-foreground font-sans antialiased'
      data-persona={currentId}
    >
      <header className='sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur'>
        <div className='container mx-auto flex h-14 items-center justify-between px-4'>
          <nav className='flex items-center gap-2'>
            {persona.features.cli ? (
              <div className='text-sm text-muted-foreground font-mono'>
                mahmoud@portfolio ~
              </div>
            ) : (
              <NavRecruiter />
            )}
          </nav>
          <div className='relative' ref={dropdownRef}>
            <button
              type='button'
              onClick={() => setDropdownOpen((o) => !o)}
              className='flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              aria-expanded={dropdownOpen}
              aria-haspopup='listbox'
              aria-label='Switch viewing mode'
            >
              <span>Viewing as: {PERSONA_LABELS[currentId]}</span>
              <span className='text-xs'>(Switch)</span>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className='absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-md border border-border bg-card py-1 shadow-lg'
                  role='listbox'
                >
                  {personas.map((p) => (
                    <button
                      key={p.id}
                      type='button'
                      role='option'
                      aria-selected={currentId === p.id}
                      onClick={() => handleSwitch(p.id)}
                      className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'
                    >
                      <span aria-hidden>{personaConfig[p.id].gate.emoji}</span>
                      <span>{PERSONA_LABELS[p.id]}</span>
                    </button>
                  ))}
                  <div className='border-t border-border pt-1'>
                    <a
                      href='/welcome'
                      className='block px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground'
                    >
                      Re-pick persona
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode='wait'>
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

      <AiChatTrigger />
    </div>
  );
}
