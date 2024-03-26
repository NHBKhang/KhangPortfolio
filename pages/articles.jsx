import ArticleCard from '../components/ArticleCard';
import styles from '../styles/ArticlesPage.module.css';
import { getArticles } from './api/articles';
import { getProjects } from './api/projects';

const ArticlesPage = ({ articles }) => {
  return (
    <>
      <h3>
        Bài đăng gần đây trên {' '}
        <a
          href=""
          target="_blank"
          rel="noopener"
          className={styles.underline}
        >
          github.io
        </a>
      </h3>
      <div className={styles.container}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  var articles = getArticles();

  articles = articles.sort((a, b) => b.id - a.id);

  return {
    props: { title: 'Articles', articles: articles },
  };
}

export default ArticlesPage;
