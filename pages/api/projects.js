import data from './data/projects.json';

export const getProjects = () => {
  return data;
};

export const getProject = (id) => {
  return data.find((d) => d.id === Number(id)) || null;
};

export const getProjectIds = () => {
  return data.map((d) => d.id);
};

export default (req, res) => {
  const projects = getProjects();
  res.json(projects);
};