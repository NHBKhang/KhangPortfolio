import "../styles/globals.css";
import "../styles/themes.css";
import "aos/dist/aos.css"; import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GlobalProvider } from "../configs/GlobalContext";
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from "../configs/LanguageContext";
import Layout from "../components/base/Layout";
import Head from "../components/base/Head";
import { HolidayProvider} from "../configs/HolidayContext";

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <GlobalProvider>
        <HolidayProvider>
          <Layout>
            <Head title={pageProps.title} />
            <Component {...pageProps} />
          </Layout>
        </HolidayProvider>
      </GlobalProvider>
    </LanguageProvider>
  );
}

export default appWithTranslation(MyApp);
