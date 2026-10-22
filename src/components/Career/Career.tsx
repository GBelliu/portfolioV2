import { useRef } from 'react';
import { releases } from '../../content/career';
import { gsap, useGSAP } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import './Career.css';

export function Career() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // a linha do "git log" é desenhada conforme o scroll
      gsap.fromTo(
        '.changelog__line i',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.changelog', start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>('.release').forEach((release) => {
        gsap
          .timeline({ scrollTrigger: { trigger: release, start: 'top 72%', once: true } })
          .from(release.querySelector('.release__dot'), { scale: 0, duration: 0.5, ease: 'back.out(3)' })
          .from(
            release.querySelector('.release__head'),
            { autoAlpha: 0, x: -30, duration: 0.6, ease: 'power3.out' },
            0.05,
          )
          .from(
            release.querySelectorAll('.release__changes li, .release__stack'),
            { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
            0.2,
          );
      });
    },
    { scope: root },
  );

  return (
    <section className="career crt" id="trajetoria" ref={root} aria-labelledby="trajetoria-title">
      <div className="container">
        <p className="career__file pixel">$ cat CHANGELOG.md</p>
        <SectionHeading
          id="trajetoria-title"
          eyebrow="trajetória"
          title={
            <>
              Notas de <em>versão</em>
            </>
          }
          intro="Cada emprego foi um release. Começou no marketing, passou por agência e virou produto."
        />

        <div className="changelog">
          <span className="changelog__line" aria-hidden="true">
            <i />
          </span>
          <ol className="changelog__list">
            {releases.map((release) => (
              <li className="release" key={release.version} data-latest={release.tag === 'latest'}>
                <span className="release__dot" aria-hidden="true" />
                <div className="release__head">
                  <p className="release__version pixel">
                    {release.version}
                    {release.tag && <span className="release__tag mono">{release.tag}</span>}
                  </p>
                  <p className="release__period mono">{release.period}</p>
                </div>
                <div className="release__body">
                  <h3 className="release__role">
                    {release.role} <span>@ {release.company}</span>
                  </h3>
                  <ul className="release__changes">
                    {release.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                  {release.stack.length > 0 && <p className="release__stack mono">{release.stack.join(' · ')}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
