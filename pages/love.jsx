import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../components/base/Head';
import styles from '../styles/pages/Love.module.css';

const LovePage = () => {
    const { t } = useTranslation('love');

    return (
        <>
            <CustomHead page="love" />

            <main className={styles.lovePage}>

                {/* HERO */}
                <section className={styles.hero}>
                    <span className={styles.label}>
                        {t('hero.label')}
                    </span>

                    <h1>
                        {t('hero.title')}
                    </h1>

                    <p>
                        {t('hero.description')}
                    </p>

                    <div className={styles.scroll}>
                        ↓
                    </div>
                </section>


                {/* INTRO */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        01
                    </span>

                    <h2>
                        {t('intro.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>{t('intro.p1')}</p>
                        <p>{t('intro.p2')}</p>
                        <p>{t('intro.p3')}</p>
                    </div>
                </section>


                {/* HER */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        02
                    </span>

                    <h2>
                        {t('her.title')}
                    </h2>

                    <div className={styles.things}>
                        <div>
                            <span>01</span>
                            <p>{t('her.item1')}</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>{t('her.item2')}</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>{t('her.item3')}</p>
                        </div>

                        <div>
                            <span>04</span>
                            <p>{t('her.item4')}</p>
                        </div>
                    </div>
                </section>


                {/* LITTLE THINGS */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        03
                    </span>

                    <h2>
                        {t('littleThings.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>
                            {t('littleThings.description')}
                        </p>
                    </div>

                    <div className={styles.things}>
                        <div>
                            <span>01</span>
                            <p>{t('littleThings.item1')}</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>{t('littleThings.item2')}</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>{t('littleThings.item3')}</p>
                        </div>

                        <div>
                            <span>04</span>
                            <p>{t('littleThings.item4')}</p>
                        </div>
                    </div>
                </section>


                {/* QUOTE */}
                <section className={styles.quoteSection}>
                    <p>
                        "{t('quote.text')}"
                    </p>

                    <span>
                        — {t('quote.author')}
                    </span>
                </section>


                {/* ORDINARY DAYS */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        04
                    </span>

                    <h2>
                        {t('ordinaryDays.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>{t('ordinaryDays.p1')}</p>
                        <p>{t('ordinaryDays.p2')}</p>
                        <p>{t('ordinaryDays.p3')}</p>
                        <p>{t('ordinaryDays.p4')}</p>
                    </div>
                </section>


                {/* THANK YOU */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        05
                    </span>

                    <h2>
                        {t('thankYou.title')}
                    </h2>

                    <div className={styles.things}>
                        <div>
                            <span>01</span>
                            <p>{t('thankYou.item1')}</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>{t('thankYou.item2')}</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>{t('thankYou.item3')}</p>
                        </div>

                        <div>
                            <span>04</span>
                            <p>{t('thankYou.item4')}</p>
                        </div>
                    </div>
                </section>


                {/* MESSAGE */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        06
                    </span>

                    <h2>
                        {t('message.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>{t('message.p1')}</p>
                        <p>{t('message.p2')}</p>
                        <p>{t('message.p3')}</p>
                    </div>
                </section>


                {/* FUTURE */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        07
                    </span>

                    <h2>
                        {t('future.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>{t('future.p1')}</p>
                        <p>{t('future.p2')}</p>
                        <p>{t('future.p3')}</p>
                        <p>{t('future.p4')}</p>
                    </div>
                </section>


                {/* PROMISE */}
                <section className={styles.section}>
                    <span className={styles.number}>
                        08
                    </span>

                    <h2>
                        {t('promise.title')}
                    </h2>

                    <div className={styles.content}>
                        <p>{t('promise.p1')}</p>
                        <p>{t('promise.p2')}</p>
                        <p>{t('promise.p3')}</p>
                        <p>{t('promise.p4')}</p>
                        <p>{t('promise.p5')}</p>
                    </div>
                </section>


                {/* ONE THING */}
                <section className={styles.quoteSection}>
                    <span className={styles.number}>
                        09
                    </span>

                    <p>
                        {t('oneThing.text')}
                    </p>

                    <span>
                        {t('oneThing.description')}
                    </span>
                </section>


                {/* SECOND QUOTE */}
                <section className={styles.quoteSection}>
                    <p>
                        "{t('quoteTwo.text')}"
                    </p>

                    <span>
                        — {t('quoteTwo.author')}
                    </span>
                </section>


                {/* ENDING */}
                <section className={styles.ending}>
                    <div className={styles.heart}>
                        ♥
                    </div>

                    <span className={styles.label}>
                        {t('ending.label')}
                    </span>

                    <h2>
                        {t('ending.title')}
                    </h2>

                    <p>
                        {t('ending.description')}
                    </p>

                    <div className={styles.signature}>
                        — {t('ending.signature')}
                    </div>
                </section>

            </main>
        </>
    );
};


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ['love', 'common']
            )),
        },
    };
}


export default LovePage;