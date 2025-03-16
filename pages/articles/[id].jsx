import { useRouter } from 'next/router';
import { getArticle, getArticleIds } from '../api/articles';
import styles from '../../styles/ArticlePage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/base/Head';
import { useLanguage } from '../../configs/LanguageContext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from "../../utils/animationVariants";
import BackButton from '../../components/buttons/BackButton';
import { getPostMetrics } from '../api/firebase/stats';
import { addView } from '../api/firebase/views';
import ReactionBox from '../../components/boxes/ReactionBox';
import { addReaction } from '../api/firebase/reactions';
import { useNotification } from '../../utils/toast';
import CommentBox from '../../components/boxes/CommentBox';
import { addComment, getComments } from '../api/firebase/comments';
import Loading from '../../components/other/Loading';

const ArticlePage = ({ article }) => {
    const router = useRouter();
    const sendNotification = useNotification();
    const { language } = useLanguage();
    const { t } = useTranslation('articles');

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [reactions, setReactions] = useState({});
    const [stat, setStat] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);

    if (router.isFallback) {
        return <Loading />;
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
                [res.data.reactionType]: (prev[res.data.reactionType] || 0) + 1
            }));
            setStat(prev => ({
                ...prev,
                reactions: prev['reactions'] + 1
            }));
        } catch (error) {
            sendNotification({ message: t('errorReaction') }, 'error');
        }
    }

    const handleAddComment = async (articleId, content) => {
        try {
            let res = await addComment(articleId, content);
            setComments(prev => [
                res.data,
                ...prev
            ])
            setStat(prev => ({
                ...prev,
                comments: prev['comments'] + 1
            }));
        } catch (error) {
            console.info(error)
            sendNotification({ message: t('errorComment') }, 'error');
        }
    }

    useEffect(() => {
        const loadPostMetrics = async () => {
            try {
                let res = await getPostMetrics(article.id);
                setReactions(res.data.reactions);
                setStat({
                    views: res.data.views,
                    reactions: res.data.totalReactions,
                    comments: res.data.totalComments
                });
            } catch (error) {
                console.error("🔥 Error loading stats:", error.message || error.error);
            }
        }

        const loadComments = async () => {
            setCommentsLoading(true);
            try {
                let res = await getComments(article.id);
                setComments(res.data);
            } catch (error) {
                console.error("🔥 Error loading comments:", error.message || error.error);
            } finally {
                setCommentsLoading(false);
            }
        }

        loadPostMetrics();
        if (!article.blocked_comments) loadComments()

        const timer = setTimeout(async () => {
            try {
                await addView(article.id);
            } catch (error) {
                console.error("🔥 Error adding view:", error.message);
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
                        <p className={styles.stat}>{t('reactions')}: {stat.reactions || 0}</p>
                        <p className={styles.stat}>{t('views')}: {stat.views || 0}</p>
                        <p className={styles.stat}>{t('comments')}: {stat.comments || 0}</p>
                    </div>
                    <div className={styles.actions}>
                        <ReactionBox
                            onReact={async (reactionId) => await handleReaction(article.id, reactionId)}
                            react={reactions}
                            blockedReactions={article.blocked_reactions ?? []}
                        />
                    </div>
                    <div>
                        {article.blocked_comments ?
                            <p className={styles.blockedComments}>{t('blockedComments')}</p> :
                            <CommentBox
                                comments={comments}
                                onAddComment={async (content) => await handleAddComment(article.id, content)} />}
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
