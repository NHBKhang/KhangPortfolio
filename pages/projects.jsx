import ProjectCard from '../components/ProjectCard';
import { getProjects } from './api/projects';
import styles from '../styles/ProjectsPage.module.css';

const ProjectsPage = ({ projects }) => {
  return (
    <>
      <h3>Dự án tôi đã làm được đến bây giờ</h3>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  var projects = getProjects();

  projects = projects.sort((a, b) => b.id - a.id);

  return {
    props: { title: 'Projects', projects },
  };
}

export default ProjectsPage;
