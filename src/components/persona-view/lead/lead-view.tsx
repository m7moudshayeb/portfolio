import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leadContent from '@/content/lead.json';

const { opening, caseStudy, stateTree, teamScaling, lessons, aiPlaceholder } =
  leadContent as {
    opening: {
      headline: string;
      subtext: string;
      intro: string;
      ctas: Array<{ label: string; scrollRef: string }>;
    };
    caseStudy: {
      title: string;
      problem: { intro: string; bullets: string[]; closing: string };
      approach: { intro: string; bullets: string[]; closing: string };
      result: { bullets: string[]; closing: string };
    };
    stateTree: {
      title: string;
      intro: string;
      order: string[];
      reasoning: Record<string, string>;
      closingLine: string;
    };
    teamScaling: {
      title: string;
      sections: Array<{ title: string; body: string }>;
    };
    lessons: { title: string; items: string[] };
    aiPlaceholder: { askMe: string[] };
  };

export function LeadView() {
  const [stateExpanded, setStateExpanded] = useState<string | null>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative min-h-screen'>
      <div
        className='pointer-events-none fixed inset-0 z-0 opacity-[0.04]'
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className='relative z-10 container mx-auto max-w-4xl px-4 py-12'>
        {/* Screen 1 — Opening */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='mb-14'
        >
          <h1 className='text-2xl font-bold text-foreground md:text-3xl'>
            {opening.headline}
          </h1>
          <p className='mt-2 text-muted-foreground'>{opening.subtext}</p>
          <p className='mt-4 whitespace-pre-line text-sm text-muted-foreground'>
            {opening.intro}
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={() =>
                caseRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className='rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted'
            >
              {opening.ctas[0].label}
            </button>
            <button
              type='button'
              onClick={() =>
                treeRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className='rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted'
            >
              {opening.ctas[1].label}
            </button>
          </div>
        </motion.section>

        {/* Screen 2 — Refactor Case Study */}
        <section ref={caseRef} className='mb-14 scroll-mt-8'>
          <h2 className='text-xl font-bold text-foreground'>
            {caseStudy.title}
          </h2>
          <div className='mt-6 space-y-6'>
            <div>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                The Problem
              </h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                {caseStudy.problem.intro}
              </p>
              <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
                {caseStudy.problem.bullets.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className='mt-2 text-sm text-muted-foreground'>
                {caseStudy.problem.closing}
              </p>
            </div>
            <div>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                The Approach
              </h3>
              <p className='mt-1 whitespace-pre-line text-sm text-muted-foreground'>
                {caseStudy.approach.intro}
              </p>
              <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
                {caseStudy.approach.bullets.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className='mt-2 text-sm font-medium text-foreground'>
                {caseStudy.approach.closing}
              </p>
            </div>
            <div>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                The Result
              </h3>
              <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
                {caseStudy.result.bullets.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p className='mt-2 text-sm font-medium text-foreground'>
                {caseStudy.result.closing}
              </p>
            </div>
          </div>
        </section>

        {/* Screen 3 — State Management Philosophy */}
        <section ref={treeRef} className='mb-14 scroll-mt-8'>
          <h2 className='text-xl font-bold text-foreground'>
            {stateTree.title}
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            {stateTree.intro}
          </p>
          <div className='mt-4 space-y-2'>
            {stateTree.order.map((opt) => (
              <div
                key={opt}
                className='rounded-lg border border-border bg-card'
              >
                <button
                  type='button'
                  onClick={() =>
                    setStateExpanded(stateExpanded === opt ? null : opt)
                  }
                  className='flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground'
                >
                  {opt}
                  <span className='text-muted-foreground'>
                    {stateExpanded === opt ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {stateExpanded === opt && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='overflow-hidden'
                    >
                      <p className='border-t border-border px-4 py-3 text-sm text-muted-foreground'>
                        {stateTree.reasoning[opt]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className='mt-4 whitespace-pre-line text-sm font-medium text-foreground'>
            {stateTree.closingLine}
          </p>
        </section>

        {/* Screen 4 — Team Scaling Philosophy */}
        <section className='mb-14'>
          <h2 className='text-xl font-bold text-foreground'>
            {teamScaling.title}
          </h2>
          <div className='mt-4 space-y-6'>
            {teamScaling.sections.map((s) => (
              <div key={s.title}>
                <h3 className='font-semibold text-foreground'>{s.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screen 5 — Lessons Learned */}
        <section className='mb-14'>
          <h2 className='text-xl font-bold text-foreground'>{lessons.title}</h2>
          <ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
            {lessons.items.map((l) => (
              <li key={l} className='flex gap-2'>
                <span className='text-primary'>•</span>
                {l}
              </li>
            ))}
          </ul>
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
    </div>
  );
}
