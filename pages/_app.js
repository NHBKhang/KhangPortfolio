import "../styles/globals.css";
import "../styles/themes.css";
import "aos/dist/aos.css";import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { GlobalProvider } from "../configs/GlobalContext";
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from "../configs/LanguageContext";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Head from "../components/Head";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute(
        "data-theme",
        theme
      );
    }
  }, []);

  return (
    <LanguageProvider>
      <GlobalProvider>
        <Layout>
          <Head title={pageProps.title} />
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </LanguageProvider>
  );
}

export default appWithTranslation(MyApp);
