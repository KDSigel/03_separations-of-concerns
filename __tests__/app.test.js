const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('Responds with order that matches id', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          quantity: 10
        });
      });
  });

  it('Updates the order in the database', () => {
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 11 })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          quantity: 11
        });
      });
  });

  it('deletes the order in the database that matches id', () => {
    return request(app)
      .delete('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({});
      });
  });


});
