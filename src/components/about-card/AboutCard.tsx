import styles from './aboutCard.module.scss';

type AboutCProps = { authorName: string; title: string; bio: string; git: string; photo: string };

export const AboutCard = ({ authorName, title, bio, git, photo }: AboutCProps) => {
  return (
    <div className={styles.aboutCardWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={photo} alt="" />
      </div>
      <div>
        <div>
          <span>{authorName}</span>
          <span>{title}</span>
        </div>
        <div>
          <p>{bio}</p>
        </div>
        <div>
          <a href={git} target="blank">
            GitHub
          </a>
        </div>
      </div>
      x
    </div>
  );
};
