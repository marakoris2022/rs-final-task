import styles from './about.module.scss';
import { AboutCard } from '../../components/about-card/AboutCard';
import photoSasha from '/photo_alex.jpg';
import photoOlga from '/photo_olga.jpg';
import photoSergey from '/photo_sergey.jpg';

export const About = () => {
  return (
    <div>
      <div className={styles.aboutCardsWrapper}>
        <AboutCard
          authorName="Olga"
          title="Theoretical Master"
          bio="Some info about the author."
          git="https://github.com/lokispirit"
          photo={photoOlga}
        />
        <AboutCard
          authorName="Alexandr"
          title="Anonymous Coder"
          bio="Some info about the author."
          git="https://github.com/oxygeniumo2"
          photo={photoSasha}
        />
        <AboutCard
          authorName="Sergey"
          title="Not the most Important"
          bio="Some info about the author."
          git="https://github.com/marakoris2022"
          photo={photoSergey}
        />
      </div>
    </div>
  );
};
