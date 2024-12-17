import { useLanguage } from '../configs/LanguageContext';
import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: {
      en: 'My website',
      vi: 'Website của tôi'
    },
    link: 'Khang Portfolio',
    href: 'https://khang-portfolio-vsc.vercel.app',
  },
  {
    social: 'Email',
    link: 'nhbkhang12@gmail.com',
    href: 'mailto:nhbkhang12@gmail.com',
  },
  {
    social: 'Github',
    link: 'NHBKhang',
    href: 'https://github.com/NHBKhang/',
  },
  {
    social: 'Linkedin',
    link: {
      vi: 'Không có',
      en: "Don't have"
    },
    href: '/',
  },
  {
    social: 'Twitter',
    link: 'Cocomilk',
    href: 'https://www.twitter.com',
  },
  {
    social: 'Facebook',
    link: 'Nguyễn Khang',
    href: 'https://www.facebook.com/profile.php?id=100012165398049',
  },
  {
    social: 'Instagram',
    link: {
      vi: 'Nghỉ chơi',
      en: 'End play'
    },
    href: 'https://www.instagram.com',
  },
  {
    social: 'Polywork',
    link: {
      vi: 'Cũng không có',
      en: "Don't have either"
    },
    href: 'https://www.polywork.com',
  },
  {
    social: 'Telegram',
    link: {
      vi: 'Quên rồi',
      en: 'I Forgot'
    },
    href: '/',
  },
  {
    social: 'Codepen',
    link: {
      vi: 'Không có nốt',
      en: "Also don't have"
    },
    href: 'https://codepen.io',
  },
  {
    social: 'Codesandbox',
    link: {
      vi: 'Là gì thế?',
      en: "What's that?"
    },
    href: 'https://codesandbox.io',
  },
];

const ContactCode = () => {
  const { language } = useLanguage();
  const animationSpeed = 0.075;

  return (
    <div className={styles.code}>
      <p className={styles.line} style={{ animationDelay: `${animationSpeed}s` }}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p
          className={styles.line} key={index}
          style={{ animationDelay: `${index * animationSpeed + 0.075}s` }}>
          &nbsp;&nbsp;&nbsp;{typeof item.social === 'string' ? item.social : item.social[language]}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {typeof item.link === 'string' ? item.link : item.link[language]}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p
          className={styles.line} key={index}
          style={{ animationDelay: `${index * animationSpeed + 0.675}s` }}>
          &nbsp;&nbsp;{typeof item.social === 'string' ? item.social : item.social[language]}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {typeof item.link === 'string' ? item.link : item.link[language]}
          </a>
          ;
        </p>
      ))}
      <p
        className={styles.line}
        style={{ animationDelay: `${(contactItems.length + 1) * animationSpeed}s` }}
      >&#125;</p>
    </div>
  );
};

export default ContactCode;
