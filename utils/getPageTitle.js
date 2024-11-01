export const getPageTitle = (locale, title, params = {}) => {
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
            article: `Article ${params.id || ''}`,
            project: `Project ${params.id || ''}`,
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
            article: `Bài đăng ${params.id || ''}`,
            project: `Dự án ${params.id || ''}`,
            version: 'Phiên bản'
        },
    };

    const titlePart = titles[locale][title] || titles[locale].default;
    return `${titles[locale].base} | ${titlePart}`;
};
