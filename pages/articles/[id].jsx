import { useRouter } from 'next/router';
import { getArticle, getArticleIds } from '../api/articles';
import styles from '../../styles/ArticlePage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/Head';
import { useLanguage } from '../../configs/LanguageContext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Modal from '../../components/photo/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from "../../utils/animationVariants";
import BackButton from '../../components/buttons/BackButton';
import { getPostMetrics } from '../api/firebase/stats';
import { addView } from '../api/firebase/views';
import ReactionBox from '../../components/boxes/ReactionBox';
import { addReaction } from '../api/firebase/reactions';

const ArticlePage = ({ article }) => {
    const router = useRouter();
    const { language } = useLanguage();
    const { t } = useTranslation('articles');

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [reactions, setReactions] = useState({});
    const [stat, setStat] = useState({});

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>{t('articleNotFound')}</div>;
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const changePhotoId = (event, newVal) => {
        event.stopPropagation();
        setDirection(newVal > currentIndex ? 1 : -1);
        setCurrentIndex(newVal);
    }

    const handleReaction = async (articleId, reactionType) => {
        try {
            let res = await addReaction(articleId, reactionType);
            setReactions(prev => ({
                ...prev,
                [res.reactionType]: (prev[reactionType] || 0) + 1
            }));
            setStat(prev => ({
                ...prev,
                reactions: prev['reactions'] + 1
            }));
        } catch (error) {
            console.error("Error adding reaction:", error);
        }
    }

    useEffect(() => {
        const loadPostMetrics = async () => {
            try {
                let res = await getPostMetrics(article.id);
                setReactions(res.reactions);
                setStat({
                    views: res.views,
                    reactions: res.totalReactions,
                    comments: res.totalComments
                });
            } catch (error) {
                console.error(error);
            }
        }

        loadPostMetrics();

        const timer = setTimeout(async () => {
            try {
                await addView(article.id);
            } catch (error) {
                console.error("🔥 Error adding view:", error);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <CustomHead page={'article'} params={{ name: article.title[language] }} />
            <BackButton pathname={'/articles'} />
            <div className={styles.container}>
                <h1 className={styles.title}>{article.title[language] || article.title['en']}</h1>
                <p className={styles.description}>{article.description[language]}</p>
                <div className={styles.coverWrapper} onClick={() => openModal()}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={styles.imageMotion}
                        >
                            <img
                                className={styles.coverImage}
                                src={article.images[currentIndex]}
                                alt={t('articles:coverImageAlt')}
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className={styles.navigationButtons}>
                        {currentIndex > 0 ? (
                            <button onClick={(e) => changePhotoId(e, currentIndex - 1)}>
                                &#8249;
                            </button>
                        ) : <div />}
                        {currentIndex < article.images.length - 1 && (
                            <button onClick={(e) => changePhotoId(e, currentIndex + 1)}>
                                &#8250;
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.createdDate}>
                    <p>{t('postedOn')} {moment(article.created_date).fromNow()}</p>
                </div>
                <a className={styles.viewFullArticle} href={article.url} target="_blank" rel="noopener noreferrer">
                    {t('viewFullArticle')}
                </a>
                <div className={styles.panel}>
                    <div className={styles.stats}>
                        <p className={styles.stat}>{t('reactions')}: {stat.reactions}</p>
                        <p className={styles.stat}>{t('views')}: {stat.views}</p>
                        <p className={styles.stat}>{t('comments')}: {stat.comments}</p>
                    </div>
                    <div className={styles.actions}>
                        <ReactionBox
                            onReact={async (reactionId) => await handleReaction(article.id, reactionId)}
                            react={reactions}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    images={article.images.map((image) => ({ src: image, alt: article.title[language] }))}
                    onClose={closeModal}
                    articleId={article.id}
                    index={currentIndex}
                />
            )}
        </>
    );
};

export async function getStaticProps({ params, locale }) {
    const article = getArticle(params.id);
    return {
        props: {
            article: article || null,
            ...(await serverSideTranslations(locale, ['articles', 'common'])),
        },
    };
}

export async function getStaticPaths() {
    const articleIds = getArticleIds();
    const paths = articleIds.map((id) => ({ params: { id: id.toString() } }));
    return {
        paths,
        fallback: true,
    };
}

export default ArticlePage;
