import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/ProjectCard.module.css';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '../configs/LanguageContext';

const ProjectCard = ({ project }) => {
  const router = useRouter();
  const { t } = useTranslation('projects');
  const { language } = useLanguage();

  const handleCardClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      className={styles.card}
      key={project.id}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div style={{ width: '100%', height: 200, position: 'relative', background: 'skyblue' }}>
        <Image src={project.image} alt={project.name} layout="fill" objectFit="fill" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.name}</h3>
        <p>{project.description[language]}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.cta}>
          {project.source_code && (
            <a
              href={project.source_code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underline}
            >
              {t('sourceCode')}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underline}
            >
              {t('liveDemo')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
