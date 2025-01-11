import ProjectCard from '../components/cards/ProjectCard';
import { getProjects } from './api/projects';
import styles from '../styles/ProjectsPage.module.css';
import CustomHead from '../components/Head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProjectsPage = ({ projects }) => {
  const { t } = useTranslation('projects');

  return (
    <>
      <CustomHead page={'projects'} />
      <h3 data-aos="fade-right">{t('title')}</h3>
      {projects.length > 0 ? (
        <div className={styles.container} data-aos="slide-right">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>{t('noProjects')}</p>
      )}
    </>
  );
};

export async function getStaticProps({ locale }) {
  const projects = getProjects();
  const sortedProjects = projects.sort((a, b) => b.id - a.id);

  return {
    props: {
      projects: sortedProjects,
      ...(await serverSideTranslations(locale, ['projects', 'common'])),
    },
  };
}

export default ProjectsPage;
