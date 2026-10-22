import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { stage } from '../../lib/stage';
import { site, yearsCoding } from '../../content/site';
import './Stage.css';

const Scene = lazy(() => import('../Computer/Scene'));

const panels = [
  {
    eyebrow: '01 / quem tá digitando',
    title: 'Oi, eu sou o Guilherme.',
    text: [
      `Comecei em ${site.since} como dev e assistente de marketing ao mesmo tempo: landing pages de um lado, Google Ads e Analytics do outro. Daí o apelido. São ${yearsCoding}+ anos entre agência, sites e produto.`,
      'Eu traduzo briefing em código. E código em resultado.',
    ],
  },
  {
    eyebrow: '02 / o jeito',
    title: 'Bonito é bom. Bonito que converte é melhor.',
    text: [
      'Cada pixel com um objetivo: carregar rápido, ser encontrado no Google e transformar visita em cliente. Tudo medido, nada no achismo.',
    ],
    chips: ['performance', 'SEO', 'tracking', 'UX'],
  },
  {
    eyebrow: '03 / build ok',
    title: 'Pronto. Agora entra aqui comigo.',
    text: ['Vou te mostrar o que roda dentro dessa máquina.'],
  },
];

export function Stage({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);

  // só renderiza a cena 3D enquanto a seção está visível
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      stage.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // linha do tempo controlada pelo scroll
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          pin: '.stage__pin',
          start: 'top top',
          end: '+=500%',
          scrub: true,
          onUpdate: (self) => {
            stage.progress = self.progress;
          },
        },
      });

      tl.to('.hero__line--a', { xPercent: -18, yPercent: -60, autoAlpha: 0, duration: 0.12 }, 0.03)
        .to('.hero__line--b', { xPercent: 18, yPercent: -60, autoAlpha: 0, duration: 0.12 }, 0.03)
        // o scroll anima os contêineres; a entrada anima os filhos, para não disputarem os mesmos valores
        .to(['.hero__meta', '.hero__bottom'], { autoAlpha: 0, y: -20, duration: 0.05 }, 0.01);

      const windows: [number, number][] = [
        [0.15, 0.37],
        [0.4, 0.61],
        [0.64, 0.8],
      ];
      gsap.utils.toArray<HTMLElement>('.panel').forEach((panel, i) => {
        const [enter, exit] = windows[i];
        const parts = panel.querySelectorAll('.panel__part');
        tl.fromTo(parts, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, stagger: 0.012, duration: 0.05 }, enter);
        tl.to(parts, { autoAlpha: 0, y: -50, stagger: 0.008, duration: 0.04 }, exit);
      });

      tl.fromTo('.stage__veil', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.12)
        .to('.stage__veil', { autoAlpha: 0, duration: 0.04 }, 0.8);

      tl.fromTo('.stage__bar i', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .to('.stage__bar', { autoAlpha: 0, duration: 0.04 }, 0.82)
        .fromTo('.stage__flash', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0.93)
        .set({}, {}, 1);
    },
    { scope: root },
  );

  // entrada após o loader
  useGSAP(
    () => {
      if (!ready) return;

      if (prefersReducedMotion()) {
        stage.intro = 1;
        stage.bootAt = performance.now();
        return;
      }

      const split = SplitText.create('.hero__line', { type: 'chars', mask: 'chars' });
      const tl = gsap.timeline();
      tl.from(split.chars, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.035 })
        .to(stage, { intro: 1, duration: 2.2, ease: 'expo.out' }, 0.15)
        .call(() => {
          stage.bootAt = performance.now();
        }, [], 0.9)
        .from(['.hero__meta > span', '.hero__lead', '.hero__hint'], { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, 0.5);

      return () => split.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="stage" ref={root} id="inicio" aria-label="Apresentação">
      <div className="stage__pin">
        <div className="hero">
          <div className="hero__meta mono">
            <span>Portfólio © {new Date().getFullYear()}</span>
            <span>
              <i className="dot" aria-hidden="true" /> Aceitando novos projetos
            </span>
          </div>

          <h1 className="hero__title">
            <span className="hero__line hero__line--a">dev do</span>
            <span className="hero__line hero__line--b">marketing</span>
          </h1>

          <div className="hero__bottom">
            <p className="hero__lead">
              Sites, landing pages e e-commerces feitos por quem fala a língua do briefing <em>e</em> a do código.
            </p>
            <p className="hero__hint mono" aria-hidden="true">
              role para ligar <span>↓</span>
            </p>
          </div>
        </div>

        <div className="stage__canvas">
          <Suspense fallback={null}>
            <Scene active={active} />
          </Suspense>
        </div>

        <div className="stage__panels">
          <div className="stage__veil" aria-hidden="true" />
          {panels.map((panel) => (
            <article className="panel" key={panel.eyebrow}>
              <p className="panel__part panel__eyebrow mono">{panel.eyebrow}</p>
              <h2 className="panel__part panel__title">{panel.title}</h2>
              {panel.text.map((t) => (
                <p className="panel__part panel__text" key={t}>
                  {t}
                </p>
              ))}
              {panel.chips && (
                <ul className="panel__part panel__chips">
                  {panel.chips.map((chip) => (
                    <li key={chip} className="mono">
                      {chip}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="stage__bar" aria-hidden="true">
          <i />
        </div>
        <div className="stage__flash" aria-hidden="true" />
      </div>
    </section>
  );
}
