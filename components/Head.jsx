import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Nguyen Ha Bao Khang is an avid full stack web developer building websites and applications you'd love to use"
      />
      <meta
        name="keywords"
        content="nguyen ha bao khang, nhbkhang, khang, web developer portfolio, nhbkhang web developer, nhbkhang developer, nhbkhang portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Bao Khang's Portfolio" />
      <meta
        property="og:description"
        content="A full-stack developer building websites that you'd like to use."
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://vscode-portfolio.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel='icon' href='https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png'/>
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'NHBKhang',
};
