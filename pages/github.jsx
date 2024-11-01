import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';
import CustomHead from '../components/Head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const GithubPage = ({ repos, user }) => {
  const { t } = useTranslation('github');

  return (
    <>
      <CustomHead page={'github'} />
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
      <div className={styles.container}>
        {repos.length > 0 ? (
          repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))
        ) : (
          <p>{t('noRepos')}</p> // Display message when there are no repositories
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

const token = process.env.GITHUB_TOKEN;

export async function getStaticProps({ locale }) {
  try {
    const userRes = await fetch(`https://api.github.com/users/NHBKhang`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!userRes.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/NHBKhang/repos?per_page=100`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!repoRes.ok) {
      throw new Error('Failed to fetch repositories');
    }

    let repos = await repoRes.json();
    repos = repos
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6);

    return {
      props: {
        repos,
        user,
        ...(await serverSideTranslations(locale, ['github']))
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        repos: [],
        user: null,
        ...(await serverSideTranslations(locale, ['github']))
      },
      revalidate: 10,
    };
  }
}

export default GithubPage;
