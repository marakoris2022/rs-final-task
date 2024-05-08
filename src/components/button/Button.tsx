import './button.scss';

interface Button {
  style: string;
  title: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  onClick?: () => void;
}

export default function Button({ style, title, type, onClick }: Button) {
  return (
    <>
      <button className={`default__btn ${style}`} type={type} onClick={onClick ? () => onClick() : () => {}}>
        {title}
      </button>
    </>
  );
}
