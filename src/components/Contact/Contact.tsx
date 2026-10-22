import { useRef } from 'react';
import { socials, whatsapp } from '../../content/site';
import { gsap, SplitText, useGSAP } from '../../lib/gsap';
import { Marquee } from '../ui/Marquee';
import './Contact.css';

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create('.contact__title', { type: 'words,chars', mask: 'chars' });
      gsap.from(split.chars, {
        yPercent: 110,
        rotate: 8,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.015,
        scrollTrigger: { trigger: '.contact__title', start: 'top 85%', once: true },
      });

      gsap.from('.contact__link', {
        autoAlpha: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__links', start: 'top 90%', once: true },
      });

      // botão "magnético" que segue o ponteiro
      const button = cta.current;
      if (!button || !window.matchMedia('(hover: hover)').matches) return () => split.revert();

      const xTo = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const onMove = (e: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.35);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.35);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      button.addEventListener('pointermove', onMove);
      button.addEventListener('pointerleave', onLeave);

      return () => {
        split.revert();
        button.removeEventListener('pointermove', onMove);
        button.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope: root },
  );

  return (
    <section className="contact" id="contato" ref={root} aria-labelledby="contato-title">
      <Marquee className="contact__marquee" items={['vamos conversar', 'orçamento sem compromisso', 'resposta rápida']} />

      <div className="container contact__inner">
        <svg className="contact__badge" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="99" />
          <text>
            <textPath href="#badge-circle">aceitando projetos ✦ aceitando projetos ✦ </textPath>
          </text>
          <path className="contact__badge-icon" d="M78 78h44v32H78zM72 116h56v8H72z" />
          <path className="contact__badge-screen" d="M84 84h32v20H84z" />
        </svg>

        <p className="mono contact__eyebrow">contato</p>
        <h2 className="contact__title" id="contato-title">
          Bora fazer sua marca vender mais?
        </h2>

        <div className="contact__actions">
          <a ref={cta} className="contact__cta" href={whatsapp.href} target="_blank" rel="noopener noreferrer">
            <span>Chamar no WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="contact__note">
            Me conta da sua ideia, campanha ou site. Eu respondo rapidinho com os próximos passos.
          </p>
        </div>

        <ul className="contact__links">
          {socials.map((social) => (
            <li key={social.label}>
              <a className="contact__link" href={social.href} target="_blank" rel="noopener noreferrer">
                <span className="contact__label">{social.label}</span>
                <span className="contact__handle mono">{social.handle}</span>
                <span className="contact__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
