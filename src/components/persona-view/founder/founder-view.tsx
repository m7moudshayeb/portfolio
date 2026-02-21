import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import founderContent from '@/content/founder.json';

const {
  hero,
  metrics,
  ctas,
  saas,
  productThinking,
  tradeoff: tradeoffCopy,
  aiPlaceholder,
} = founderContent as {
  hero: { headline: string; subtext: string };
  metrics: Array<{ icon: string; text: string }>;
  ctas: Array<{ label: string; scrollRef: string }>;
  saas: {
    title: string;
    intro: string;
    bullets: string[];
    introClosing: string;
    supportingLine: string;
  };
  productThinking: {
    sectionTitle: string;
    cards: Array<{ title: string; headline: string; body: string }>;
  };
  tradeoff: {
    sectionTitle: string;
    intro: string;
    towardSpeed: string;
    balanced: string;
    towardMaintainability: string;
  };
  aiPlaceholder: { askMe: string[] };
};

export function FounderView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tradeoff, setTradeoff] = useState(50);
  const [tenant, setTenant] = useState('acme');
  const [role, setRole] = useState('admin');
  const [featureOn, setFeatureOn] = useState(true);
  const [plan, setPlan] = useState('pro');
  const saasRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const tradeoffValue = tradeoff;
  const tradeoffText =
    tradeoffValue < 34
      ? tradeoffCopy.towardSpeed
      : tradeoffValue < 67
        ? tradeoffCopy.balanced
        : tradeoffCopy.towardMaintainability;

  return (
    <div className='container mx-auto max-w-4xl px-4 py-10'>
      {/* Screen 1 — Hero */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mb-14'
      >
        <h1 className='text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
          {hero.headline}
        </h1>
        <p className='mt-2 text-muted-foreground'>{hero.subtext}</p>
        <div className='mt-6 flex flex-col gap-2'>
          {metrics.map((m, i) => (
            <motion.div
              key={m.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.25 }}
              className='flex items-start gap-2 rounded-lg border border-border bg-card px-4 py-2.5'
            >
              <span aria-hidden className='shrink-0'>
                {m.icon}
              </span>
              <span className='text-sm text-muted-foreground'>{m.text}</span>
            </motion.div>
          ))}
        </div>
        <div className='mt-8 flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={() =>
              saasRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            className='rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90'
          >
            {ctas[0].label}
          </button>
          <button
            type='button'
            onClick={() =>
              productRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            className='rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted'
          >
            {ctas[1].label}
          </button>
        </div>
      </motion.section>

      {/* Screen 2 — SaaS Simulation */}
      <section ref={saasRef} className='mb-14 scroll-mt-8'>
        <h2 className='text-xl font-bold text-foreground'>{saas.title}</h2>
        <p className='mt-2 text-sm text-muted-foreground'>{saas.intro}</p>
        <ul className='mt-2 list-inside list-disc space-y-0.5 text-sm text-muted-foreground'>
          {saas.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className='mt-2 text-sm text-muted-foreground'>
          {saas.introClosing}
        </p>
        <p className='mt-4 whitespace-pre-line text-sm font-medium text-foreground'>
          {saas.supportingLine}
        </p>
        <div className='mt-4 grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2'>
          <div>
            <label className='block text-xs font-medium text-muted-foreground'>
              Tenant
            </label>
            <select
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              className='mt-1 w-full rounded border border-border bg-muted/50 px-3 py-2 text-sm text-foreground'
            >
              <option value='acme'>Acme</option>
              <option value='globex'>Globex</option>
            </select>
          </div>
          <div>
            <label className='block text-xs font-medium text-muted-foreground'>
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='mt-1 w-full rounded border border-border bg-muted/50 px-3 py-2 text-sm text-foreground'
            >
              <option value='admin'>Admin</option>
              <option value='member'>Member</option>
              <option value='viewer'>Viewer</option>
            </select>
          </div>
          <div>
            <label className='block text-xs font-medium text-muted-foreground'>
              Feature flag
            </label>
            <button
              type='button'
              onClick={() => setFeatureOn((o) => !o)}
              className='mt-1 rounded border border-border bg-muted/50 px-3 py-2 text-sm text-foreground transition hover:bg-muted'
            >
              {featureOn ? 'On' : 'Off'}
            </button>
          </div>
          <div>
            <label className='block text-xs font-medium text-muted-foreground'>
              Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className='mt-1 w-full rounded border border-border bg-muted/50 px-3 py-2 text-sm text-foreground'
            >
              <option value='free'>Free</option>
              <option value='pro'>Pro</option>
              <option value='enterprise'>Enterprise</option>
            </select>
          </div>
        </div>
      </section>

      {/* Screen 3 — Product Thinking */}
      <section ref={productRef} className='mb-14 scroll-mt-8'>
        <h2 className='text-xl font-bold text-foreground'>
          {productThinking.sectionTitle}
        </h2>
        <div className='mt-4 space-y-4'>
          {productThinking.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.25 }}
              className='rounded-lg border border-border bg-card p-4 text-left'
            >
              <button
                type='button'
                onClick={() =>
                  setExpanded(expanded === card.title ? null : card.title)
                }
                className='w-full text-left'
              >
                <h3 className='font-semibold text-foreground'>{card.title}</h3>
                <p className='mt-1 text-sm font-medium text-foreground'>
                  {card.headline}
                </p>
                <span className='mt-2 inline-block text-xs text-primary'>
                  {expanded === card.title ? 'Collapse ↑' : 'Expand ↓'}
                </span>
              </button>
              <AnimatePresence>
                {expanded === card.title && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='mt-3 overflow-hidden whitespace-pre-line border-t border-border pt-3 text-sm text-muted-foreground'
                  >
                    {card.body}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screen 4 — Tradeoff Philosophy */}
      <section className='mb-14'>
        <h2 className='text-xl font-bold text-foreground'>
          {tradeoffCopy.sectionTitle}
        </h2>
        <p className='mt-2 whitespace-pre-line text-sm text-muted-foreground'>
          {tradeoffCopy.intro}
        </p>
        <div className='mt-4 rounded-lg border border-border bg-card p-5'>
          <div className='flex items-center gap-3'>
            <span className='text-xs text-muted-foreground'>Speed</span>
            <input
              type='range'
              min={0}
              max={100}
              value={tradeoff}
              onChange={(e) => setTradeoff(Number(e.target.value))}
              className='flex-1 accent-primary'
              aria-label='Speed vs Maintainability'
            />
            <span className='text-xs text-muted-foreground'>
              Maintainability
            </span>
          </div>
          <p className='mt-4 text-sm text-muted-foreground'>{tradeoffText}</p>
        </div>
      </section>

      {/* AI Placeholder */}
      <section className='mb-14'>
        <h2 className='text-xl font-bold text-foreground'>Ask me</h2>
        <ul className='mt-3 space-y-1.5 text-sm text-muted-foreground'>
          {aiPlaceholder.askMe.map((q) => (
            <li key={q} className='flex gap-2'>
              <span className='text-primary'>•</span>
              {q}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
