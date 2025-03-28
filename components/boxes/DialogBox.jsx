import React from 'react';
import styles from '../../styles/components/DialogBox.module.css';
import { useTranslation } from 'next-i18next';

const DialogBox = ({ text, onNext, onSkip, onCancel, isNext = true, hideCancel = false }) => {
    const { t } = useTranslation('common');

    return (
        <div className={styles.container}>
            <div className={styles.dialogBox}>
                <div className={styles.dialogContent}>
                    <p>{text}</p>
                </div>
                <div className={styles.buttonGroup}>
                    {hideCancel ? <div /> :
                        <button className={styles.noButton} onClick={onCancel}>
                            {t('no')}
                        </button>}
                    <div>
                        {isNext &&
                            <button className={styles.nextButton} onClick={onNext}>
                                {t('next')}
                            </button>}
                        <button className={styles.skipButton} onClick={onSkip}>
                            {isNext ? t('skip') : t('done')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;