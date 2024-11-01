import { useRouter } from 'next/router';
import { getProject, getProjectIds } from '../api/projects';
import styles from '../../styles/ProjectPage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/Head';

const ProjectPage = ({ project }) => {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation('projects');

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>{t('projectNotFound')}</div>;
    }

    return (
        <>
            <CustomHead page={'project'} params={{ id: id }} />
            <div className={styles.container}>
                <h1 className={styles.title}>{project.name}</h1>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.techStack}>
                    <h3>{t('technologies')}:</h3>
                    <ul>
                        {project.tags.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.stats}>
                    <p>{t('developmentTime')}: {project.developmentTime}</p>
                    <p>{t('role')}: {project.role}</p>
                </div>

                <a className={styles.viewRepo} href={project.repository_url} target="_blank" rel="noopener noreferrer">
                    {t('viewRepo')}
                </a>
            </div>
        </>
    );
};

export async function getStaticProps({ params, locale }) {
    const { id } = params;
    const project = getProject(id);

    return {
        props: {
            project: project || null,
            ...(await serverSideTranslations(locale, ['projects'])),
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const projectIds = getProjectIds();

    const paths = projectIds.map((id) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export default ProjectPage;
