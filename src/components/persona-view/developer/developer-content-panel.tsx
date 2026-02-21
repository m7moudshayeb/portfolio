import { motion } from 'framer-motion';
import type { CLICommand } from './developer-cli';
import projectsData from '@/my-resume/projects.json';
import skillsData from '@/my-resume/skills.json';

const skills = skillsData as Record<string, string[]>;

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-4'
    >
      <h2 className='font-mono text-lg font-semibold text-foreground'>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

export function DeveloperContentPanel({ command }: { command: CLICommand }) {
  if (!command || command === 'help') {
    return (
      <Panel title='Welcome'>
        <p className='text-sm text-muted-foreground'>
          Use the CLI on the left or the quick buttons. Try{' '}
          <kbd className='rounded border border-border bg-muted px-1 font-mono'>
            about
          </kbd>
          ,{' '}
          <kbd className='rounded border border-border bg-muted px-1 font-mono'>
            projects
          </kbd>
          ,{' '}
          <kbd className='rounded border border-border bg-muted px-1 font-mono'>
            stack
          </kbd>
          ,{' '}
          <kbd className='rounded border border-border bg-muted px-1 font-mono'>
            architecture
          </kbd>
          .
        </p>
      </Panel>
    );
  }

  if (command === 'about') {
    return (
      <Panel title='About (technical)'>
        <ul className='space-y-3 text-sm text-muted-foreground'>
          <li>
            <strong className='text-foreground'>Specialization:</strong> Complex
            React apps, TypeScript, performance, modern tooling.
          </li>
          <li>
            <strong className='text-foreground'>State:</strong> Prefer Zustand
            for app state; React Query for server; local state when it stays in
            one tree.
          </li>
          <li>
            <strong className='text-foreground'>Rendering:</strong> Measure
            first. Virtualize lists, memoize expensive subtrees, avoid
            unnecessary context splits.
          </li>
          <li>
            <strong className='text-foreground'>Things I avoid:</strong>{' '}
            Over-abstraction before the second use case; Redux for greenfield;
            ignoring bundle size.
          </li>
        </ul>
      </Panel>
    );
  }

  if (command === 'projects') {
    const projects = projectsData as Array<{
      id: number;
      title: string;
      description: string;
      details?: string[];
      links?: Array<{ label: string; url: string }>;
    }>;
    return (
      <Panel title='Projects (engineering lens)'>
        <ul className='space-y-6'>
          {projects.map((p) => (
            <li
              key={p.id}
              className='rounded-lg border border-border bg-card p-4'
            >
              <h3 className='font-semibold text-foreground'>{p.title}</h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                {p.description}
              </p>
              {p.details && p.details.length > 0 && (
                <ul className='mt-2 list-inside list-disc text-sm text-muted-foreground'>
                  {p.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {p.links?.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target='_blank'
                  rel='noreferrer'
                  className='mt-2 inline-block text-sm text-primary hover:underline'
                >
                  {l.label} →
                </a>
              ))}
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  if (command === 'stack') {
    return (
      <Panel title='Stack'>
        <div className='space-y-4'>
          {Object.entries(skills).map(([category, techs]) => (
            <div key={category}>
              <h4 className='text-xs font-medium uppercase text-muted-foreground'>
                {category}
              </h4>
              <div className='mt-1 flex flex-wrap gap-2'>
                {techs.map((t) => (
                  <span
                    key={t}
                    className='rounded border border-border bg-muted/50 px-2 py-0.5 font-mono text-sm'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (command === 'architecture') {
    return (
      <Panel title='Architecture'>
        <p className='text-sm text-muted-foreground'>
          Press{' '}
          <kbd className='rounded border border-border bg-muted px-1 font-mono'>
            A
          </kbd>{' '}
          to toggle the architecture overlay (folder structure, data flow).
        </p>
        <div className='mt-4 rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs'>
          <pre className='whitespace-pre text-muted-foreground'>
            {`src/
  app/          # Routes, shell
  components/   # UI + persona views
  store/        # Zustand
  my-resume/    # Content JSON
  constants/    # Personas, AI config`}
          </pre>
        </div>
      </Panel>
    );
  }

  return null;
}
