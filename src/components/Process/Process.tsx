import { useRef } from 'react';
import { processSteps } from '../../content/process';
import { gsap, useGSAP } from '../../lib/gsap';
import './Process.css';

const SEGMENTS = 24;

export function Process() {
  const root = useRef<HTMLElement>(null);
  const percent = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>('.install__step');
      const segments = gsap.utils.toArray<HTMLElement>('.install__seg');

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.process__pin',
          pin: true,
          start: 'top top',
          end: '+=220%',
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            if (percent.current) percent.current.textContent = String(Math.round(p * 100)).padStart(3, ' ');
            const current = Math.min(steps.length - 1, Math.floor(p * steps.length));
            steps.forEach((step, i) => {
              step.dataset.state = p >= 0.995 || i < current ? 'done' : i === current ? 'active' : 'idle';
            });
            root.current?.toggleAttribute('data-complete', p >= 0.995);
          },
        },
      });

      tl.fromTo(segments, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 1 / SEGMENTS, duration: 0.001 }, 0).set(
        {},
        {},
        1,
      );
    },
    { scope: root },
  );

  return (
    <section className="process" id="processo" ref={root} aria-labelledby="processo-title">
      <div className="process__pin">
        <div className="container process__inner">
          <div className="process__copy">
            <p className="mono process__eyebrow">processo</p>
            <h2 id="processo-title" className="process__title">
              Instalando <br />
              seu projeto<span className="process__blink">_</span>
            </h2>
            <p className="process__intro">
              Sem caixa-preta: você acompanha cada etapa, do briefing ao deploy, com o que tá acontecendo e por quê.
            </p>
          </div>

          <div className="install" role="group" aria-label="Etapas do processo">
            <header className="win__bar">
              <span className="win__close" aria-hidden="true" />
              <span className="win__title mono">Instalador — seu-projeto.exe</span>
            </header>

            <div className="install__body">
              <ol className="install__steps">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="install__step" data-state={i === 0 ? 'active' : 'idle'}>
                    <span className="install__check mono" aria-hidden="true" />
                    <div>
                      <p className="install__file mono">{step.file}</p>
                      <h3>{step.title}</h3>
                      <p className="install__desc">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="install__footer">
                <div className="install__bar" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }, (_, i) => (
                    <span key={i} className="install__seg" />
                  ))}
                </div>
                <p className="install__status pixel">
                  <span className="install__status-text">Copiando arquivos…</span>
                  <span className="install__done-text">Instalação concluída!</span>
                  <span>
                    <span ref={percent}>{'  0'}</span>%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
