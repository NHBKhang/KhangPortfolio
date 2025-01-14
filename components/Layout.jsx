import Titlebar from '../components/Titlebar'
import Sidebar from '../components/Sidebar'
import Explorer from '../components/Explorer'
import Bottombar from '../components/Bottombar'
import Tabsbar from './Tabsbar'
import styles from '../styles/Layout.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Chatbox from './Chatbox'
import { useGlobalContext } from '../configs/GlobalContext'
import { ToastContainer } from 'react-toastify'
import { clsx } from 'clsx'

const Layout = ({ children }) => {
  const { chatboxHidden, explorerHidden, enableAnimation } = useGlobalContext();
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
      {!chatboxHidden && <Chatbox />}
    </>
  )
}

export default Layout;
