import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { sceneReady } from '../../lib/stage';
import { setScrollLocked } from '../../lib/scroll';
import './Loader.css';

const MESSAGES = [
  'Esquentando o tubo de imagem…',
  'Soprando o cartucho…',
  'Desembaraçando os cabos…',
  'Configurando o pixel…',
  'Compilando ideias…',
];

const BAR_SIZE = 20;
const MIN_TIME = 1400;
const MAX_TIME = 7000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setScrollLocked(true);

    const counter = { value: 0 };
    const fill = gsap.to(counter, {
      value: 92,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => setPercent(Math.round(counter.value)),
    });
    const rotate = setInterval(() => setMessage((m) => (m + 1) % MESSAGES.length), 650);

    let cancelled = false;
    const loaded = Promise.all([document.fonts.ready, sceneReady]);

    Promise.all([Promise.race([loaded, wait(MAX_TIME)]), wait(prefersReducedMotion() ? 0 : MIN_TIME)]).then(() => {
      if (cancelled) return;
      fill.kill();
      clearInterval(rotate);
      gsap.to(counter, {
        value: 100,
        duration: 0.35,
        onUpdate: () => setPercent(Math.round(counter.value)),
        onComplete: () => {
          // efeito de CRT desligando: a imagem colapsa numa linha e depois num ponto
          gsap
            .timeline({
              onComplete: () => {
                setScrollLocked(false);
                setDone(true);
                onDone();
              },
            })
            .to('.loader__screen', { scaleY: 0.006, duration: 0.28, ease: 'power3.in' })
            .to('.loader__screen', { scaleX: 0, duration: 0.22, ease: 'power3.in' })
            .to(root.current, { autoAlpha: 0, duration: 0.35 }, '-=0.05');
        },
      });
    });

    return () => {
      cancelled = true;
      fill.kill();
      clearInterval(rotate);
    };
  }, [onDone]);

  if (done) return null;

  const filled = Math.round((percent / 100) * BAR_SIZE);

  return (
    <div className="loader" ref={root} role="status" aria-live="polite">
      <div className="loader__screen crt">
        <p className="loader__brand pixel">
          dev do <span>marketing</span>
        </p>
        <p className="loader__msg pixel">{MESSAGES[message]}</p>
        <p className="loader__bar pixel" aria-label={`Carregando ${percent}%`}>
          [{'█'.repeat(filled)}
          <span>{'░'.repeat(BAR_SIZE - filled)}</span>] {String(percent).padStart(3, ' ')}%
        </p>
      </div>
    </div>
  );
}
