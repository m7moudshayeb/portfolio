import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function ArchitectureOverlay({
  open,
  onClose,
}: ArchitectureOverlayProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A') {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
          return;
        onClose();
      }
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-background/80 backdrop-blur-sm'
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-xl'
            role='dialog'
            aria-label='Architecture overlay'
          >
            <div className='flex items-center justify-between'>
              <h3 className='font-mono font-semibold'>Architecture</h3>
              <button
                type='button'
                onClick={onClose}
                className='rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground'
                aria-label='Close overlay'
              >
                Esc / A
              </button>
            </div>
            <div className='mt-4 space-y-4 font-mono text-sm'>
              <div>
                <h4 className='text-muted-foreground'>Folder structure</h4>
                <pre className='mt-1 whitespace-pre rounded bg-muted/50 p-3 text-xs'>
                  {`src/
  app/          routes, shell
  components/   ui, layout, persona-view/
  store/        persona (Zustand)
  personas/     → constants/personas
  my-resume/    content JSON`}
                </pre>
              </div>
              <div>
                <h4 className='text-muted-foreground'>Data flow</h4>
                <p className='mt-1 text-muted-foreground'>
                  Persona (Zustand, persisted) → layout & theme → feature flags
                  → which sections render. Content from my-resume/*.json.
                </p>
              </div>
              <p className='text-xs text-muted-foreground'>
                Press <kbd className='rounded border px-1'>A</kbd> again to
                close.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
