import { useState } from 'react';
import ContactCode from '../components/ContactCode';
import styles from '../styles/ContactPage.module.css';
import emailjs from 'emailjs-com';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomHead from '../components/Head';

const ContactPage = () => {
  const { t } = useTranslation('contact'); // Assuming you have a 'contact' namespace for translations
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    const contactData = { name, email, subject, message };

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAIL_USER_ID;

      await emailjs.send(serviceId, templateId, contactData, userId);
      alert(t('responseReceived'));
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('errorResponse'));
    }
  };

  return (
    <>
      <CustomHead page="contact" />
      <div className={styles.container}>
        <div>
          <h3 className={styles.heading}>{t('socialContact')}</h3>
          <ContactCode />
        </div>
        <div>
          <h3 className={styles.heading}>{t('formContact')}</h3>
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
      ...(await serverSideTranslations(locale, ['contact'])),
    },
  };
}

export default ContactPage;
