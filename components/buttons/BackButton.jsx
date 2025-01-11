import { useRouter } from "next/router";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/Button.module.css";

const BackButton = ({ pathname = null }) => {
    const router = useRouter();

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
            <span>Back</span>
        </button>
    );
};

export default BackButton;
