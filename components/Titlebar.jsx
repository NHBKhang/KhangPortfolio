import Image from 'next/image';
import styles from '../styles/Titlebar.module.css';
import { useState } from 'react';
import { useGlobalContext } from '../configs/GlobalContext';
import { useLanguage } from '../configs/LanguageContext';

const Titlebar = () => {
  const { chatboxHidden, setChatboxHidden } = useGlobalContext();
  const { toggleLanguage, language } = useLanguage();
  const [isDropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({ [key]: !prev[key] }));
  };

  const closeDropdown = (key) => {
    setDropdownOpen(prev => ({ ...prev, [key]: false }));
  };

  const fileDropdown = [
    {
      label: 'New File',
      action: () => closeDropdown('file'),
      shortcut: 'Key'
    },
    {
      label: 'Open File',
      action: () => closeDropdown('file'),
    },
  ];

  const editDropdown = [
    {
      label: 'Change Language',
      action: () => {
        closeDropdown('edit');
        toggleLanguage();
      },
      shortcut: language.toUpperCase()
    },
  ];

  const viewDropdown = [
    {
      label: chatboxHidden ? 'Enable Chatbox' : 'Disable Chatbox',
      action: () => {
        setChatboxHidden(!chatboxHidden);
        closeDropdown('view');
      },
      shortcut: 'Ctrl+Shift+C'
    },
  ];

  return (
    <section className={styles.titlebar}>
      <Image
        src="/img/vscode_icon.svg"
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
          style={{ left: '65px' }}
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
          {viewDropdown.map((item, index) => (
            <div key={index} onClick={() => item.action()}>
              <p>{item.label}</p>
              {item.shortcut && <p>{item.shortcut}</p>}
            </div>
          ))}
        </div>

        <p>Go</p>

        <p>Run</p>

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
