import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { scrollToTarget } from '../../lib/scroll';
import { SectionHeading } from '../ui/SectionHeading';
import { runCommand } from './commands';
import './Terminal.css';

interface Line {
  id: number;
  text: string;
  kind: 'input' | 'output';
}

const WELCOME = ['DDM-OS terminal v26.10', "digite 'help' pra ver os comandos. (dica: tente 'sudo contratar')", ''];
const SUGGESTIONS = ['help', 'sobre', 'projetos', 'contato', 'sudo contratar'];

let nextId = 0;
const toLines = (texts: string[], kind: Line['kind']): Line[] => texts.map((text) => ({ id: nextId++, text, kind }));

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(() => toLines(WELCOME, 'output'));
  const [value, setValue] = useState('');
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function execute(command: string) {
    const result = runCommand(command);
    if (command.trim()) history.current.push(command);
    cursor.current = history.current.length;

    setLines((prev) => [
      ...(result.clear ? [] : prev),
      ...(result.clear ? [] : toLines([`> ${command}`], 'input')),
      ...toLines(result.output, 'output'),
    ]);

    if (result.open) window.open(result.open, '_blank', 'noopener,noreferrer');
    if (result.scrollTo) {
      const target = result.scrollTo;
      setTimeout(() => scrollToTarget(target === '#inicio' ? 0 : target), 400);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    execute(value);
    setValue('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const h = history.current;
    if (e.key === 'ArrowUp' && h.length) {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(h[cursor.current]);
    } else if (e.key === 'ArrowDown' && h.length) {
      e.preventDefault();
      cursor.current = Math.min(h.length, cursor.current + 1);
      setValue(h[cursor.current] ?? '');
    }
  }

  return (
    <section className="terminal-section" id="terminal" aria-labelledby="terminal-title">
      <div className="container terminal-section__inner">
        <SectionHeading
          id="terminal-title"
          eyebrow="modo avançado"
          title={
            <>
              Prefere linha de <em>comando</em>?
            </>
          }
          intro="Esse terminal funciona de verdade. Explore o portfólio do jeito raiz."
        />

        <div className="terminal" onClick={() => input.current?.focus({ preventScroll: true })}>
          <header className="win__bar">
            <span className="win__close" aria-hidden="true" />
            <span className="win__title mono">guilherme@devdomarketing: ~</span>
          </header>

          <div className="terminal__crt crt">
          <div className="terminal__screen" ref={screen} data-lenis-prevent>
            <div className="terminal__log pixel" role="log" aria-live="polite">
              {lines.map((line) => (
                <p key={line.id} data-kind={line.kind}>
                  {line.text || ' '}
                </p>
              ))}
            </div>

            <form className="terminal__form pixel" onSubmit={onSubmit}>
              <label htmlFor="terminal-input">~ $</label>
              <input
                ref={input}
                id="terminal-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-label="Digite um comando"
              />
            </form>
          </div>
          </div>

          <div className="terminal__chips">
            {SUGGESTIONS.map((cmd) => (
              <button type="button" key={cmd} className="mono" onClick={() => execute(cmd)}>
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
