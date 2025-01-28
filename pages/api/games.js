import data from './data/games.json';

export const getGames = () => {
  return data;
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