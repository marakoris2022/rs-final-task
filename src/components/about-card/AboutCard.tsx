import styles from './aboutCard.module.scss';
import githubIcon from '/github_icon.svg';

type AboutCProps = { authorName: string; title: string; bio: string; git: string; photo: string };

export const AboutCard = ({ authorName, title, bio, git, photo }: AboutCProps) => {
  return (
    <div className={styles.aboutCardWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={photo} alt="" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.titleName}>{authorName}</span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.bioWrapper}>
          <p className={styles.bioText}>{bio}</p>
        </div>
        <div className={styles.githubWrapper}>
          <a className={styles.githubLink} href={git} target="blank">
            GitHub
          </a>
          <img className={styles.githubImg} src={githubIcon} alt="GitHub" />
        </div>
      </div>
    </div>
  );
};
