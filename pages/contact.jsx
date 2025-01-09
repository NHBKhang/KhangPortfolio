import { useState } from 'react';
import ContactCode from '../components/ContactCode';
import styles from '../styles/ContactPage.module.css';
import emailjs from 'emailjs-com';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../components/Head';
import { notify, useNotification } from '../utils/toast';

const ContactPage = () => {
  const { t } = useTranslation('contact');
  const sendNotification = useNotification();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    const contactData = { name, email, subject, message, country };

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAIL_USER_ID;


    try {
      const promise = emailjs.send(serviceId, templateId, contactData, userId);
      await notify.promise(promise,
        {
          pending: t('responseSending'),
          success: t('responseReceived'),
          error: t('errorResponse')
        }
      );

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setEmail('');
      setCountry('');
    } catch (error) {
      console.error(error);
      sendNotification({ message: t('errorResponse') }, 'error');
    }
  };

  return (
    <>
      <CustomHead page="contact" />
      <div className={styles.container}>
        <div>
          <h3
            className={styles.heading}
            data-aos="fade-right"
          >{t('socialContact')}</h3>
          <ContactCode />
        </div>
        <div>
          <h3
            className={styles.heading}
            data-aos="fade-right"
          >{t('formContact')}</h3>
          <form className={styles.form} onSubmit={submitForm}>
            <div className={styles.flex}>
              <div>
                <label htmlFor="name">{t('nameLabel')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">{t('emailLabel')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="country">{t('countryLabel')}</label>
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="subject">{t('subjectLabel')}</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="message">{t('messageLabel')}</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">{t('sendButton')}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['contact', 'common'])),
    },
  };
}

export default ContactPage;
