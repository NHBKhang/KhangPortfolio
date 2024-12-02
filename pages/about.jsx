import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../components/Head';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <>
      <CustomHead page="about" />
      <h3 style={{ color: "red", padding: 5 }}>{t('aboutMe')}</h3>
      <div style={{ padding: 15 }}>
        <p> - {t('fullName')}</p>
        <p> - {t('birthDate')}</p>
        <p> - {t('birthPlace')}</p>
        <p> - {t('gender')}</p>
        <p> - {t('nationality')}</p>
        <p> - {t('hometown')}</p>
        <p> - {t('hobbies')}</p>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'common'])),
    },
  };
}

export default AboutPage;
