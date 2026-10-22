import { useRef, type CSSProperties } from 'react';
import { services } from '../../content/services';
import { gsap, SplitText, useGSAP } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import './Services.css';

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // linha de comando sendo digitada
      const prompt = SplitText.create('.services__prompt', { type: 'chars' });
      gsap.from(prompt.chars, {
        autoAlpha: 0,
        duration: 0.01,
        stagger: 0.035,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });

      // disquetes "ejetam" para dentro da tela em sequência
      gsap.utils.toArray<HTMLElement>('.floppy').forEach((disk, i) => {
        gsap.from(disk, {
          y: 140,
          rotate: i % 2 ? 9 : -9,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: disk, start: 'top 92%', once: true },
        });
      });

      return () => prompt.revert();
    },
    { scope: root },
  );

  return (
    <section className="services crt" id="servicos" ref={root} aria-labelledby="servicos-title">
      <div className="container">
        <p className="services__prompt pixel">C:\DEV_DO_MARKETING&gt; dir /servicos</p>
        <SectionHeading
          id="servicos-title"
          eyebrow="serviços"
          title={
            <>
              O que roda nessa <em>máquina</em>
            </>
          }
          intro="Cada disquete é um jeito de colocar sua marca pra performar na internet. Pode combinar à vontade."
        />

        <ul className="services__grid">
          {services.map((service, i) => (
            <li key={service.title} className="floppy" style={{ '--disk': service.color } as CSSProperties}>
              <div className="floppy__body">
                <div className="floppy__shutter" aria-hidden="true">
                  <span />
                </div>
                <span className="floppy__index mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="floppy__label">
                  <p className="floppy__file pixel">{service.label}</p>
                  <h3 className="floppy__title">{service.title}</h3>
                  <p className="floppy__text">{service.description}</p>
                  <ul className="floppy__tags">
                    {service.tags.map((tag) => (
                      <li key={tag} className="mono">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
