import data from './data/games.json';

export const getGames = (page = 1, pageSize = null) => {
  pageSize = pageSize || 8;
  page = page || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalGames = data.length;
  const totalPages = Math.ceil(totalGames / pageSize);

  return {
    data: data.sort((a, b) => b.id - a.id).slice(startIndex, endIndex),
    total: totalGames,
    page,
    pageSize,
    totalPages,
    previous: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
  };
};

export const getGame = (id) => {
  return data.find((d) => d.id === Number(id)) || null;
};

export const getGameIds = () => {
  return data.map((d) => d.id);
};

export default (req, res) => {
  const games = getGames();
  res.json(games);
};