import { GitHubLink } from '../githublink/GitHubLink';
import { RsSchoolLogo } from '../rsschoollogo/RsSchoolLogo';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerContentWrapper}>
        <div>
          <RsSchoolLogo width="100" />
        </div>
        <div className={styles.githubLinkWrapper}>
          <GitHubLink fontSize="18px" iconWidth="18px" name="Alexandr" link="https://github.com/oxygeniumo2" />

          <GitHubLink fontSize="18px" iconWidth="18px" name="Olga" link="https://github.com/lokispirit" />
          <GitHubLink fontSize="18px" iconWidth="18px" name="Sergey" link="https://github.com/marakoris2022" />
        </div>
        <p style={{ fontSize: '28px' }}>2024y.</p>
      </section>
    </footer>
  );
};
