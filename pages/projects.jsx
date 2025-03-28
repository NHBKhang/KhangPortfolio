import ProjectCard from '../components/cards/ProjectCard';
import { getProjects } from './api/projects';
import styles from '../styles/pages/ProjectsPage.module.css';
import CustomHead from '../components/base/Head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pagination from '../components/buttons/Pagination';

const ProjectsPage = ({ projects, pagination }) => {
  const { t } = useTranslation('projects');

  return (
    <>
      <CustomHead page={'projects'} />
      <h3 data-aos="fade-right">{t('title')}</h3>
      
      <div className={styles.container} data-aos="slide-right">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>{t('noProjects')}</p>
        )}
      </div>

      <Pagination pagination={pagination} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { query, locale } = context;
  const page = query?.page ? parseInt(query.page, 10) : 1;
  const pageSize = query?.pageSize ? parseInt(query.pageSize, 10) : null;

  const res = getProjects(page, pageSize);

  return {
    props: {
      projects: res.data,
      pagination: {
        previous: res.previous,
        current: res.page,
        next: res.next,
        total: res.totalPages
      },
      ...(await serverSideTranslations(locale, ['projects', 'common'])),
    },
  };
}

export default ProjectsPage;
