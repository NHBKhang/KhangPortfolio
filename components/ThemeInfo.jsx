import Image from 'next/image';
import styles from '../styles/ThemeInfo.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useGlobalContext } from '../configs/GlobalContext';

const ThemeInfo = ({ icon, name, publisher, theme, description }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [active, setActive] = useState(false);
  const { currentTheme, setCurrentTheme } = useGlobalContext();
  const { t } = useTranslation('settings');

  useEffect(() => {
    setActive(currentTheme === theme);
  }, [currentTheme]);

  const setTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className={styles.container} title={description} onClick={toggleDescription}>
      <Image src={icon} alt={name} height={100} width={100} />
      <div className={styles.info}>
        <div>
          <h3>{name}</h3>
          <h5>{publisher}</h5>
        </div>
        {showDescription && (
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        )}
        <button onClick={(event) => {
          event.stopPropagation();
          setTheme(theme);
        }} className={active && styles.muted}>
          {active ? t('currentColor') : t('setColor')}
        </button>
      </div>
    </div>
  );
};

export default ThemeInfo;
