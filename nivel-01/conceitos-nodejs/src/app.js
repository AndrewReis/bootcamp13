const express = require('express');
const cors = require('cors');

const generateId = require('./generateId');

const app = express();
app.use(express.json());
app.use(cors());
const repositories = [];

function logRequest(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method}] ${url}`;
  console.log(logLabel);

  next();
}

app.use(logRequest);

app.get('/projects', (request, response ) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter(repos => repos.title.includes(title))
    : repositories;

  return response.json(results);
});

app.post('/projects', (request, response ) => {
  const { title, owner, techs } = request.body;

  const project = {
    id: generateId(),
    title,
    owner,
    techs
  };

  repositories.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response ) => {
  const { id } = request.params;
  const { title, techs } = request.body;

  const projectIndex = repositories.findIndex(repository => repository.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({message: 'Project not found.'})
  }

  const project = {
    id,
    title,
    techs,
  };

  repositories[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response ) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(repository => repository.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({message: 'Project not found.'})
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();

});

app.listen(3333, () => console.log('Server running.'));