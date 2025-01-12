import { useRouter } from 'next/router';
import styles from '../../styles/GamePage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/Head';
import { useLanguage } from '../../configs/LanguageContext';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '../../components/photo/Modal';
import BackButton from '../../components/buttons/BackButton';
import { getGame, getGameIds } from '../api/games';
import Link from 'next/link';
import { PlayIcon } from "@heroicons/react/24/outline";

const GamePage = ({ game }) => {
    const router = useRouter();
    const { t } = useTranslation('games');
    const { language } = useLanguage();

    const [isModalOpen, setModalOpen] = useState(false);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!game) {
        return <div>{t('gameNotFound')}</div>;
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <CustomHead page={'game'} params={{ name: game.name[language] }} />
            <BackButton pathname={'/games'} />
            <div className={styles.container}>
                <h1 className={styles.title}>{game.name[language]}</h1>
                <div className={styles.wrapper}>
                    <Image
                        src={game.image}
                        alt={game.name[language]}
                        width={800}
                        height={450}
                        onClick={openModal}
                        className={styles.image}
                    />
                    <div className={styles.infoContainer}>
                        <p className={styles.tagsLabel}>
                            {t('tagsLabel')}:
                        </p>
                        <div className={styles.tags}>
                            {game.tags.map((tag, index) => (
                                <span key={index} className={`${tag} ${styles.tag}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className={styles.row}>
                            <p>{t('version')}: </p>
                            <span>{game.version}</span>
                        </div>
                        <div className={styles.row}>
                            <p>{t('releaseDate')}: </p>
                            <span>{game.releaseDate}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <p>{t('description')}: </p>
                </div>
                <p className={styles.description}>{game.description[language]}</p>

                <div className={styles.buttonGroup}>
                    <Link className={styles.playGame}
                        href={game.href}>
                        <PlayIcon />
                        <span>{t('play')}</span>
                    </Link>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    images={[{ src: game.image, alt: game.name }]}
                    onClose={closeModal}
                    navigation={false}
                />
            )}
        </>
    );
};

export async function getStaticProps({ params, locale }) {
    const { id } = params;
    const game = getGame(id);

    return {
        props: {
            game: game || null,
            ...(await serverSideTranslations(locale, ['games', 'common'])),
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const gameIds = getGameIds();

    const paths = gameIds.map((id) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export default GamePage;
