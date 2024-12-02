import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '../configs/LanguageContext';
import { getPageTitle } from '../utils/getPageTitle';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const CustomHead = ({ page, params = {} }) => {
  const { t } = useTranslation('common');
  const { language } = useLanguage();

  return (
    <Head>
      <title>{getPageTitle(language, page, params)}</title>
      <meta name="description" content={t('description')} />
      <meta name="keywords" content={t('keywords')} />
      <meta property="og:title" content={t('ogTitle')} />
      <meta property="og:description" content={t('ogDescription')} />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://vscode-portfolio.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png" />
    </Head>
  );
};

CustomHead.defaultProps = {
  page: 'home',
  params: [],
};

CustomHead.propTypes = {
  page: PropTypes.string,
  params: PropTypes.array,
};

export default CustomHead;
