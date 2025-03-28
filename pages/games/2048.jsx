import { useState, useEffect } from "react";
import styles from "../../styles/pages/2048Game.module.css";
import { useTranslation } from "next-i18next";
import { useLanguage } from "../../configs/LanguageContext";
import { useGlobalContext } from "../../configs/GlobalContext";
import CustomHead from "../../components/base/Head";
import BackButton from "../../components/buttons/BackButton";
import { getGame } from "../api/games";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SIZE = 4;

const getEmptyBoard = () => Array(SIZE).fill().map(() => Array(SIZE).fill(0));

const getRandomEmptyCell = (board) => {
    let emptyCells = [];
    board.forEach((row, r) => row.forEach((cell, c) => cell === 0 && emptyCells.push([r, c])));
    return emptyCells.length ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
};

const addNewTile = (board) => {
    const newBoard = board.map(row => [...row]);
    const emptyCell = getRandomEmptyCell(newBoard);
    if (emptyCell) {
        const [r, c] = emptyCell;
        newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
    return newBoard;
};

const moveBoard = (board, direction) => {
    const newBoard = board.map(row => [...row]);
    let moved = false;

    const slideRow = (row) => {
        let arr = row.filter(val => val);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                arr[i + 1] = 0;
            }
        }
        arr = arr.filter(val => val);
        while (arr.length < SIZE) arr.push(0);
        return arr;
    };

    for (let i = 0; i < SIZE; i++) {
        let row = [];
        for (let j = 0; j < SIZE; j++) {
            if (direction === "LEFT") row.push(newBoard[i][j]);
            if (direction === "RIGHT") row.unshift(newBoard[i][SIZE - 1 - j]);
            if (direction === "UP") row.push(newBoard[j][i]);
            if (direction === "DOWN") row.unshift(newBoard[SIZE - 1 - j][i]);
        }

        let newRow = slideRow(row);
        for (let j = 0; j < SIZE; j++) {
            if (direction === "LEFT" && newBoard[i][j] !== newRow[j]) moved = true;
            if (direction === "RIGHT" && newBoard[i][SIZE - 1 - j] !== newRow[j]) moved = true;
            if (direction === "UP" && newBoard[j][i] !== newRow[j]) moved = true;
            if (direction === "DOWN" && newBoard[SIZE - 1 - j][i] !== newRow[j]) moved = true;
        }

        for (let j = 0; j < SIZE; j++) {
            if (direction === "LEFT") newBoard[i][j] = newRow[j];
            if (direction === "RIGHT") newBoard[i][SIZE - 1 - j] = newRow[j];
            if (direction === "UP") newBoard[j][i] = newRow[j];
            if (direction === "DOWN") newBoard[SIZE - 1 - j][i] = newRow[j];
        }
    }

    return moved ? addNewTile(newBoard) : board;
};

const Tile = ({ value }) => {
    return (
        <div 
            className={`${styles.tile} ${styles[`tile-${value}`]}`} 
            style={{
                animation: value ? 'pop 0.1s ease-in-out' : 'none'
            }}
        >
            {value !== 0 ? value : ""}
        </div>
    );
};

const Game2048 = ({ game }) => {
    const [board, setBoard] = useState(addNewTile(getEmptyBoard()));
    const { t } = useTranslation('2048-game');
    const { language } = useLanguage();
    const { setChatboxHidden, setExplorerHidden } = useGlobalContext();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setChatboxHidden(true);
        setExplorerHidden(true);
        setHydrated(true);

        const handleKeyDown = (e) => {
            const keyMap = { ArrowLeft: "LEFT", ArrowRight: "RIGHT", ArrowUp: "UP", ArrowDown: "DOWN" };
            if (keyMap[e.key]) {
                e.preventDefault()
                setBoard(prev => moveBoard(prev, keyMap[e.key]));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    
    if (!hydrated) return null;

    return (
        <>
            <CustomHead page={'playingGame'} params={{ name: game.name[language] }} />
            <BackButton pathname={'/games/2'} callback={() => setExplorerHidden(false)} />
            <div className={styles.container}>
                <h1 className={styles.title}>[{t('title')}]</h1>
                <div className={styles.board}>
                    {board.map((row, r) => row.map((value, c) => <Tile key={`${r}-${c}`} value={value} />))}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }) {
    const game = getGame(2);

    return {
        props: {
            game: game || null,
            ...(await serverSideTranslations(locale, ['common', '2048-game'])),
        },
        revalidate: 60,
    };
}

export default Game2048;