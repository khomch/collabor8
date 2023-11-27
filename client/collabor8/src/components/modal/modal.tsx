'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import IconClose from '../../../public/icon-close.svg';
import './modal.css';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (children) {
      modalRef.current?.close();
      modalRef.current && modalRef.current?.showModal();
    } else {
      closeModal();
    }
  }, [children]);

  const closeModal = () => {
    modalRef.current?.close();
    onClose && onClose();
  };

  const handleOverlayClick: React.MouseEventHandler<HTMLDialogElement> = (
    e
  ) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const modal: React.ReactNode = children && (
    <dialog ref={modalRef} className="modal" onClick={handleOverlayClick}>
      <div className="modal__content">
        <Image
          src={IconClose}
          alt="Icon to close modal"
          className="modal__close-icon"
          onClick={closeModal}
        />
        {children}
      </div>
    </dialog>
  );
  return modal;
}
