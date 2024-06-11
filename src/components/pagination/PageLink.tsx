import { HTMLProps } from 'react';
import cn from 'classnames';
import styles from './pageLink.module.scss';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({ className, active, disabled, children, ...otherProps }: Props) {
  const customClassName = cn(styles.pageLink, className, { [styles.active]: active, [styles.disabled]: disabled });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a className={customClassName} aria-current={active ? 'page' : undefined} {...otherProps}>
      {children}
    </a>
  );
}
