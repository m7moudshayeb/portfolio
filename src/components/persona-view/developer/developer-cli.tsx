import { useState, useRef, useEffect } from 'react';

export type CLICommand =
  | 'about'
  | 'projects'
  | 'stack'
  | 'architecture'
  | 'help'
  | null;

const COMMANDS: CLICommand[] = ['about', 'projects', 'stack', 'architecture'];

interface DeveloperCLIProps {
  onCommand: (cmd: CLICommand) => void;
  currentCommand: CLICommand;
}

export function DeveloperCLI({ onCommand, currentCommand }: DeveloperCLIProps) {
  const [input, setInput] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>([
    'Type a command: about, projects, stack, architecture. Or click the buttons above.',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    const newLines = [...outputLines, `$ ${trimmed}`];
    if (['about', 'projects', 'stack', 'architecture'].includes(trimmed)) {
      onCommand(trimmed as CLICommand);
      newLines.push(`Opening ${trimmed}...`);
    } else if (trimmed === 'help') {
      onCommand('help');
      newLines.push('Commands: about, projects, stack, architecture');
    } else {
      newLines.push(
        `Unknown command: ${trimmed}. Try: about, projects, stack, architecture`,
      );
    }
    setOutputLines(newLines);
    setInput('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentCommand]);

  return (
    <div className='flex h-full flex-col rounded-lg border border-border bg-[#0d1117] font-mono text-sm'>
      <div className='flex flex-wrap gap-2 border-b border-border p-2'>
        {COMMANDS.map((c) => (
          <button
            key={c}
            type='button'
            onClick={() => run(c!)}
            className='rounded bg-muted/80 px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            {c}
          </button>
        ))}
      </div>
      <div className='flex-1 overflow-auto p-3 text-green-400/90'>
        {outputLines.map((line, i) => (
          <div key={i} className='whitespace-pre-wrap break-words'>
            {line}
          </div>
        ))}
      </div>
      <div className='flex items-center gap-2 border-t border-border p-2'>
        <span className='text-green-500'>$</span>
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              run(input);
            }
          }}
          className='flex-1 bg-transparent text-foreground outline-none'
          placeholder='Type a command...'
          aria-label='CLI input'
        />
      </div>
    </div>
  );
}
