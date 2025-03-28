import ThemeInfo from '../components/cards/ThemeInfo';
import styles from '../styles/pages/SettingsPage.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CustomHead from '../components/base/Head';
import { useLanguage } from '../configs/LanguageContext';
import { useGlobalContext } from '../configs/GlobalContext';

const SettingsPage = () => {
  const { t } = useTranslation(['settings', 'common']);
  const { changeLanguage, language } = useLanguage();
  const { enableAnimation, setEnableAnimation } = useGlobalContext();

  const handleLanguageChange = (event) => changeLanguage(event.target.value)
  const toggleAnimation = () => setEnableAnimation(prevState => !prevState)

  return (
    <>
      <CustomHead page={'settings'} />

      <h2>{t('common:settings')}</h2>
      <div className={styles.container}>
        <div className={styles.settingsContainer}>
          <div className={styles.settingsItem}>
            <p>{t('changeLanguage')}</p>
            <div className={styles.languageDropdown}>
              <select className={styles.select} value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
          </div>
          <div className={styles.settingsItem}>
            <p>{t('enableAnimation')}</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={enableAnimation}
                onChange={toggleAnimation}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      <h2>{t('manageThemes')}</h2>
      <div className={styles.container}>
        <ThemeInfo
          name="GitHub Dark"
          icon="/img/logo/github-dark.png"
          publisher="GitHub"
          theme="github-dark"
          description={t('githubDark')}
        />
        <ThemeInfo
          name="Dracula"
          icon="/img/logo/dracula.png"
          publisher="Dracula Theme"
          theme="dracula"
          description={t('dracula')}
        />
        <ThemeInfo
          name="Ayu Dark"
          icon="/img/logo/ayu.png"
          publisher="teabyii"
          theme="ayu-dark"
          description={t('ayuDark')}
        />
        <ThemeInfo
          name="Ayu Mirage"
          icon="/img/logo/ayu.png"
          publisher="teabyii"
          theme="ayu-mirage"
          description={t('ayuMirage')}
        />
        <ThemeInfo
          name="Nord"
          icon="/img/logo/nord.png"
          publisher="arcticicestudio"
          theme="nord"
          description={t('nord')}
        />
        <ThemeInfo
          name="Night Owl"
          icon="/img/logo/night-owl.png"
          publisher="sarah.drasner"
          theme="night-owl"
          description={t('nightOwl')}
        />
        <ThemeInfo
          name="Soft Light"
          icon="/img/logo/light.png"
          publisher="Light Theme"
          theme="soft-light"
          description={t('softLight')}
        />
        <ThemeInfo
          name="Bright Light"
          icon="/img/logo/light.png"
          publisher="Light Theme"
          theme="bright-light"
          description={t('brightLight')}
        />
        <ThemeInfo
          name="Muted Elegance"
          icon="/img/logo/muted-elegance.png"
          publisher="NHBKhang"
          theme="muted-elegance"
          description={t('mutedElegance')}
        />
        <ThemeInfo
          name="Pastel Dream"
          icon="/img/logo/pastel-dream.jpg"
          publisher="NHBKhang"
          theme="pastel-dream"
          description={t('pastelDream')}
        />
        <ThemeInfo
          name="SoundScape"
          icon="/img/logo/soundscape.png"
          publisher="SoundScape Theme"
          theme="soundscape"
          description={t('soundscape')}
        />
        <ThemeInfo
          name="Ethereal Glow"
          icon="/img/logo/ethereal-glow.png"
          publisher="NHBKhang"
          theme="ethereal-glow"
          description={t('ethereal-glow')}
        />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['settings', 'common']))
    },
  };
}

export default SettingsPage;
