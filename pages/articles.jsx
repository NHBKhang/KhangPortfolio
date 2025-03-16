import { useEffect, useState } from 'react';
import ArticleCard from '../components/cards/ArticleCard';
import CustomHead from '../components/base/Head';
import styles from '../styles/ArticlesPage.module.css';
import { getArticleIds, getArticles } from './api/articles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPostsMetrics } from './api/firebase/stats';
import Pagination from '../components/buttons/Pagination';

const ArticlesPage = ({ articles, articleIds, pagination }) => {
  const { t } = useTranslation('articles');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        let res = await getPostsMetrics(articleIds);
        setStats(res.data);
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

      <Pagination pagination={pagination} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { query, locale } = context;
  const page = query?.page ? parseInt(query.page, 10) : 1;
  const pageSize = query?.pageSize ? parseInt(query.pageSize, 10) : null;

  const res = getArticles(page, pageSize);
  const articleIds = getArticleIds();

  return {
    props: {
      articleIds: articleIds,
      articles: res.data,
      pagination: {
        previous: res.previous,
        current: res.page,
        next: res.next,
        total: res.totalPages
      },
      ...(await serverSideTranslations(locale, ['articles', 'common']))
    }
  };
}

export default ArticlesPage;
