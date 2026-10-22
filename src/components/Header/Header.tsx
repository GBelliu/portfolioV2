import { useEffect, useState } from 'react';
import { nav, site } from '../../content/site';
import { handleAnchor } from '../../lib/scroll';
import { PixelComputer } from '../ui/PixelComputer';
import './Header.css';

const timeFormat = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return timeFormat.format(now);
}

export function Header() {
  const time = useClock();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="menubar">
      <a href="#inicio" className="menubar__logo" onClick={handleAnchor} aria-label={`${site.brand}, voltar ao início`}>
        <PixelComputer />
        <span>{site.brand}</span>
      </a>

      <nav className="menubar__nav" aria-label="Principal">
        <button
          type="button"
          className="menubar__toggle mono"
          aria-expanded={open}
          aria-controls="menu-list"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <ul id="menu-list" className="menubar__list" data-open={open}>
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="mono"
                onClick={(e) => {
                  setOpen(false);
                  handleAnchor(e);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="menubar__status mono" aria-hidden="true">
        <i className="dot" />
        <span>online</span>
        <time>{time}</time>
      </div>
    </header>
  );
}
