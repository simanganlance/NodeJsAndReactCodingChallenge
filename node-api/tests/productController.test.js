const request = require('supertest');
const app = require('../app');

describe('POST /api/products', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Test Product', description: 'Test Description', price: 10 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Test Product');
  });
});
// Add similar tests for other CRUD operations

