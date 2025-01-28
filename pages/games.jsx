import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/GamesPage.module.css";
import { useTranslation } from "next-i18next";
import CustomHead from "../components/Head";
import GameCard from "../components/cards/GameCard";
import { getGames } from "./api/games";
import { useState } from "react";
import GameInlineCard from "../components/cards/GameInlineCard";
import ViewToggleButton from "../components/buttons/ViewToggleButton";

const GamesPage = ({ games }) => {
    const { t } = useTranslation('games');
    const [currentView, setCurrentView] = useState(0)

    return (
        <>
            <CustomHead page="games" />
            <div className={styles.header}>
                <h3 data-aos="fade-right">{t('title')}</h3>
                <div className={styles.viewButton}>
                    <ViewToggleButton currentView={currentView} setCurrentView={setCurrentView} />
                </div>
            </div>
            <div className={styles.container} data-aos="slide-right">
                {games.length > 0 ? (
                    games.map((game) => (
                        currentView === 0 ?
                            <GameCard key={game.id} game={game} /> :
                            <GameInlineCard key={game.id} game={game} />
                    ))
                ) : (
                    <p>{t('noArticles')}</p>
                )}
            </div>
        </>
    )
}

export async function getStaticProps({ locale }) {
    const games = getGames();
    const sortedGames = games.sort((a, b) => b.id - a.id);

    return {
        props: {
            games: sortedGames,
            ...(await serverSideTranslations(locale, ['common', 'games']))
        },
    };
}

export default GamesPage;