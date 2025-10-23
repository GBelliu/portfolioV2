import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: min(800px, 92vw);
  max-height: 85vh;
  overflow: auto;
  background: ${({ theme }) => theme.backgroundLight};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  h3 {
    color: ${({ theme }) => theme.primary};
    font-size: 1.4rem;
    margin: 0;
  }

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.textHighlight};
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.2s;
  }
  button:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Body = styled.section`
  padding: 1rem 1.25rem 1.5rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
  font-size: 1.05rem;

  h4 {
    color: ${({ theme }) => theme.secondary};
    margin: 1rem 0 0.5rem;
  }
  ul {
    padding-left: 1.25rem;
    display: grid;
    gap: 0.5rem;
  }
  p {
    color: #d3d3d3;
  }
  li {
    color: #d3d3d3;
  }
`;

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <Backdrop onClick={onClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <Header>
          <h3>{title}</h3>
          <button aria-label="Fechar" onClick={onClose}>✕</button>
        </Header>
        <Body>{children}</Body>
      </ModalCard>
    </Backdrop>,
    document.body
  );
}