import { useRef, useState } from 'react';
import { site } from '../../content/site';
import { gsap } from '../../lib/gsap';
import { scrollToTarget, setScrollLocked } from '../../lib/scroll';
import { PixelComputer } from '../ui/PixelComputer';
import './Footer.css';

export function Footer() {
  const [off, setOff] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  // easter egg: "desliga" o site com efeito de CRT e liga de novo no clique
  function powerOff() {
    setOff(true);
    setScrollLocked(true);
    requestAnimationFrame(() => {
      gsap.fromTo(
        '.power__line',
        { scaleX: 1, scaleY: 1 },
        { keyframes: [{ scaleY: 0.004, duration: 0.25 }, { scaleX: 0, duration: 0.2 }], ease: 'power3.in' },
      );
    });
  }

  function powerOn() {
    gsap.to(overlay.current, {
      autoAlpha: 0,
      duration: 0.4,
      onComplete: () => {
        setOff(false);
        setScrollLocked(false);
      },
    });
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">
          <PixelComputer size={18} /> {site.brand}
        </p>
        <p className="footer__made mono">
          © {new Date().getFullYear()} · feito à mão com React, Three.js, GSAP e café
        </p>
        <div className="footer__actions">
          <button type="button" className="mono" onClick={() => scrollToTarget(0)}>
            ↑ topo
          </button>
          <button type="button" className="mono" onClick={powerOff}>
            ⏻ desligar
          </button>
        </div>
      </div>

      {off && (
        <div className="power" ref={overlay}>
          <div className="power__line" />
          <button type="button" className="power__on pixel" onClick={powerOn} autoFocus>
            Brincadeira. Clique pra ligar de novo_
          </button>
        </div>
      )}
    </footer>
  );
}
