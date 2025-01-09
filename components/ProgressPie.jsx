import React, { useEffect, useState } from 'react';
import styles from '../styles/ProgressPie.module.css';
import { useGlobalContext } from '../configs/GlobalContext';

const ProgressPie = ({ progress }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const { enableAnimation } = useGlobalContext();

    useEffect(() => {
        if (enableAnimation) {
            let start = 0;
            const step = Math.ceil(progress.percentage / (1000 / 20));
            const interval = setInterval(() => {
                start += step;
                if (start >= progress.percentage) {
                    start = progress.percentage;
                    clearInterval(interval);
                }
                setCurrentPercentage(start);
            }, 20);
    
            return () => clearInterval(interval);
        } else {
            setCurrentPercentage(progress.percentage);
        }
    }, [progress.percentage]);

    return (
        <div className={styles.pieContainer}>
            <div
                className={styles.pie}
                style={{
                    background: `conic-gradient(
                    var(--accent-color) ${currentPercentage}%, 
                    #ddd ${currentPercentage}% 100%)`,
                }}
            >
                <div className={styles.center}>
                    <div className={styles.percentage}>{currentPercentage}%</div>
                    <div className={styles.skill}>{progress.skill}</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressPie;
