import { useRouter } from 'next/router';
import { getProject, getProjectIds } from '../api/projects';
import styles from '../../styles/ProjectPage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/Head';
import { useLanguage } from '../../configs/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

const ProjectPage = ({ project }) => {
    const router = useRouter();
    const { t } = useTranslation('projects');
    const { language } = useLanguage();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>{t('projectNotFound')}</div>;
    }

    return (
        <>
            <CustomHead page={'project'} params={{ name: project.name }} />

            <div className={styles.container}>
                <h1 className={styles.title}>{project.name}</h1>
                <Image
                    src={project.image}
                    alt={project.name}
                    width={800}
                    height={450}
                    className={styles.image}
                />
                <p className={styles.description}>{project.description[language]}</p>
                <h4 className={styles.languagesAndTechnologies}>
                    {t('languagesAndTechnologies')}
                </h4>
                <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                        <span key={index} className={`${tag} ${styles.tag}`}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles.buttonGroup}>
                    <Link className={styles.sourceCodeLink}
                        href={project.source_code} target="_blank" rel="noopener noreferrer">
                        {t('viewSourceCode')}
                    </Link>
                    {project.demo && <Link className={styles.liveDemoLink}
                        href={project.demo} target="_blank" rel="noopener noreferrer">
                        {t('viewLiveDemo')}
                    </Link>}
                </div>
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
            ...(await serverSideTranslations(locale, ['projects', 'common'])),
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