import styles from './button.module.scss';

type Button = {
  style: string;
  title: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button = ({ style, title, disabled, type, onClick }: Button) => {
  return (
    <button
      className={`${styles.defaultBtn} ${style}`}
      type={type}
      disabled={disabled}
      onClick={onClick ? (e) => onClick(e) : () => {}}
    >
      {title}
    </button>
  );
};
