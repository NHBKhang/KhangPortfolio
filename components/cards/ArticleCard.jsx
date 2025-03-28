import Image from 'next/image';
import { useRouter } from 'next/router';
import EyeIcon from '../icons/EyeIcon';
import HeartIcon from '../icons/HeartIcon';
import CommentIcon from '../icons/CommentIcon';
import styles from '../../styles/components/ArticleCard.module.css';
import { useLanguage } from '../../configs/LanguageContext';

const ArticleCard = ({ article, stat = {} }) => {
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
      title={article.title[language]}
    >
      <div style={{ width: '100%', height: 180, position: 'relative' }}>
        <Image src={article.images[0]} alt={article.title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title[language] || article.title['en']}</h3>
        <p>{article.description[language]}</p>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <HeartIcon className={styles.icon} /> {stat?.totalReactions || 0}
        </div>
        <div className={styles.stat}>
          <EyeIcon className={styles.icon} /> {stat?.views || 0}
        </div>
        <div className={styles.stat}>
          <CommentIcon className={styles.icon} /> {stat?.totalComments || 0}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
