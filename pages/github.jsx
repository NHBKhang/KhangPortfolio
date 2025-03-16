import { useEffect, useState } from 'react';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/cards/RepoCard';
import styles from '../styles/GithubPage.module.css';
import CustomHead from '../components/base/Head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useNotification } from '../utils/toast';
import axios from 'axios';
import Loading from '../components/other/Loading';

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const GithubPage = () => {
  const { t } = useTranslation(['github', 'common']);
  const sendNotification = useNotification();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      setLoading(true);
      try {
        console.info(token)
        const { data: userData } = await axios.get('https://api.github.com/users/NHBKhang', {
          headers: { Authorization: `token ${token}` },
        });
        setUser(userData);

        const { data: repoData } = await axios.get('https://api.github.com/users/NHBKhang/repos?per_page=100', {
          headers: { Authorization: `token ${token}` },
        });

        const sortedRepos = repoData
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 6);

        setRepos(sortedRepos);
      } catch (err) {
        console.error(err);
        sendNotification({ message: t('githubErrorMessage') }, 'error');
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error {error.response?.data?.message}</p>;

  return (
    <>
      <CustomHead page={'github'} />
      {user && (
        <div className={styles.user}>
          <div>
            <Image
              src={user.avatar_url}
              className={styles.avatar}
              alt={user.login}
              width={50}
              height={50}
            />
            <h3 className={styles.username}>{user.login}</h3>
          </div>
          <div>
            <h3>{user.public_repos} {t('repositories')}</h3>
          </div>
          <div>
            <h3>{user.followers} {t('followers')}</h3>
          </div>
        </div>
      )}
      <div className={styles.container}>
        {repos.length > 0 ? (
          repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p>{t('noRepos')}</p>
        )}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username='NHBKhang'
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['github', 'common'])),
    },
  };
}

export default GithubPage;
