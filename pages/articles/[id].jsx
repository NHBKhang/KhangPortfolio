import { useRouter } from 'next/router';
import { getArticle, getArticleIds } from '../api/articles';
import styles from '../../styles/ArticlePage.module.css';

const ArticlePage = ({ article }) => {
    const router = useRouter();
    const { id } = router.query;

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.description}>{article.description}</p>
            <div className={styles.coverWrapper}>
                <img className={styles.coverImage} src={article.cover_image} alt="Cover Image" />
            </div>

            <div className={styles.stats}>
                <p className={styles.stat}>Views: {article.page_views_count}</p>
                <p className={styles.stat}>Reactions: {article.public_reactions_count}</p>
                <p className={styles.stat}>Comments: {article.comments_count}</p>
            </div>

            <a className={styles.viewFullArticle} href={article.url} target="_blank" rel="noopener noreferrer">
                View Full Article
            </a>
        </div>
    );
};

export async function getStaticProps({ params }) {
    const { id } = params;
    var article = getArticle(id);

    return {
        props: { title: `Article ${id}`, article: article },
    };
}

export async function getStaticPaths() {
    const articles = getArticleIds();

    const paths = articles.map((id) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export default ArticlePage;