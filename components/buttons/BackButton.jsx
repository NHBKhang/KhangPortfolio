import { useRouter } from "next/router";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/Button.module.css";
import { useTranslation } from "next-i18next";

const BackButton = ({ pathname = null }) => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleBack = () => {
        if (pathname) {
            router.push(pathname);
        } else {
            router.back();
        }
    };

    return (
        <button onClick={handleBack} className={styles.backButton}>
            <ArrowUturnLeftIcon className={styles.icon} />
            <span>{t('back')}</span>
        </button>
    );
};

export default BackButton;
