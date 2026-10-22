import { useEffect, useRef } from 'react';
import type { Project } from '../../content/projects';
import { setScrollLocked } from '../../lib/scroll';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el || !project) return;

    el.showModal();
    setScrollLocked(true);
    return () => {
      el.close();
      setScrollLocked(false);
    };
  }, [project]);

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {project && (
        <div className="project-dialog__window">
          <header className="win__bar">
            <button type="button" className="win__close" onClick={onClose} aria-label="Fechar" />
            <span className="win__title mono">{project.slug}.site</span>
          </header>

          <img src={project.image} alt={`Página inicial do site ${project.title}`} width={1400} height={1000} />

          <div className="project-dialog__body">
            <p className="mono project-dialog__meta">
              {project.kind} · {project.year}
              {project.partner && ` · com ${project.partner}`}
            </p>
            <h3 id="project-dialog-title">{project.title}</h3>
            <p>{project.summary}</p>
            <ul className="project-dialog__stack">
              {project.stack.map((tech) => (
                <li key={tech} className="mono">
                  {tech}
                </li>
              ))}
            </ul>
            <a className="button" href={project.url} target="_blank" rel="noopener noreferrer">
              Visitar o site <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
