import Link from 'next/link';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function HomePage() {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1>{t('label')}</h1>
      </div>
      <div className={styles.foreground}>
        <div className={styles.content}>
          <h1 className={styles.name}>Nguyễn Hà Bảo Khang</h1>
          <h6 className={styles.bio}>{t('fullStackDeveloper')}</h6>
          <Link href="/projects">
            <button className={styles.button}>{t('viewWork')}</button>
          </Link>
          <Link href="/contact">
            <button className={styles.outlined}>{t('contactMe')}</button>
          </Link>
        </div>
        <Illustration className={styles.illustration} />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}