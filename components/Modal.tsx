'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { CloseIcon } from './Icons';

/** Полноэкранное окно (используется для просмотра скриншотов). Закрывается по Esc и клику по фону. */
export default function Modal({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add('modal-open');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <button ref={closeRef} className="icon-btn modal__close" onClick={onClose} aria-label="Закрыть">
        <CloseIcon />
      </button>
      <div className="modal__body" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
