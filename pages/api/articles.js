import data from './articles.json';

export const getArticles = () => {
  return data;
};

export const getArticle = (id) => {
  return data.find(d => d.id === Number(id)) || null;
};

export const getArticleIds = () => {
  return data.map(d => d.id);
}

export default (req, res) => {
  const articles = getArticles();
  res.json(articles);
};