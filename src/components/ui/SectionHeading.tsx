import { useRef, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '../../lib/gsap';
import './SectionHeading.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

/** Título de seção com revelação por linha ao entrar na tela. */
export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create('.heading__title', { type: 'lines', mask: 'lines', autoSplit: true });
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 82%', once: true } })
        .from('.heading__eyebrow', { autoAlpha: 0, x: -20, duration: 0.6, ease: 'power3.out' })
        .from(split.lines, { yPercent: 105, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.1)
        .from('.heading__intro', { autoAlpha: 0, y: 20, duration: 0.8, ease: 'power3.out' }, 0.35);

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <div className="heading" ref={root}>
      <p className="heading__eyebrow mono">{eyebrow}</p>
      <h2 className="heading__title" id={id}>
        {title}
      </h2>
      {intro && <p className="heading__intro">{intro}</p>}
    </div>
  );
}
