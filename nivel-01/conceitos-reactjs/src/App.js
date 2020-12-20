import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import api from './services/api';
import back from './assets/gitflow.png'

function App(){

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      console.log(response.data)
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject(){
    const response = await api.post('/projects',{
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Andrew Reis',
      techs: ['Java', 'Spring']
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return(
    <>
      <Header title="Homepage" />
      <img src={back} width="300px" alt=""/>
      <ul>
        {
          projects.map(project => (
            <li key={project.id} > {project.title} </li>
          ))
        }
      </ul>

      <button type="button" onClick={handleAddProject} >add projeto</button>
    </>
  );
}

export default App;