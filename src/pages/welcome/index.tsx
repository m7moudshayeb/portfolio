import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonaStore } from '@/store/persona';
import type { PersonaId } from '@/types/persona';
import { personaConfig, PERSONA_IDS } from '@/constants/personas';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';

const IDLE_HINT_MS = 5000;

function GateCard({
  id,
  index,
  isSelected,
  onSelect,
  onFocus,
  cardRef,
}: {
  id: PersonaId;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onFocus: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const config = personaConfig[id];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-20, 20], [4, -4]);
  const rotateY = useTransform(x, [-20, 20], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) / 20);
      y.set((e.clientY - cy) / 20);
    },
    [x, y],
  );
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      role='button'
      tabIndex={0}
      aria-label={`Select ${config.gate.label}. ${config.gate.description}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      onFocus={onFocus}
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isSelected ? 1.02 : 1,
        transition: { delay: index * 0.06, duration: 0.25 },
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className='relative cursor-pointer rounded-xl border border-border bg-card p-6 text-left shadow-lg outline-none ring-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/5 focus-visible:ring-2'
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
      }}
    >
      <span className='text-4xl' aria-hidden>
        {config.gate.emoji}
      </span>
      <h3 className='mt-3 font-serif text-xl font-semibold text-foreground'>
        {config.gate.label}
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        {config.gate.description}
      </p>
    </motion.div>
  );
}

export function WelcomePage() {
  const navigate = useNavigate();
  const setPersona = usePersonaStore((s) => s.setPersona);
  const [selectedId, setSelectedId] = useState<PersonaId | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showIdleHint, setShowIdleHint] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelect = useCallback(
    (id: PersonaId) => {
      setSelectedId(id);
      setPersona(id);
      // Short expand + background morph feel, then navigate (no full page reload)
      setTimeout(() => navigate(`/${id}`), 280);
    },
    [navigate, setPersona],
  );

  // Idle hint after 5s
  useEffect(() => {
    idleTimerRef.current = setTimeout(
      () => setShowIdleHint(true),
      IDLE_HINT_MS,
    );
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Keyboard: arrow keys + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Right') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, PERSONA_IDS.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'Left') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        const id = PERSONA_IDS[focusedIndex];
        if (id) {
          e.preventDefault();
          handleSelect(id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, handleSelect]);

  useEffect(() => {
    cardRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  return (
    <div className='persona-gate flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='mx-auto max-w-2xl text-center'
      >
        <h1 className='font-serif text-3xl font-bold text-foreground md:text-4xl'>
          Before we continue — who are you?
        </h1>
        <p className='mt-3 text-lg text-muted-foreground'>
          I adapt the experience depending on your role.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mt-12 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
        role='group'
        aria-label='Choose your role'
      >
        <AnimatePresence mode='wait'>
          {PERSONA_IDS.map((id, i) => (
            <GateCard
              key={id}
              id={id}
              index={i}
              isSelected={selectedId === id}
              onSelect={() => handleSelect(id)}
              onFocus={() => setFocusedIndex(i)}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showIdleHint && !selectedId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='mt-10 text-sm text-muted-foreground'
          >
            Choose your path.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
