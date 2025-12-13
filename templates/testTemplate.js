import request from 'supertest'
import app from '../app/app.js'

describe('/api/routingPath', () => {
    const restype= 'application/json; charset=utf-8'
    var token = null

    it('post /routingPath ', async () => {
      await request(app)
        .post('/api/routingPath')
        .set('Accept', 'application/json')
        .send({
            name: 'Something'
        })
        .expect('Content-Type', restype)
        .expect(201)

    })
    it('get /routingPath', async () => {
      await request(app)
        .get('/api/routingPath')
        .set('Accept', 'application/json')
        .expect('Content-Type', restype)
        .expect(200)
    })
    it('put /routingPath/:id', async () => {
      await request(app)
        .put('/api/routingPath/1')
        .set('Accept', 'application/json')
        .send({
            name: 'Another'
        })
        .expect('Content-Type', restype)
        .expect(200)
    })
    it('delete /routingPath/:id', async () => {
      await request(app)
        .delete('/api/routingPath/1')
        .set('Accept', 'application/json')
        .expect(200)
    })
})
