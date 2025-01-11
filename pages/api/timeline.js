import data from './data/timeline.json';

export const getEducationTimeline = (language = 'en') => {
    return data['education'][language];
};

export const getExperienceTimeline = (language = 'en') => {
    return data['experience'][language];
};