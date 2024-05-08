import { useEffect, useRef } from 'react';
import Button from '../button/Button';
import styles from './modal-error.module.scss';

interface ModalErrorProps {
  message: string;
  onClose: () => void;
}

export const ModalError = ({ message, onClose }: ModalErrorProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  let timerId: NodeJS.Timeout | null = null;

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
      <dialog className={styles.modal__error} ref={dialogRef}>
         <p>{message}</p>
         <Button style={styles.modal__error__btn} title='Close' onClick={handleClose} />
      </dialog>
  );
};