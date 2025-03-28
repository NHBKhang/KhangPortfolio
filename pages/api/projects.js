import data from './data/projects.json';

export const getProjects = (page = 1, pageSize = null) => {
  pageSize = pageSize || 8;
  page = page || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalProjects = data.length;
  const totalPages = Math.ceil(totalProjects / pageSize);

  return {
    data: data.sort((a, b) => b.id - a.id).slice(startIndex, endIndex),
    total: totalProjects,
    page,
    pageSize,
    totalPages,
    previous: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
  };
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