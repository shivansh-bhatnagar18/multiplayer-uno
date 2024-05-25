const request = require('supertest');
const app = require('../src/index');

describe('GET /', () => {
    it('responds with "Hello from the backend!"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello from the backend!');
    });
});