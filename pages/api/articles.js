import data from './data/articles.json';

export const getArticles = (page = 1, pageSize = null) => {
  pageSize = pageSize || 8;
  page = page || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalArticles = data.length;
  const totalPages = Math.ceil(totalArticles / pageSize);

  return {
    data: data.sort((a, b) => b.id - a.id).slice(startIndex, endIndex),
    total: totalArticles,
    page,
    pageSize,
    totalPages,
    previous: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
  };
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