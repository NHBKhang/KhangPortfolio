import { useTranslation } from 'next-i18next';
import { useLanguage } from '../configs/LanguageContext';
import CustomHead from '../components/base/Head';
import { getNewestVersion, getPreviousVersion, getNextVersion } from './api/versions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/VersionPage.module.css';
import { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';

const VersionPage = () => {
    const { t } = useTranslation('version');
    const { language } = useLanguage();
    const [version, setVersion] = useState({});
    const [currentVersionId, setCurrentVersionId] = useState(null);

    useEffect(() => {
        const loadNewestVersion = () => {
            const newestVersion = getNewestVersion(language);
            setVersion(newestVersion);
            setCurrentVersionId(newestVersion?.id);
        };

        loadNewestVersion();
    }, [language]);

    useEffect(() => {
        const main = document.getElementById('main-editor');
        main.scrollTop = 0;
    }, [version]);

    const handlePreviousVersion = () => {
        const previousVersion = getPreviousVersion(currentVersionId, language);
        if (previousVersion) {
            setVersion(previousVersion);
            setCurrentVersionId(previousVersion.id);
        }
    };

    const handleNextVersion = () => {
        const nextVersion = getNextVersion(currentVersionId, language);
        if (nextVersion) {
            setVersion(nextVersion);
            setCurrentVersionId(nextVersion.id);
        }
    };

    return (
        <>
            <CustomHead page="version" />
            <div className={styles.container}>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoIcon}><FiInfo size={20} color="blue" /></div>
                    <div className={styles.tooltip}>
                        {t('description')}
                    </div>
                </div>
                {version?.version && (
                    <>
                        <h1 className={styles.title}>{t('version')}</h1>
                        <p className={styles.text}>{version.description}</p>

                        <h2 className={styles.subtitle}>{t('releaseNotes')}</h2>
                        <h3 className={styles.sectionTitle}>
                            {t('currentVersion')}: {version.version}
                        </h3>
                        <p className={styles.text}>
                            {t('releaseDate')}: {version.releaseDate}
                        </p>
                        <ul className={styles.list}>
                            {version.notes?.map((note, noteIndex) => (
                                <li key={noteIndex} className={styles.listItem}>
                                    {note}
                                </li>
                            ))}
                        </ul>

                        <h3 className={styles.sectionTitle}>{t('changelog')}</h3>
                        <p className={styles.text}>{version.changelogDescription}</p>
                        {version.changelogs && (() => {
                            const groupedChangelogs = version.changelogs.reduce((acc, changelog) => {
                                if (!acc[changelog.type]) {
                                    acc[changelog.type] = [];
                                }
                                acc[changelog.type].push(changelog.message);
                                return acc;
                            }, {});

                            return Object.keys(groupedChangelogs).map((type) => (
                                <div key={type}>
                                    <h4 className={styles.changelogType}>
                                        {t(type)}:
                                    </h4>
                                    <ul className={styles.list}>
                                        {groupedChangelogs[type].map((message, index) => (
                                            <li key={index} className={styles.listItem}>
                                                {message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ));
                        })()}
                        <div className={styles.navButtons}>
                            <button
                                className={`${styles.button} ${styles.prevButton}`}
                                onClick={handlePreviousVersion}
                                disabled={!getPreviousVersion(currentVersionId, language)}
                            >
                                &#9664; {t('previous')}
                            </button>
                            <button
                                className={`${styles.button} ${styles.nextButton}`}
                                onClick={handleNextVersion}
                                disabled={!getNextVersion(currentVersionId, language)}
                            >
                                {t('next')} &#9654;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['version', 'common'])),
        },
    };
}

export default VersionPage;
