import { useEffect, useState } from 'react';
import styles from '../../styles/pages/Quiz30_4.module.css';
import CustomHead from '../../components/base/Head';
import BackButton from '../../components/buttons/BackButton';
import { useGlobalContext } from '../../configs/GlobalContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getGame } from '../api/games';
import { useLanguage } from '../../configs/LanguageContext';
import { useTranslation } from 'next-i18next';
import Confetti from '../../components/holidays/Confetti';

const questions = [
    {
        question: 'Ngày 30/04/1975 gắn liền với sự kiện gì?',
        options: [
            'Chiến dịch Điện Biên Phủ',
            'Giải phóng miền Nam, thống nhất đất nước',
            'Khởi nghĩa Nam Kỳ',
            'Chiến dịch Hồ Chí Minh'
        ],
        correctIndex: 2,
    },
    {
        question: 'Chiến dịch cuối cùng trong kháng chiến chống Mỹ là gì?',
        options: ['Chiến dịch Mậu Thân', 'Chiến dịch Tây Nguyên', 'Chiến dịch Hồ Chí Minh', 'Chiến dịch Đường 9 Nam Lào'],
        correctIndex: 3,
    },
    {
        question: 'Ai là người đọc tuyên bố chấm dứt chính quyền Sài Gòn ngày 30/04/1975?',
        options: ['Ngô Đình Diệm', 'Dương Văn Minh', 'Trần Thiện Khiêm', 'Nguyễn Văn Thiệu'],
        correctIndex: 2,
    },
    {
        question: 'Năm 1975 đánh dấu sự kiện gì tại Việt Nam?',
        options: [
            'Miền Nam hoàn toàn giải phóng',
            'Bắt đầu chiến tranh biên giới',
            'Hiệp định Paris được ký kết',
            'Cải cách ruộng đất'
        ],
        correctIndex: 1,
    },
    {
        question: 'Ngày 30/04 được gọi là gì tại Việt Nam?',
        options: ['Ngày Quốc Khánh', 'Ngày Lao động', 'Ngày Nhà giáo Việt Nam', 'Ngày Giải phóng miền Nam'],
        correctIndex: 4,
    },
]

const Quiz30_4 = ({ game }) => {
    const { setChatboxHidden, setExplorerHidden } = useGlobalContext();
    const { language } = useLanguage();
    const { t } = useTranslation('quiz30-4');
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const handleAnswer = (index) => {
        if (index === questions[current].correctIndex - 1) {
            setScore(score + 1)
        }
        if (current + 1 < questions.length) {
            setCurrent(current + 1)
        } else {
            setDone(true)
        }
    }

    useEffect(() => {
        setChatboxHidden(true);
        setExplorerHidden(true);
    }, []);

    return (
        <>
            <CustomHead page={'playingGame'} params={{ name: game.name[language] }} />
            <BackButton pathname={`/games/${game.id}`} callback={() => setExplorerHidden(false)} />
            <div className={styles.container}>
                <h1 className={styles.title}>🧠 {t('title')}</h1>
                {!done ? (
                    <div className={styles.quizCard}>
                        <h2 className={styles.question}>
                            Câu {current + 1}: {questions[current].question}
                        </h2>
                        <div className="space-y-2">
                            {questions[current].options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className={styles.optionButton}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.doneMessage}>
                        <p className={styles.doneMessageText}>🎉 Bạn hoàn thành quiz!</p>
                        <p className={styles.doneMessageSubText}>Điểm số: {score} / {questions.length}</p>
                        <button
                            onClick={() => {
                                setCurrent(0)
                                setScore(0)
                                setDone(false)
                            }}
                            className={styles.retryButton}
                        >
                            Chơi lại
                        </button>
                    </div>
                )}
            </div>

            {done && score / questions.length > 0.5 && <Confetti />}
        </>
    )
}

export async function getStaticProps({ locale }) {
    const game = getGame(3);

    return {
        props: {
            game: game || null,
            ...(await serverSideTranslations(locale, ['common', 'quiz30-4'])),
        },
        revalidate: 60,
    };
}

export default Quiz30_4;