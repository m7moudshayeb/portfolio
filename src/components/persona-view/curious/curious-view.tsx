import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import curiousContent from '@/content/curious.json';

const { badges, hiddenFacts } = curiousContent as {
  badges: Array<{ id: string; label: string; unlocked: boolean }>;
  hiddenFacts: Array<{ icon: string; title: string; fact: string }>;
};

export function CuriousView() {
  const [started, setStarted] = useState(false);
  const [factOpen, setFactOpen] = useState<string | null>(null);

  return (
    <div className='curious-gradient-bg min-h-screen'>
      <div className='container mx-auto max-w-4xl px-4 py-12'>
        {/* Screen 1 — Welcome */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-14 text-center'
        >
          <h1 className='text-3xl font-bold text-foreground md:text-4xl'>
            You chose curiosity. Good.
          </h1>
          <p className='mt-3 text-muted-foreground'>Let's explore.</p>
          {!started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='mt-8'
            >
              <button
                type='button'
                onClick={() => setStarted(true)}
                className='rounded-xl bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition hover:opacity-90'
              >
                Start Experience
              </button>
            </motion.div>
          )}
        </motion.section>

        <AnimatePresence>
          {started && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='space-y-14'
            >
              {/* Screen 2 — Performance Mini Game placeholder */}
              <section>
                <h2 className='text-xl font-bold text-foreground'>
                  Performance Mini Game
                </h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Goal: reduce render count. Toggle optimizations, watch the
                  counter. (Coming soon.)
                </p>
                <div className='mt-4 rounded-xl border-2 border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground'>
                  [Mini game: reduce re-renders, timer, score]
                </div>
              </section>

              {/* Screen 3 — Hidden Developer Facts */}
              <section>
                <h2 className='text-xl font-bold text-foreground'>
                  Hidden Developer Facts
                </h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Click to reveal.
                </p>
                <div className='mt-4 flex flex-wrap gap-3'>
                  {hiddenFacts.map((f) => (
                    <button
                      key={f.title}
                      type='button'
                      onClick={() =>
                        setFactOpen(factOpen === f.title ? null : f.title)
                      }
                      className='rounded-lg border border-border bg-card px-4 py-3 text-left transition hover:border-primary/50'
                    >
                      <span className='text-2xl' aria-hidden>
                        {f.icon}
                      </span>
                      <p className='mt-1 font-medium text-foreground'>
                        {f.title}
                      </p>
                      <AnimatePresence>
                        {factOpen === f.title && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className='mt-2 overflow-hidden text-sm text-muted-foreground'
                          >
                            {f.fact}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </section>

              {/* Screen 4 — Achievement Badges */}
              <section>
                <h2 className='text-xl font-bold text-foreground'>
                  Achievement Badges
                </h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Unlock by exploring.
                </p>
                <div className='mt-4 flex flex-wrap gap-4'>
                  {badges.map((b) => (
                    <div
                      key={b.id}
                      className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                        b.unlocked
                          ? 'border-primary/50 bg-primary/10'
                          : 'border-border bg-card/50 opacity-60'
                      }`}
                    >
                      <span className='text-xl'>{b.unlocked ? '✓' : '○'}</span>
                      <span className='text-sm text-foreground'>{b.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
