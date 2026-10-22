import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { stackRows, type StackKey } from '../../content/stack';
import { gsap, useGSAP } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import './Stack.css';

const allKeys = stackRows.flat();
const IDLE = 'passe o mouse ou digite uma letra_';

export function Stack() {
  const root = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const cycle = useRef<Record<string, number>>({});
  const [current, setCurrent] = useState<StackKey | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from('.key', {
        y: -60,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'bounce.out',
        stagger: { each: 0.025, from: 'random' },
        scrollTrigger: { trigger: '.keyboard', start: 'top 80%', once: true },
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // digitar uma letra "aperta" a próxima tecla que começa com ela
  useEffect(() => {
    let release: ReturnType<typeof setTimeout>;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!inView.current || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const letter = e.key.toLowerCase();
      if (!/^[a-z]$/.test(letter)) return;
      const matches = allKeys.filter((k) => k.name.toLowerCase().startsWith(letter));
      if (!matches.length) return;

      const index = (cycle.current[letter] ?? -1) + 1;
      cycle.current[letter] = index;
      const key = matches[index % matches.length];

      setCurrent(key);
      setPressed(key.name);
      clearTimeout(release);
      release = setTimeout(() => setPressed(null), 160);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(release);
    };
  }, []);

  return (
    <section className="stack" id="stack" ref={root} aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          id="stack-title"
          eyebrow="stack"
          title={
            <>
              Ferramentas na <em>mesa</em>
            </>
          }
          intro="O que eu uso pra tirar uma ideia do Figma e colocar no ar, medindo tudo pelo caminho."
        />

        <div className="lcd crt" aria-live="polite">
          <p className="pixel">
            {current ? (
              <>
                <span className="lcd__name">&gt; {current.name}:</span> {current.info}
              </>
            ) : (
              <span className="lcd__idle">&gt; {IDLE}</span>
            )}
          </p>
        </div>

        <div className="keyboard">
          <div className="keyboard__leds" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {stackRows.map((row, r) => (
            <div className="keyboard__row" key={r}>
              {row.map((key) => (
                <button
                  type="button"
                  key={key.name}
                  className="key"
                  data-accent={key.accent ?? false}
                  data-pressed={pressed === key.name}
                  style={{ '--size': key.size ?? 1 } as CSSProperties}
                  onPointerEnter={() => setCurrent(key)}
                  onFocus={() => setCurrent(key)}
                  onClick={() => setCurrent(key)}
                >
                  <span className="key__cap">{key.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
