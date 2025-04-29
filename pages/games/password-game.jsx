import { useEffect, useState } from "react";
import styles from "../../styles/pages/PasswordGame.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BackButton from "../../components/buttons/BackButton";
import CustomHead from "../../components/base/Head";
import { getGame } from "../api/games";
import { useLanguage } from "../../configs/LanguageContext";
import DialogBox from "../../components/boxes/DialogBox";
import { useGlobalContext } from "../../configs/GlobalContext";


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
        "vi": "Được rồi. Quy tắc rất đơn giản. Mật khẩu của bạn phải thỏa mãn các quy tắc được đưa ra bên dưới.",
        "en": "Okay. The rules is very simple. Your password must satisfy the rules given below."
    },
    {
        "vi": "Nếu vi phạm bất cứ quy tắc nào, bạn sẽ phải tạo lại mật khẩu để tiếp tục đến quy tắc tiếp theo.",
        "en": "If you violate any rule, you will have to recreate your password to continue to the next rule."
    },
    {
        "vi": "Hãy bắt đầu tạo mật khẩu của bạn!!!",
        "en": "Let's start creating your password!!!"
    },
    {
        "vi": "Bạn có chắc chắn về điều đó không?",
        "en": "Are you sure about that?"
    },
    {
        "vi": "Bạn có chắc chắn không muốn chơi trò chơi này không?",
        "en": "Are you sure you don't want to play the game?"
    },
    {
        "vi": "Bạn có thực sự muốn thoát khỏi trò chơi không?",
        "en": "Do you really want to exit the game?"
    }
];

const PasswordGame = ({ game }) => {
    const { t } = useTranslation('password-game');
    const { language } = useLanguage();
    const { setChatboxHidden, setExplorerHidden } = useGlobalContext();
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    });
    const [completedRules, setCompletedRules] = useState([]);
    const [uncompletedRules, setUncompletedRules] = useState([1]);
    const [currentRule, setCurrentRule] = useState(1);

    const [showDialog, setShowDialog] = useState(true);
    const [currentDialog, setCurrentDialog] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

    useEffect(() => {
        setChatboxHidden(showDialog);
        setExplorerHidden(true)
    }, [showDialog]);

    const handleNext = () => {
        if (currentDialog === dialog.length - 4) {
            setShowDialog(false);
        } else if (currentDialog > dialog.length - 4) {
            setCurrentDialog(0);
        } else {
            setCurrentDialog((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        setShowDialog(false);
    }

    const handleNo = () => {
        const start = dialog.length - 3;
        const end = dialog.length - 1;

        let newDialog;
        do {
            newDialog = Math.floor(Math.random() * (end - start + 1)) + start;
        } while (newDialog === currentDialog);

        setCurrentDialog(newDialog);
        setCancelCount((prev) => prev + 1);
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
            if (currentRule !== rules.length) {
                setCurrentRule((prev) => Math.min(prev + 1, rules.length));
                setUncompletedRules((prev) => [...prev, Math.min(currentRule + 1, rules.length)]);
            }
        }
    };

    const autoExpand = (textarea) => {
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <>
            <CustomHead page={'playingGame'} params={{ name: game.name[language] }} />
            <BackButton pathname={`/games/${game.id}`} callback={() => setExplorerHidden(false)} />
            <div className={styles.container}>
                {showDialog &&
                    <DialogBox
                        text={dialog[currentDialog][language]}
                        onNext={handleNext}
                        onSkip={handleSkip}
                        onCancel={handleNo}
                        isNext={currentDialog !== dialog.length - 4}
                        hideCancel={cancelCount === 10} />
                }
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
                    
                    {completedRules.length === 5 &&
                        <button className={styles.glitchBtn}>
                            {t('submit')}
                        </button>
                    }
                </div>
                <ul className={styles.rules}>
                    {rules
                        .filter(rule => uncompletedRules.includes(rule.id))
                        .sort((a, b) => uncompletedRules.indexOf(a.id) - uncompletedRules.indexOf(b.id))
                        .map((rule) => (
                            <li
                                key={rule.id}
                                data-aos="fade-up"
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
