import data from './data/versions.json';

export const getVersions = (lang = 'en') => {
  return data[lang];
};

export const getVersion = (id, lang = 'en') => {
  return data[lang].find((d) => d.id === Number(id)) || null;
};

export const getNewestVersion = (lang = 'en') => {
  const versions = data[lang];
  if (!versions || versions.length === 0) return null;

  const newestVersion = versions[versions.length - 1];

  return newestVersion;
};

export const getPreviousVersion = (currentVersionId, lang = 'en') => {
  const versions = getVersions(lang);
  const currentIndex = versions.findIndex((v) => v.id === Number(currentVersionId));

  if (currentIndex > 0) {
    return versions[currentIndex - 1];
  }

  return null;
};

export const getNextVersion = (currentVersionId, lang = 'en') => {
  const versions = getVersions(lang);
  const currentIndex = versions.findIndex((v) => v.id === Number(currentVersionId));

  if (currentIndex >= 0 && currentIndex < versions.length - 1) {
    return versions[currentIndex + 1];
  }

  return null;
};

export default (req, res) => {
  const versions = getVersions();
  res.json(versions);
};
