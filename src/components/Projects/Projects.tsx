import { useRef, useState } from 'react';
import { projects, type Project } from '../../content/projects';
import { gsap, useGSAP } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectDialog } from './ProjectDialog';
import { Lab } from './Lab';
import './Projects.css';

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: os projetos correm na horizontal enquanto a seção fica fixa
      mm.add('(min-width: 900px)', () => {
        const track = root.current!.querySelector<HTMLElement>('.projects__track')!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.projects__pin',
            pin: true,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>('.win').forEach((win) => {
          gsap.from(win, {
            rotate: 4,
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: win,
              containerAnimation: tween,
              start: 'left right',
              end: 'center center',
              scrub: true,
            },
          });
        });
      });

      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray<HTMLElement>('.win').forEach((win) => {
          gsap.from(win, {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: win, start: 'top 90%', once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="projects" id="projetos" ref={root} aria-labelledby="projetos-title">
      <div className="projects__pin">
        <div className="projects__track">
          <div className="projects__intro">
            <SectionHeading
              id="projetos-title"
              eyebrow="projetos"
              title={
                <>
                  Arquivos <em>recentes</em>
                </>
              }
              intro="Alguns sites e landing pages que coloquei no ar para marcas e agências. Clique numa janela pra abrir."
            />
            <p className="projects__hint mono" aria-hidden="true">
              arraste o scroll →
            </p>
          </div>

          {projects.map((project, i) => (
            <article className="win" key={project.slug}>
              <header className="win__bar">
                <span className="win__close" aria-hidden="true" />
                <span className="win__title mono">
                  {project.slug}.site — {String(i + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
                </span>
              </header>
              <button
                type="button"
                className="win__view"
                onClick={() => setSelected(project)}
                aria-label={`Ver detalhes de ${project.title}`}
              >
                <img src={project.image} alt="" loading="lazy" decoding="async" width={1400} height={1000} />
                <span className="win__open mono" aria-hidden="true">
                  abrir ↗
                </span>
              </button>
              <footer className="win__info">
                <h3>{project.title}</h3>
                <p className="mono">
                  {project.kind} · {project.year}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <Lab />

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
