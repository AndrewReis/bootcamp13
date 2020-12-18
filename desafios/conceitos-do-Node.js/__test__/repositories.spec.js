const request = require('supertest');
const app = require('../src/app');
const { isUuid } = require('uuidv4');

describe('Repositories', () => {
  it('should be able to create a new repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: 'http://github.com/AndrewReis/pharmas',
        title: 'pharmas',
        techs: ['Node', 'Typescript']
      });
      
      expect(isUuid(response.body.id)).toBe(true);

      expect(response.body).toMatchObject({
        url: 'http://github.com/AndrewReis/pharmas',
        title: 'pharmas',
        techs: ['Node', 'Typescript'],
        likes: 0
      });
  });

  it('should be able to list the repositories', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'http://github.com/AndrewReis/pharmas',
        title: 'pharmas',
        techs: ['Node', 'Typescript']
      });
      
      const response = await request(app)
        .get('/repositories');
      
      

      expect(response.body).toEqual(
        expect.arrayContaining(
          [
            {
              id: repository.body.id,
              url: 'http://github.com/AndrewReis/pharmas',
              title: 'pharmas',
              techs: ['Node', 'Typescript'],
              likes: 0
            },
          ]
      ))
  });

  it('should be able to update repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url:"http://github.com/AndrewReis/pharmas",
        title: "pharmas",
        techs: ['ReactJs', 'typescript']
      });

    const response = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        url:"http://github.com/AndrewReis/pharmas",
        title: "pharmas",
        techs: ['ReactJs', 'typescript', 'nodejs']
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      url:"http://github.com/AndrewReis/pharmas",
      title: "pharmas",
      techs: ['ReactJs', 'typescript', 'nodejs']
    });
  
  });

  it('should not be able to update repository does not exist', async () => {
    await request(app).put('/repositories/123').expect(400);
  });

  it('should not be able to update repository likes manually', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url:"http://github.com/AndrewReis/pharmas",
        title: "pharmas",
        techs: ['ReactJs', 'typescript']
      });

    const response = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        likes: 15
      });

    expect(response.body).toMatchObject({
      likes: 0
    })
  });

  it('should be able to delete repository.', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url:"http://github.com/AndrewReis/pharmas",
        title: "pharmas",
        techs: ['ReactJs', 'typescript']
      });
    
    await request(app)
      .delete(`/repositories/${repository.body.id}`)
      .expect(204);
    
    const repositories = await request(app)
      .get('/repositories');
    
    const isRepositoryExist = repositories.body.find(repos => {
      repos.id === repository.body.id
    });
    
    expect(isRepositoryExist).toBe(undefined);
  });

  it('should not be able to remove repository if not exist.', async () => {
    await request(app).delete('/repositories/123').expect(400);
  });
});