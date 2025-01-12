export const getPageTitle = (locale, title, params = {}) => {
    if (locale.trim() === '' || title.trim() === '') return;

    const titles = {
        en: {
            base: 'NHBKhang',
            default: 'Default',
            contact: 'Contact',
            about: 'About',
            home: 'Home',
            articles: 'Articles',
            projects: 'Projects',
            games: 'Games',
            settings: 'Settings',
            github: 'Github',
            article: `Article ${params.name || ''}`,
            project: `Project ${params.name || ''}`,
            game: `${params.name || ''}`,
            playingGame: `Playing ${params.name || ''}`,
            version: 'Version'
        },
        vi: {
            base: 'NHBKhang',
            default: 'Mặc định',
            contact: 'Liên hệ',
            about: 'Giới thiệu',
            articles: 'Bài đăng',
            projects: 'Dự án',
            games: 'Trò chơi',
            home: 'Trang chủ',
            settings: 'Cài đặt',
            github: 'Github',
            article: `Bài đăng ${params.name || ''}`,
            project: `Dự án ${params.name || ''}`,
            game: `${params.name || ''}`,
            playingGame: `Đang chơi ${params.name || ''}`,
            version: 'Phiên bản'
        },
    };

    const titlePart = titles[locale][title] || titles[locale].default;
    return `${titlePart} | ${titles[locale].base}`;
};
