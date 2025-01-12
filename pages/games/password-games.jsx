import { useState } from "react";
import styles from "../../styles/PasswordGame.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BackButton from "../../components/buttons/BackButton";
import CustomHead from "../../components/Head";
import { getGame } from "../api/games";
import { useLanguage } from "../../configs/LanguageContext";
import DialogBox from "../../components/DialogBox";


const rules = [
    { id: 1, check: (pw) => pw.length >= 5 },
    { id: 2, check: (pw) => /[A-Z]/.test(pw) },
    { id: 3, check: (pw) => /\d/.test(pw) },
    { id: 4, check: (pw) => /[!@#$%^&*]/.test(pw) },
    { id: 5, check: (pw) => /.*(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba).*/i.test(pw), },

];

const dialog = [
    {
        "vi": "Chào mừng bạn đến với trò chơi! Bạn đã sẵn sàng bắt đầu chưa?",
        "en": "Welcome to the game! Are you ready to get started?"
    },
    {
        "vi": "",
        "en": ""
    }
];

const PasswordGame = ({ game }) => {
    const { t } = useTranslation('password-game');
    const { language } = useLanguage();
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    });
    const [completedRules, setCompletedRules] = useState([]);
    const [uncompletedRules, setUncompletedRules] = useState([1]);
    const [currentRule, setCurrentRule] = useState(1);

    const [showDialog, setShowDialog] = useState(true);
    const [currentDialog, setCurrentDialog] = useState(0);

    const handleNext = () => {
        if (currentDialog === dialog.length - 1) {
            setShowDialog(false);
        } else {
            setCurrentDialog((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        setShowDialog(false);
    }

    const handleNo = () => {

    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const newValidation = { ...validation };
        const newCompletedRules = [];
        const newUncompletedRules = [];

        rules.slice(0, currentRule).forEach((rule) => {
            newValidation[rule.id] = rule.check(value);
            if (newValidation[rule.id]) {
                newCompletedRules.push(rule.id);
            } else {
                newUncompletedRules.push(rule.id);
            }
        });

        setValidation(newValidation);
        setCompletedRules(newCompletedRules);
        setUncompletedRules(newUncompletedRules);

        if (newValidation[currentRule]) {
            setCurrentRule((prev) => Math.min(prev + 1, rules.length));
            setUncompletedRules((prev) => [...prev, Math.min(currentRule + 1, rules.length)])
        }
    };

    const autoExpand = (textarea) => {
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const isPasswordValid = Object.values(validation).every(Boolean);

    return (
        <>
            <CustomHead page={'playingGame'} params={{ name: game.name[language] }} />
            <BackButton pathname={'/games/1'} />

            {showDialog ?
                <>
                    <DialogBox
                        text={dialog[currentDialog][language]}
                        onNext={handleNext}
                        onSkip={handleSkip}
                        onCancel={handleNo}
                        isNext={currentDialog !== dialog.length - 1} />
                </> :
                <div className={styles.container}>
                    <h1 className={styles.title}>[{t('title')}]</h1>
                    <div className={styles.brutalistContainer}>
                        <textarea
                            type="text"
                            value={password}
                            onChange={(e) => {
                                handleInputChange(e);
                                autoExpand(e.target);
                            }}
                            rows={1}
                            placeholder={t('inputPlaceholder')}
                            className={`${styles.brutalistInput} ${styles.smoothType}`}
                        />
                        <label className={styles.brutalistLabel}>{t('inputLabel')}</label>
                    </div>
                    <div className={styles.strengthMeter}>
                        <div
                            className={styles.strengthBar}
                            style={{
                                width: `${(Object.values(validation).filter(Boolean).length / rules.length) * 100}% !important`,
                                backgroundColor: isPasswordValid ? "green" : "red",
                            }}
                        ></div>
                    </div>
                    <ul className={styles.rules}>
                        {rules
                            .filter(rule => uncompletedRules.includes(rule.id))
                            .sort((a, b) => uncompletedRules.indexOf(a.id) - uncompletedRules.indexOf(b.id))
                            .map((rule) => (
                                <li
                                    key={rule.id}
                                    className={`${styles.rule} ${validation[rule.id] ? styles.valid : styles.invalid}`}
                                >
                                    <p>
                                        {`${validation[rule.id] ? "✅" : "❌"} ${t('rule')} ${rule.id}`}
                                    </p>
                                    <p>
                                        {t(`rules.${rule.id}`)}
                                    </p>
                                </li>
                            ))}
                        {rules
                            .filter(rule => completedRules.includes(rule.id))
                            .sort((a, b) => completedRules.indexOf(a.id) - completedRules.indexOf(b.id))
                            .map((rule) => (
                                <li
                                    key={rule.id}
                                    className={`${styles.rule} ${validation[rule.id] ? styles.valid : styles.invalid}`}
                                >
                                    <p>
                                        {`${validation[rule.id] ? "✅" : "❌"} ${t('rule')} ${rule.id}`}
                                    </p>
                                    <p>
                                        {t(`rules.${rule.id}`)}
                                    </p>
                                </li>
                            ))}
                    </ul>
                </div>
            }
        </>
    );
};

export async function getStaticProps({ locale }) {
    const game = getGame(1);

    return {
        props: {
            game: game || null,
            ...(await serverSideTranslations(locale, ['common', 'password-game'])),
        },
        revalidate: 60,
    };
}

export default PasswordGame;
