import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/components/GameCard.module.css';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '../../configs/LanguageContext';
import { getStaticImg } from '../../utils/utils';

const GameCard = ({ game }) => {
    const router = useRouter();
    const { t } = useTranslation('games');
    const { language } = useLanguage();

    const handleCardClick = () => {
        router.push(`/games/${game.id}`);
    };

    return (
        <div
            className={styles.card}
            key={game.id}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
            title={game.name[language]}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={getStaticImg(game.slug)}
                    alt={game.name[language]} layout="fill" objectFit="fill" />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{game.name[language]}</h3>
                <p>{game.description[language]}</p>
                <div className={styles.tags}>
                    {game.tags.map((tag) => (
                        <span key={tag} className={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameCard;
