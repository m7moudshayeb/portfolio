import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEXT = 'Booting developer mode...';
const TYPING_MS = 60;
const HOLD_MS = 800;

interface DeveloperTerminalIntroProps {
  onComplete: () => void;
}

export function DeveloperTerminalIntro({
  onComplete,
}: DeveloperTerminalIntroProps) {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'typing' | 'hold'>('typing');

  useEffect(() => {
    if (phase === 'typing' && display.length < TEXT.length) {
      const t = setTimeout(
        () => setDisplay(TEXT.slice(0, display.length + 1)),
        TYPING_MS,
      );
      return () => clearTimeout(t);
    }
    if (phase === 'typing' && display.length === TEXT.length) {
      setPhase('hold');
      return;
    }
    if (phase === 'hold') {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 300);
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [display, phase, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117] font-mono text-green-400'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center gap-2'>
            <span className='animate-pulse'>{display}</span>
            {phase === 'typing' && <span className='animate-pulse'>|</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
