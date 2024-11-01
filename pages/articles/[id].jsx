import { useRouter } from 'next/router';
import { getArticle, getArticleIds } from '../api/articles';
import styles from '../../styles/ArticlePage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../../components/Head';

const ArticlePage = ({ article }) => {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation('articles');

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>{t('articleNotFound')}</div>;
    }

    return (
        <>
            <CustomHead page={'article'} params={{ id: id }} />
            <div className={styles.container}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.coverWrapper}>
                    <img className={styles.coverImage} src={article.cover_image} alt={t('articles:coverImageAlt')} />
                </div>
                <div className={styles.stats}>
                    <p className={styles.stat}>{t('views')}: {article.page_views_count}</p>
                    <p className={styles.stat}>{t('reactions')}: {article.public_reactions_count}</p>
                    <p className={styles.stat}>{t('comments')}: {article.comments_count}</p>
                </div>
                <a className={styles.viewFullArticle} href={article.url} target="_blank" rel="noopener noreferrer">
                    {t('viewFullArticle')}
                </a>
            </div>
        </>
    );
};

export async function getStaticProps({ params, locale }) {
    const article = getArticle(params.id);
    return {
        props: {
            article: article || null,
            ...(await serverSideTranslations(locale, ['articles'])),
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
