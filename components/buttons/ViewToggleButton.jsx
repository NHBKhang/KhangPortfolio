import { FiList, FiGrid } from "react-icons/fi";
import styles from "../../styles/components/Button.module.css";

const ViewToggleButton = ({ currentView, setCurrentView }) => {
    return (
        <div className={styles.toggleContainer}>
            <div className={styles.toggleButtons}>
                <button
                    onClick={() => setCurrentView(0)}
                    className={`${styles.button} ${!currentView ? styles.active : ""}`}
                    title="Grid View"
                >
                    <FiGrid size={18} />
                </button>
                <button
                    onClick={() => setCurrentView(1)}
                    className={`${styles.button} ${currentView ? styles.active : ""}`}
                    title="List View"
                >
                    <FiList size={18} />
                </button>
            </div>
        </div>
    )
}

export default ViewToggleButton;