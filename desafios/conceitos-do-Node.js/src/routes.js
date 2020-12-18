const { Router } = require('express');
const { uuid } = require('uuidv4');
const routes = Router();

const repositories = [];

routes.get('/repositories', (request, response) => {
  return response.json(repositories);
});

routes.post('/repositories', (request, response) => {
  const { url, title, techs } = request.body;
  const likes = 0;
  const project = {
    id: uuid(),
    url,
    title,
    techs,
    likes
  }

  repositories.push(project);

  return response.json(project);
});

routes.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  }
  
  const updatedRepository = { id, url, title, techs, likes: repositories[repoIndex].likes };

  repositories[repoIndex] = updatedRepository;

  return response.json(updatedRepository);
});

routes.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  }
  
  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

routes.post('/repositories/:id/likes', (request, response) => {
  const { id } = request.params;

  const findIndexRepository = repositories.findIndex(repos => repos.id === id);
  // const repository = repositories.find(repos => repos.id === id);

  if(findIndexRepository < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  }
  
  const repository = repositories[findIndexRepository];

  const newRepository = {
    id: repository.id,
    title: repository.title,
    url: repository.url,
    techs: repository.techs,
    likes: repository.likes + 1,
  };

  repositories[findIndexRepository] = newRepository;

  return response.json(newRepository);
});

module.exports = routes;