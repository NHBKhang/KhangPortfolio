import { useEffect, useState } from 'react';
import ArticleCard from '../components/cards/ArticleCard';
import CustomHead from '../components/Head';
import styles from '../styles/ArticlesPage.module.css';
import { getArticleIds, getArticles } from './api/articles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPostsMetrics } from './api/firebase/stats';

const ArticlesPage = ({ articles, articleIds }) => {
  const { t } = useTranslation('articles');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        let res = await getPostsMetrics(articleIds);
        setStats(res);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  return (
    <>
      <CustomHead page={'articles'} />
      <h3 data-aos="fade-right">
        {t('recentPosts')} {' '}
        <a
          href={'/articles'}
          rel="noopener noreferrer"
          className={styles.underline}
        >
          khang.github.io
        </a>
      </h3>
      <div className={styles.container} data-aos="slide-right">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} stat={stats[article.id]}/>
          ))
        ) : (
          <p>{t('noArticles')}</p>
        )}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const articles = getArticles();
  const sortedArticles = articles.sort((a, b) => b.id - a.id);

  const articleIds = getArticleIds();

  return {
    props: {
      articles: sortedArticles,
      articleIds: articleIds,
      ...(await serverSideTranslations(locale, ['articles', 'common']))
    }
  };
}

export default ArticlesPage;
