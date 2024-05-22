import { useEffect, useRef } from 'react';
import { Button } from '../button/Button';
import styles from './modalWindow.module.scss';

type ModalWindowProps = {
  message: string;
  onClose: () => void;
};

export const ModalWindow = ({ message, onClose }: ModalWindowProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  let timerId: NodeJS.Timeout | null = null;

  const handleBackDropClose = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (!dialogRef.current) {
      return;
    }
    const modalRect = dialogRef.current.getBoundingClientRect();

    if (
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom
    ) {
      dialogRef.current.close();
      timerId = setTimeout(() => {
        onClose();
      }, 400);
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    timerId = setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <dialog className={styles.modal__error} ref={dialogRef} onClick={handleBackDropClose}>
      <p>{message}</p>
      <Button style={styles.modal__error__btn} title="Close" type="button" onClick={handleClose} />
    </dialog>
  );
};
