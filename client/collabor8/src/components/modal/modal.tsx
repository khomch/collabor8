'use client';
import React, { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import IconClose from "../../../public/icon-close.svg";
import "./modal.css";

type Props = {
  onClose?: () => void;
  children?: ReactNode;
};

function Modal({ onClose, children }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
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

  const modal: JSX.Element | null = children ? (
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
  ) : null;

  return modal;
}

export default Modal;
