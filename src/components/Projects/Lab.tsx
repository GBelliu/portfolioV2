import { useRef } from 'react';
import { lab } from '../../content/projects';
import { gsap, useGSAP } from '../../lib/gsap';

export function Lab() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.lab__row', {
        autoAlpha: 0,
        x: -30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <div className="lab container" ref={root}>
      <div className="lab__head">
        <h3 className="lab__title">
          <span className="mono">~/</span>lab
        </h3>
        <p>Estudos e projetos pessoais, onde eu testo tecnologia nova antes de levar pra cliente.</p>
      </div>
      <ul className="lab__list">
        {lab.map((item) => (
          <li key={item.slug}>
            <a className="lab__row" href={item.url} target="_blank" rel="noopener noreferrer">
              <span className="lab__perm mono" aria-hidden="true">
                drwxr-xr-x
              </span>
              <span className="lab__name">{item.title}</span>
              <span className="lab__desc">{item.summary}</span>
              <span className="lab__stack mono">{item.stack.join(' · ')}</span>
              <span className="lab__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
