import { useTranslation } from 'next-i18next';
import { useLanguage } from '../configs/LanguageContext';
import CustomHead from '../components/Head';
import { getNewestVersion } from './api/versions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/VersionPage.module.css';
import { useEffect, useState } from 'react';

const VersionPage = () => {
    const { t } = useTranslation('version');
    const { language } = useLanguage();
    const [version, setVersion] = useState({});

    useEffect(() => {
        const loadNewestVersion = () => {
            const newestVersion = getNewestVersion(language);
            setVersion(newestVersion);
        };

        loadNewestVersion();
    }, [language]);

    return (
        <>
            <CustomHead page="version" />
            <div className={styles.container}>
                <h1 className={styles.title}>{t('version')}</h1>
                <p className={styles.text}>{t('description')}</p>

                <h2 className={styles.subtitle}>{t('releaseNotes')}</h2>
                {version.version && (
                    <>
                        <h3 className={styles.sectionTitle}>{t('currentVersion')}: {version.version}</h3>
                        <p className={styles.text}>{t('releaseDate')}: {version.releaseDate}</p>
                        <ul className={styles.list}>
                            {version.notes?.map((note, noteIndex) => (
                                <li key={noteIndex} className={styles.listItem}>{note}</li>
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
                                    <h4 className={styles.changelogType}>{type.charAt(0).toUpperCase() + type.slice(1)}:</h4>
                                    <ul className={styles.list}>
                                        {groupedChangelogs[type].map((message, index) => (
                                            <li key={index} className={styles.listItem}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            ));
                        })()}
                    </>
                )}
            </div>
        </>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['version'])),
        },
    };
}

export default VersionPage;
