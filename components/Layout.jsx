import Titlebar from '../components/Titlebar';
import Sidebar from '../components/Sidebar';
import Explorer from '../components/Explorer';
import Bottombar from '../components/Bottombar';
import Tabsbar from './Tabsbar';
import styles from '../styles/Layout.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Chatbox from './Chatbox';
import { useGlobalContext } from '../configs/GlobalContext';
import { ToastContainer } from 'react-toastify';
import { clsx } from 'clsx';
import BirthdayConfetti from "./holidays/BirthdayConfetti";
import { useHoliday } from '../configs/HolidayContext';

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
  }, [router.pathname]);

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
