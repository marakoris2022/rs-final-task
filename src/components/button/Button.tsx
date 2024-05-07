import './button.scss';

interface Button {
  style: string;
  title: string;
  onClick?: () => void;
}

export default function Button({ style, title, onClick }: Button) {
  return (
    <>
      <button className={style} onClick={onClick ? () => onClick() : () => {}}>
        {title}
      </button>
    </>
  );
}
