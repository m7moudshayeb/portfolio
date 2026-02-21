import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const PlainCounter = ({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) => {
  return (
    <div className='rounded border border-border bg-card p-3'>
      <span className='text-sm text-muted-foreground'>No memo</span>
      <p className='text-2xl font-mono font-bold'>{count}</p>
      <button
        type='button'
        onClick={onIncrement}
        className='mt-2 rounded bg-muted px-2 py-1 text-sm hover:bg-muted/80'
      >
        +1
      </button>
    </div>
  );
};

const MemoCounter = ({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) => {
  return (
    <div className='rounded border border-border bg-card p-3'>
      <span className='text-sm text-muted-foreground'>Memoized</span>
      <p className='text-2xl font-mono font-bold'>{count}</p>
      <button
        type='button'
        onClick={onIncrement}
        className='mt-2 rounded bg-muted px-2 py-1 text-sm hover:bg-muted/80'
      >
        +1
      </button>
    </div>
  );
};

const MemoizedCounter = React.memo(MemoCounter);

function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}

export function DebugMeSection() {
  const [plain, setPlain] = useState(0);
  const [memo, setMemo] = useState(0);
  const [, setDummy] = useState(0);
  const renderCount = useRenderCount();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='rounded-lg border border-border bg-card p-6'
    >
      <h2 className='font-mono text-lg font-semibold text-foreground'>
        Debug Me
      </h2>
      <p className='mt-1 text-sm text-muted-foreground'>
        Parent re-renders: {renderCount}. Click +1 on either counter — only the
        non-memo counter re-renders its sibling.
      </p>
      <div className='mt-4 flex flex-wrap gap-4'>
        <PlainCounter
          count={plain}
          onIncrement={() => setPlain((c) => c + 1)}
        />
        <MemoizedCounter
          count={memo}
          onIncrement={() => setMemo((c) => c + 1)}
        />
      </div>
      <button
        type='button'
        onClick={() => setDummy((d) => d + 1)}
        className='mt-4 rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80'
      >
        Force parent re-render
      </button>
    </motion.section>
  );
}
