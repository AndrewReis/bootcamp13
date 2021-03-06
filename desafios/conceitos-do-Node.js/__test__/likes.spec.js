const request = require('supertest');
const app = require('../src/app');

describe('Likes', () => {
  it('should be able to give a like to the repository.', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'http://github.com/AndrewReis/pharmas',
        title: 'pharmas',
        techs: ['Node', 'Typescript']
      });
      
    let response = await request(app)
      .post(`/repositories/${repository.body.id}/likes`);


    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app)
      .post(`/repositories/${repository.body.id}/likes`);


    expect(response.body).toMatchObject({
      likes: 2
    });

  });

  it('should not be able to like a repository that does not exist', async () => {
    await request(app).post('/repositories/123/likes').expect(400);
  });

});