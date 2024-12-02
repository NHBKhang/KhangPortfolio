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
            settings: 'Settings',
            github: 'Github',
            article: `Article ${params.name || ''}`,
            project: `Project ${params.name || ''}`,
            version: 'Version'
        },
        vi: {
            base: 'NHBKhang',
            default: 'Mặc định',
            contact: 'Liên hệ',
            about: 'Giới thiệu',
            articles: 'Bài đăng',
            projects: 'Dự án',
            home: 'Trang chủ',
            settings: 'Cài đặt',
            github: 'Github',
            article: `Bài đăng ${params.name || ''}`,
            project: `Dự án ${params.name || ''}`,
            version: 'Phiên bản'
        },
    };

    const titlePart = titles[locale][title] || titles[locale].default;
    return `${titles[locale].base} | ${titlePart}`;
};
