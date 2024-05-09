import './button.scss';

interface Button {
  style: string;
  title: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ style, title, disabled, type, onClick }: Button) {
  return (
    <>
      <button className={`default__btn ${style}`} type={type} disabled={disabled} onClick={onClick ? () => onClick() : () => {}}>
        {title}
      </button>
    </>
  );
}
