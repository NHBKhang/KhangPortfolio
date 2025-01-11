import Image from 'next/image';
import styles from '../styles/Titlebar.module.css';
import { useState } from 'react';
import { useGlobalContext } from '../configs/GlobalContext';
import { useLanguage } from '../configs/LanguageContext';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Titlebar = () => {
  const { chatboxHidden, setChatboxHidden } = useGlobalContext();
  const { toggleLanguage } = useLanguage();
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const { t } = useTranslation('common');
  const router = useRouter();

  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({ [key]: !prev[key] }));
  };

  const closeDropdown = (key) => {
    setDropdownOpen(prev => ({ ...prev, [key]: false }));
  };

  const fileDropdown = [
    {
      label: t('settings'),
      action: () => {
        router.push('/settings');
        closeDropdown('file');
      },
    }
  ];

  const editDropdown = [
    {
      label: t('changeLanguage'),
      action: () => {
        closeDropdown('edit');
        toggleLanguage();
      },
      shortcut: 'Alt+L'
    },
  ];

  const runDropdown = [
    {
      label: chatboxHidden ? t('enableChatbox') : t('disableChatbox'),
      action: () => {
        setChatboxHidden(!chatboxHidden);
        closeDropdown('run');
      },
      shortcut: 'Ctrl+Shift+C'
    },
  ];

  return (
    <section className={styles.titlebar}>
      <Image
        src="/img/icon/vscode_icon.svg"
        alt="VSCode Icon"
        height={15}
        width={15}
        className={styles.icon}
      />
      <div className={styles.items}>
        <p onClick={() => toggleDropdown('file')}>File</p>
        <div
          className={`${styles.dropdown} ${isDropdownOpen.file && styles.show}`}
          style={{ left: '30px' }}
          onMouseLeave={() => closeDropdown('file')}
        >
          {fileDropdown.map((item, index) => (
            <div key={index} onClick={() => item.action()}>
              <p>{item.label}</p>
              {item.shortcut && <p>{item.shortcut}</p>}
            </div>
          ))}
        </div>

        <p onClick={() => toggleDropdown('edit')}>Edit</p>
        <div
          className={`${styles.dropdown} ${isDropdownOpen.edit && styles.show}`}
          style={{ left: '66px' }}
          onMouseLeave={() => closeDropdown('edit')}
        >
          {editDropdown.map((item, index) => (
            <div key={index} onClick={() => item.action()}>
              <p>{item.label}</p>
              {item.shortcut && <p>{item.shortcut}</p>}
            </div>
          ))}
        </div>

        <p onClick={() => toggleDropdown('view')}>View</p>
        <div
          className={`${styles.dropdown} ${isDropdownOpen.view && styles.show}`}
          style={{ left: '105px' }}
          onMouseLeave={() => closeDropdown('view')}
        >
        </div>

        <p onClick={() => toggleDropdown('go')}>Go</p>
        <div
          className={`${styles.dropdown} ${isDropdownOpen.go && styles.show}`}
          style={{ left: '150px' }}
          onMouseLeave={() => closeDropdown('go')}
        >
        </div>

        <p onClick={() => toggleDropdown('run')}>Run</p>
        <div
          className={`${styles.dropdown} ${isDropdownOpen.run && styles.show}`}
          style={{ left: '180px' }}
          onMouseLeave={() => closeDropdown('run')}
        >
          {runDropdown.map((item, index) => (
            <div key={index} onClick={() => item.action()}>
              <p>{item.label}</p>
              {item.shortcut && <p>{item.shortcut}</p>}
            </div>
          ))}
        </div>

        <p>Terminal</p>

        <p>Help</p>

      </div>
      <p className={styles.title}>NHBKhang - Visual Studio Code</p>
      <div className={styles.windowButtons}>
        <span className={styles.minimize}></span>
        <span className={styles.maximize}></span>
        <span className={styles.close}></span>
      </div>
    </section>
  );
};

export default Titlebar;
