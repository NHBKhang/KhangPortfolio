import ThemeInfo from '../components/ThemeInfo';
import styles from '../styles/SettingsPage.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CustomHead from '../components/Head';

const SettingsPage = () => {
  const { t } = useTranslation('settings');

  return (
    <>
      <CustomHead page={'settings'} />
      <h2>{t('manageThemes')}</h2>
      <div className={styles.container}>
        <ThemeInfo
          name="GitHub Dark"
          icon="/img/github-dark.png"
          publisher="GitHub"
          theme="github-dark"
          description={t('githubDark')}
        />
        <ThemeInfo
          name="Dracula"
          icon="/img/dracula.png"
          publisher="Dracula Theme"
          theme="dracula"
          description={t('dracula')}
        />
        <ThemeInfo
          name="Ayu Dark"
          icon="/img/ayu.png"
          publisher="teabyii"
          theme="ayu-dark"
          description={t('ayuDark')}
        />
        <ThemeInfo
          name="Ayu Mirage"
          icon="/img/ayu.png"
          publisher="teabyii"
          theme="ayu-mirage"
          description={t('ayuMirage')}
        />
        <ThemeInfo
          name="Nord"
          icon="/img/nord.png"
          publisher="arcticicestudio"
          theme="nord"
          description={t('nord')}
        />
        <ThemeInfo
          name="Night Owl"
          icon="/img/night-owl.png"
          publisher="sarah.drasner"
          theme="night-owl"
          description={t('nightOwl')}
        />
        <ThemeInfo
          name="Soft Light"
          icon="/img/light.png"
          publisher="Light Theme"
          theme="soft-light"
          description={t('softLight')}
        />
        <ThemeInfo
          name="Bright Light"
          icon="/img/light.png"
          publisher="Light Theme"
          theme="bright-light"
          description={t('brightLight')}
        />
        <ThemeInfo
          name="Muted Elegance"
          icon="/img/muted-elegance.png"
          publisher="NHBKhang"
          theme="muted-elegance"
          description={t('mutedElegance')}
        />
        <ThemeInfo
          name="Pastel Dream"
          icon="/img/pastel-dream.jpg"
          publisher="NHBKhang"
          theme="pastel-dream"
          description={t('pastelDream')}
        />
        <ThemeInfo
          name="Colorful"
          icon="/img/colorful.jpg"
          publisher="NHBKhang"
          theme="colorful"
          description={t('colorful')}
        />
        <ThemeInfo
          name="SoundScape"
          icon="/img/soundscape.png"
          publisher="SoundScape Theme"
          theme="soundscape"
          description={t('soundscape')}
        />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['settings']))
    },
  };
}

export default SettingsPage;
