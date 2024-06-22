import styles from './rsSchoolLogo.module.scss';
import rsSchoolLogo from '/logo-rsschool3.png';

export const RsSchoolLogo = ({ width }: { width: string }) => {
  return (
    <a style={{ width: `${width}px` }} className={styles.rsSchoolLink} target="blank" href="https://app.rs.school/">
      <img style={{ width: '100%' }} src={rsSchoolLogo} alt="rsSchoolLogo" />
    </a>
  );
};
