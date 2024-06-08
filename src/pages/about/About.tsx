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
          bio="Intelligent and purposeful, Olga is our strategic thinker. She always thoroughly understands each issue before taking action, ensuring our solutions are well-informed and effective."
          git="https://github.com/lokispirit"
          photo={photoOlga}
        />
        <AboutCard
          authorName="Alexandr"
          title="Anonymous Coder"
          bio="Modest and persistent, Alexander is our dedicated learner. He prefers to gain knowledge through hands-on experience, bringing a practical approach to our projects."
          git="https://github.com/oxygeniumo2"
          photo={photoSasha}
        />
        <AboutCard
          authorName="Sergey"
          title="Not the most Important"
          bio="Confident and grounded, Sergey values everyone's input but stands firm on his convictions. His balanced approach ensures we stay true to our vision while considering all perspectives."
          git="https://github.com/marakoris2022"
          photo={photoSergey}
        />
      </div>
    </div>
  );
};
