import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../components/base/Head';
import { getEducationTimeline, getExperienceTimeline } from './api/timeline';
import Timeline from '../components/other/Timeline';
import { useLanguage } from '../configs/LanguageContext';
import { useEffect, useState } from 'react';
import styles from '../styles/pages/AboutPage.module.css';
import ProgressPie from '../components/boxes/ProgressPie';

const skills = [
  {
    "skill": "Python",
    "percentage": 85,
  },
  {
    "skill": "C#",
    "percentage": 70,
  },
  {
    "skill": "Javascript",
    "percentage": 80,
  },
  {
    "skill": "Typescript",
    "percentage": 70,
  },
  {
    "skill": "C/C++",
    "percentage": 55,
  },
  {
    "skill": "HTML/XML",
    "percentage": 87,
  },
  {
    "skill": "CSS/SCSS",
    "percentage": 80,
  },
  {
    "skill": "Java",
    "percentage": 62,
  },
]

const AboutPage = () => {
  const { t } = useTranslation('about');
  const { language } = useLanguage();
  const [timeline, setTimeLine] = useState({
    education: [],
    experience: []
  });

  useEffect(() => {
    setTimeLine({
      education: getEducationTimeline(language),
      experience: getExperienceTimeline(language),
    });
  }, [language]);

  const aboutLines = [
    t('fullName'),
    t('birthDate'),
    t('birthPlace'),
    t('gender'),
    t('nationality'),
    t('hometown'),
    t('hobbies')
  ]

  return (
    <>
      <CustomHead page="about" />
      <h3
        className={styles.title}
        data-aos="fade-right"
      >
        {t('aboutMe')}
      </h3>
      <div className={styles.aboutLines}>
        {aboutLines.map((line, index) =>
          <p style={{ animationDelay: `${index * 0.1}s` }}> - {line}</p>)}
      </div>


      <h3
        className={styles.title}
        data-aos="fade-right"
      >
        {t('skills')}
      </h3>
      <div className={styles.aboutLines}>
        {skills.map(skill =>
          <ProgressPie progress={skill} />
        )}
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <h3
            className={styles.title}
            data-aos="fade-right"
          >
            {t('education')}
          </h3>
          <Timeline data={timeline.education} />
        </div>
        <div className={styles.timeline}>
          <h3
            className={styles.title}
            data-aos="fade-right"
          >
            {t('workExperience')}
          </h3>
          <Timeline data={timeline.experience} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'common'])),
    },
  };
}

export default AboutPage;
