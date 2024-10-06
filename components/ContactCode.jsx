import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'my website',
    link: 'Khang Portfolio',
    href: 'https://khang-vsc-portfolio.netlify.app/',
  },
  {
    social: 'email',
    link: 'nhbkhang12@gmail.com',
    href: 'mailto:nhbkhang12@gmail.com',
  },
  {
    social: 'github',
    link: 'NHBKhang',
    href: 'https://github.com/NHBKhang/',
  },
  {
    social: 'linkedin',
    link: 'không có',
    href: '/',
  },
  {
    social: 'twitter',
    link: 'Cocomilk',
    href: 'https://www.twitter.com',
  },
  {
    social: 'facebook',
    link: 'Nguyễn Khang',
    href: 'https://www.facebook.com/profile.php?id=100012165398049',
  },
  {
    social: 'instagram',
    link: 'Nghỉ chơi',
    href: 'https://www.instagram.com',
  },
  {
    social: 'polywork',
    link: 'Không có',
    href: 'https://www.polywork.com',
  },
  {
    social: 'telegram',
    link: 'Quên rồi',
    href: '/',
  },
  {
    social: 'codepen',
    link: 'không có nốt',
    href: 'https://codepen.io',
  },
  {
    social: 'codesandbox',
    link: 'là gì thế?',
    href: 'https://codesandbox.io',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
