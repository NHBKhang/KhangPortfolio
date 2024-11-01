import data from '../data/versions.json';

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

export default (req, res) => {
  const versions = getVersions();
  res.json(versions);
};