import ArticleCard from '../components/cards/ArticleCard';
import CustomHead from '../components/Head';
import styles from '../styles/ArticlesPage.module.css';
import { getArticles } from './api/articles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ArticlesPage = ({ articles }) => {
  const { t } = useTranslation('articles');

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
            <ArticleCard key={article.id} article={article} />
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

  return {
    props: {
      articles: sortedArticles,
      ...(await serverSideTranslations(locale, ['articles', 'common']))
    }
  };
}

export default ArticlesPage;
