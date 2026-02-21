import { useState, useEffect, useCallback } from 'react';
import { personaConfig } from '@/constants/personas';
import { DeveloperTerminalIntro } from './developer-terminal-intro';
import { DeveloperCLI, type CLICommand } from './developer-cli';
import { DeveloperContentPanel } from './developer-content-panel';
import { DebugMeSection } from './debug-me-section';
import { ArchitectureOverlay } from './architecture-overlay';

export function DeveloperView() {
  const [booted, setBooted] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<CLICommand>('about');
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A') {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
          return;
        setOverlayOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const entry = personaConfig.developer.entry;

  const commands: Array<CLICommand> = [
    'about',
    'projects',
    'stack',
    'architecture',
  ];

  return (
    <>
      {!booted && <DeveloperTerminalIntro onComplete={handleBootComplete} />}
      <div className='container mx-auto max-w-6xl px-4 py-8'>
        {entry?.subline && (
          <p className='mb-4 font-mono text-sm text-muted-foreground'>
            {entry.subline}
          </p>
        )}
        <div className='grid gap-8 lg:grid-cols-[320px_1fr]'>
          <aside className='h-[320px] lg:h-[420px]'>
            <DeveloperCLI
              onCommand={setCurrentCommand}
              currentCommand={currentCommand}
            />
          </aside>
          <main className='min-h-[280px] overflow-auto rounded-lg border border-border bg-card'>
            {/* Visible nav hints — CLI is optional; users can browse without typing */}
            <nav
              className='flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 font-mono text-sm'
              aria-label='Browse sections'
            >
              <span className='mr-2 text-muted-foreground'>Or browse:</span>
              {commands.map((cmd) => (
                <button
                  key={cmd}
                  type='button'
                  onClick={() => setCurrentCommand(cmd)}
                  className={
                    currentCommand === cmd
                      ? 'rounded bg-primary px-2 py-1 text-primary-foreground'
                      : 'rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                >
                  {cmd}
                </button>
              ))}
              <button
                type='button'
                onClick={() => setOverlayOpen(true)}
                className='ml-auto rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground'
                title='Architecture overlay (or press A)'
              >
                Architecture (A)
              </button>
            </nav>
            <div className='p-6'>
              <DeveloperContentPanel command={currentCommand} />
            </div>
          </main>
        </div>
        <div className='mt-8'>
          <DebugMeSection />
        </div>
      </div>
      <ArchitectureOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </>
  );
}
