import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/GameCard.module.css';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '../../configs/LanguageContext';

const GameInlineCard = ({ game }) => {
    const router = useRouter();
    const { t } = useTranslation('games');
    const { language } = useLanguage();

    const handleCardClick = () => {
        router.push(`/games/${game.id}`);
    };

    return (
        <div
            className={styles.inlineCard}
            key={game.id}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
        >
            <div className={styles.inlineImageContainer}>
                <Image src={game.image} alt={game.name[language]} layout="fill" objectFit="fill" />
            </div>
            <div className={styles.inlineContent}>
                <h3 className={styles.inlineTitle}>{game.name[language]}</h3>
                <p>{game.description[language]}</p>
                <div className={styles.inlineTags}>
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

export default GameInlineCard;
