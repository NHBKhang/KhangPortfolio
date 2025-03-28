import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/pages/GamesPage.module.css";
import { useTranslation } from "next-i18next";
import CustomHead from "../components/base/Head";
import GameCard from "../components/cards/GameCard";
import { getGames } from "./api/games";
import { useEffect, useState } from "react";
import GameInlineCard from "../components/cards/GameInlineCard";
import ViewToggleButton from "../components/buttons/ViewToggleButton";
import Pagination from "../components/buttons/Pagination";
import clsx from "clsx";
import AOS from "aos";

const GamesPage = ({ games, pagination }) => {
    const { t } = useTranslation('games');
    const [currentView, setCurrentView] = useState(0);

    useEffect(() => {
        AOS.refresh();
    }, [currentView]);

    return (
        <>
            <CustomHead page="games" />
            <div className={styles.header}>
                <h3 data-aos="fade-right">{t('title')}</h3>
                <div className={styles.viewButton}>
                    <ViewToggleButton currentView={currentView} setCurrentView={setCurrentView} />
                </div>
            </div>
            <div
                className={clsx(styles.container, { [styles.column]: currentView === 1 })}
                data-aos="slide-right">
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

            <Pagination pagination={pagination} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { query, locale } = context;
    const page = query?.page ? parseInt(query.page, 10) : 1;
    const pageSize = query?.pageSize ? parseInt(query.pageSize, 10) : null;

    const res = getGames(page, pageSize);

    return {
        props: {
            games: res.data,
            pagination: {
                previous: res.previous,
                current: res.page,
                next: res.next,
                total: res.totalPages
            },
            ...(await serverSideTranslations(locale, ['common', 'games']))
        },
    };
}

export default GamesPage;