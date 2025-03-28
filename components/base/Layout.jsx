import Titlebar from './Titlebar';
import Sidebar from './Sidebar';
import Explorer from './Explorer';
import Bottombar from './Bottombar';
import Tabsbar from './Tabsbar';
import styles from '../../styles/components/Layout.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Chatbox from '../boxes/Chatbox';
import { useGlobalContext } from '../../configs/GlobalContext';
import { ToastContainer } from 'react-toastify';
import { clsx } from 'clsx';
import BirthdayConfetti from "../holidays/BirthdayConfetti";
import { useHoliday } from '../../configs/HolidayContext';

const Layout = ({ children }) => {
  const { chatboxHidden, explorerHidden } = useGlobalContext();
  const { isBirthday } = useHoliday();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      if (isBirthday) {
        document.documentElement.setAttribute(
          "data-theme",
          "birthday"
        );
      } else {
        document.documentElement.setAttribute(
          "data-theme",
          theme
        );
      }
    }
  }, []);

  // set scroll to top of main content on url pathname change
  const router = useRouter()
  useEffect(() => {
    const main = document.getElementById('main-editor')
    main.scrollTop = 0
  }, [router.pathname, router.query]);

  return (
    <>
      <Titlebar />
      <div className={styles.main}>
        <Sidebar />
        <Explorer />
        <div style={{ width: '100%' }}>
          <Tabsbar />
          <main id="main-editor" className={clsx(
            styles.content,
            explorerHidden && styles.explorerHiddenContent
          )}>
            {children}
          </main>
        </div>
      </div>
      <Bottombar />

      <ToastContainer />
      <BirthdayConfetti />
      {!chatboxHidden && <Chatbox />}
    </>
  )
}

export default Layout;
