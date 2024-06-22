import styles from './about.module.scss';
import { AboutCard } from '../../components/about-card/AboutCard';
import photoSasha from '/photo_alex.jpg';
import photoOlga from '/photo_olga.jpg';
import photoSergey from '/photo_sergey.jpg';
import reactLogo from '/react-img.svg';
import zustandLogo from '/zustand.png';
import commercetoolsLogo from '/commercetools-logo-2024.svg';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import { RsSchoolLogo } from '../../components/rsschoollogo/RsSchoolLogo';

export const About = () => {
  return (
    <div className={styles.aboutPageWrapper}>
      <Breadcrumbs currantPage="About Us" />
      <h2 className={styles.aboutPageTitle}>Meet Our Team</h2>
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

      <h2 className={styles.aboutPageTitle}>Our Journey Through the Project</h2>

      <div className={styles.projectTextWrapper}>
        <p className={styles.projectText}>
          At the beginning of this project, we had only two participants. Thankfully, a few days later, our team
          expanded to three. However, one member soon left, bringing us back to two. To avoid filling the team with a
          random participant, we urgently searched for a third person. Fortunately, we met Olga. After a brief
          conversation, it became clear that Olga's team was also in question, and we were eager for her to join us.
          Thankfully, Olga agreed, completing our team.
        </p>
        <p className={styles.projectText}>
          Initially, the main challenge was our mentor's recommendation to use the React JS library, a tool none of us
          had experience with, putting us in a vulnerable position. The first sprint was straightforward, focusing on
          assembling a starter build, creating catalogs, installing necessary libraries, and writing the README. Despite
          the newness of React JS, this task took just a few days, leaving us with ample time before the second sprint.
        </p>
        <img className={styles.reactLogo} src={reactLogo} alt="ReactLogo" />
        <p className={styles.projectText}>
          We used this time wisely, dedicating ourselves to learning React JS from scratch. Besides React JS, we also
          had to familiarize ourselves with Axios and Zustand. By the second sprint, we had grasped the basic concepts
          of React JS, gained some confidence, and were ready to start.
        </p>
        <p className={styles.projectText}>
          According to our plan, we distributed responsibilities and began teamwork. Alexander had already started the
          second sprint as a React JS training session and did an excellent job, quickly completing the Login page. The
          main challenge was implementing the new Formik form library. With basic components and Alexander's Formik
          experience, Sergey tackled the Registration page, which had more input fields but was completed swiftly due to
          our familiarity with Formik.
        </p>
        <img className={styles.zustandImg} src={zustandLogo} alt="ZustandLogo" />
        <p className={styles.projectText}>
          Meanwhile, Olga focused on our backend platform, ‘commercetools.’ Despite its vast size and initial
          complexity, Olga successfully prepared our application to work with their API, allowing us to close the sprint
          with maximum scores.
        </p>
        <p className={styles.projectText}>
          For the third sprint, we fully embraced teamwork, clearly dividing responsibilities: Olga handled the catalog
          page, Sergey worked on the product page, and Alexander managed the client's personal profile. We worked on
          different branches of GitHub, developing our site in parallel with minimal overlap. This sprint was completed
          smoothly within a week. After resolving a few merge conflicts, we merged our site into a cohesive whole,
          enjoying the collaborative effort.
        </p>
        <img className={styles.textImages} src={commercetoolsLogo} alt="CommercetoolsLogo" />
        <p className={styles.projectText}>
          With ‘CoreJS 2’ interviews approaching, we dedicated ourselves to preparation and finished the third sprint
          with top scores. Olga also took charge of writing tests for our site, for which Alexander and I were immensely
          grateful.
        </p>
        <p className={styles.projectText}>
          The fourth sprint involved developing the shopping basket, with the main challenge being another API parsing
          from ‘commercetools.’ Alexander successfully developed most of the logic and API for our project. Following
          this, Olga and I focused on the layout and page logic to interact with the API.
        </p>
        <p className={styles.projectText}>
          Finally, we created this project page you are reading now, marking the end of our journey.
        </p>
      </div>

      <div className={styles.rsSchoolWrapper}>
        <RsSchoolLogo width="250" />
      </div>
      <Breadcrumbs currantPage="About Us" />
    </div>
  );
};
