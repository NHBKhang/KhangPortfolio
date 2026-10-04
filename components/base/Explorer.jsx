import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ChevronRight from '../../components/icons/ChevronRight';
import styles from '../../styles/components/Explorer.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../configs/GlobalContext';

const explorerItems = [
  { name: 'home.jsx', path: '/', icon: 'icon/react_icon.svg' },
  { name: 'about.txt', path: '/about', icon: 'icon/txt_icon.png' },
  { name: 'contact.css', path: '/contact', icon: 'icon/css_icon.svg' },
  { name: 'projects.js', path: '/projects', icon: 'icon/js_icon.svg' },
  { name: 'articles.json', path: '/articles', icon: 'icon/json_icon.svg' },
  { name: 'github.md', path: '/github', icon: 'icon/markdown_icon.svg' },
  { name: 'games.html', path: '/games', icon: 'icon/html_icon.svg' },
  { name: 'her.love', path: '/love', icon: 'icon/love-folder.png' },
  { name: 'version.xml', path: '/versions', icon: 'icon/xml_icon.png' },
];

const Explorer = () => {
  const { explorerHidden, setExplorerHidden } = useGlobalContext();
  const [nhbkhangOpen, setNhbkhangOpen] = useState(true);
  const [width, setWidth] = useState(175);
  const [isResizing, setIsResizing] = useState(false);
  const router = useRouter();

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.max(e.clientX - 45, 150);
      setWidth(newWidth);
      if (newWidth == 150 && !explorerHidden) {
        setExplorerHidden(true)
      } else if (newWidth >= 150 && explorerHidden) {
        setExplorerHidden(false);
      }
    }
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className={styles.explorerWrapper}>
      {explorerHidden ? (
        <button
          className={styles.openExplorer}
          onMouseDown={() => {
            setWidth(150);
            setExplorerHidden(false);
          }}
          title="Open Explorer"
        >
        </button>
      ) : (
        <div
          className={styles.explorer}
          style={{ width: `${width}px` }}
        >
          <p className={styles.title}>Explorer</p>

          <div>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="nhbkhang-checkbox"
              checked={nhbkhangOpen}
              onChange={() => setNhbkhangOpen(!nhbkhangOpen)}
            />

            <label
              htmlFor="nhbkhang-checkbox"
              className={styles.heading}
            >
              <ChevronRight
                className={styles.chevron}
                style={
                  nhbkhangOpen
                    ? { transform: 'rotate(90deg)' }
                    : {}
                }
              />

              nhbkhang
            </label>

            <div
              className={styles.files}
              style={{
                display: nhbkhangOpen ? 'block' : 'none',
              }}
            >
              {explorerItems.map((item, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: 'none' }}
                  href={item.path}
                >
                  <div
                    className={`${styles.file} ${router.pathname === item.path
                      ? styles.active
                      : ''
                      }`}
                  >
                    <Image
                      src={`/img/${item.icon}`}
                      alt={item.name}
                      height={18}
                      width={18}
                    />

                    <p className={styles.name}>
                      {item.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {!explorerHidden ? (
        <div
          className={styles.resizer}
          onMouseDown={handleMouseDown}
        />
      ) : (
        <div className={styles.border}></div>
      )}
    </div>
  );
};

export default Explorer;