import Image from 'next/image';
import { useRouter } from 'next/router';
import EyeIcon from '../components/icons/EyeIcon';
import HeartIcon from '../components/icons/HeartIcon';
import CommentIcon from '../components/icons/CommentIcon';
import styles from '../styles/ArticleCard.module.css';
import { useLanguage } from '../configs/LanguageContext';

const ArticleCard = ({ article }) => {
  const router = useRouter();
  const { language } = useLanguage();

  const handleCardClick = () => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <div
      className={styles.container}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div style={{ width: '100%', height: 180, position: 'relative' }}>
        <Image src={article.cover_image} alt={article.title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title[language] || article.title['en']}</h3>
        <p>{article.description[language]}</p>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <EyeIcon className={styles.icon} /> {article.page_views_count}
        </div>
        <div className={styles.stat}>
          <HeartIcon className={styles.icon} /> {article.public_reactions_count}
        </div>
        <div className={styles.stat}>
          <CommentIcon className={styles.icon} /> {article.comments_count}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
