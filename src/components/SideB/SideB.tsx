import { useEffect, useRef, useState, type RefObject } from 'react';
import { youtube } from '../../content/site';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import './SideB.css';

const TAPES = ['vida real', 'corrida', 'opiniões', 'registros'];

/** Chuvisco de TV fora do ar, animado só enquanto está visível. */
function useStatic(canvas: RefObject<HTMLCanvasElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx || !enabled) return;

    const image = ctx.createImageData(el.width, el.height);
    const pixels = new Uint32Array(image.data.buffer);
    let frame = 0;
    let visible = false;

    const draw = () => {
      for (let i = 0; i < pixels.length; i++) {
        const v = (Math.random() * 255) | 0;
        pixels[i] = (255 << 24) | (v << 16) | (v << 8) | v;
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    draw();
    if (prefersReducedMotion()) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      if (visible) loop();
      else cancelAnimationFrame(frame);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [canvas, enabled]);
}

export function SideB() {
  const root = useRef<HTMLElement>(null);
  const noise = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  useStatic(noise, !on);

  useGSAP(
    () => {
      gsap.from('.tv', {
        y: 80,
        rotate: -4,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.tv', start: 'top 85%', once: true },
      });
      gsap.from('.tape', {
        x: 120,
        rotate: 12,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.tapes', start: 'top 90%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section className="sideb" id="lado-b" ref={root} aria-labelledby="lado-b-title">
      <div className="container sideb__inner">
        <div className="sideb__copy">
          <SectionHeading
            id="lado-b-title"
            eyebrow="lado B"
            title={
              <>
                Quando fecho o editor, <em>ligo a câmera</em>.
              </>
            }
            intro="No meu canal eu falo de vida, corrida, IA, momentos importantes e coisas aleatórias. Sem roteiro de LinkedIn."
          />

          <ul className="tapes" aria-label="Assuntos do canal">
            {TAPES.map((tape, i) => (
              <li key={tape} className="tape" style={{ rotate: `${i % 2 ? 0.8 : -0.8}deg`, marginLeft: `${(i % 2) * 0.9}rem` }}>
                <span className="tape__label pixel">{tape}</span>
                <span className="tape__reels" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </li>
            ))}
          </ul>

          <a className="button" href={youtube.url} target="_blank" rel="noopener noreferrer">
            Ver o canal {youtube.handle} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="tv">
          <span className="tv__antenna" aria-hidden="true" />
          <div className="tv__body">
            <div className="tv__screen crt">
              {on ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${youtube.uploads}&autoplay=1&rel=0`}
                  title={`Vídeos do canal ${youtube.name} no YouTube`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="tv__power" onClick={() => setOn(true)}>
                  <canvas ref={noise} width={160} height={120} aria-hidden="true" />
                  <span className="tv__channel pixel" aria-hidden="true">
                    CH 03
                  </span>
                  <span className="tv__cta pixel">▶ ligar a TV</span>
                  <span className="sr-only">Carregar os vídeos do canal no YouTube</span>
                </button>
              )}
            </div>
            <div className="tv__panel" aria-hidden="true">
              <span className="tv__brand pixel">bel</span>
              <span className="tv__knob" />
              <span className="tv__knob" />
              <span className="tv__grill" />
              <span className="tv__led" data-on={on} />
            </div>
          </div>
          <span className="tv__feet" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
