import { useEffect } from "react";
import Layout from "../components/Layout";
import Head from "../components/Head";
import "../styles/globals.css";
import "../styles/themes.css";
import { GlobalProvider } from "../configs/GlobalContext";
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from "../configs/LanguageContext";

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
