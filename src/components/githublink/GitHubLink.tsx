import styles from './gitHubLink.module.scss';
import gitHubLogoIcon from '/github_icon.svg';

type GitHubLinkT = {
  name: string;
  link: string;
  fontSize: string;
  iconWidth: string;
};

export const GitHubLink = ({ name, link, fontSize, iconWidth }: GitHubLinkT) => {
  return (
    <div className={styles.gitHubWrapper}>
      <a style={{ fontSize: `${fontSize}` }} className={styles.gitHubLink} target="blank" href={link}>
        {name}
        <img
          style={{ width: `${iconWidth}` }}
          className={styles.gitHubLinkIcon}
          src={gitHubLogoIcon}
          alt="gitHubLink"
        />
      </a>
    </div>
  );
};
