const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const OrderService = require('../lib/services/OrderService');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('OrderService tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async() => {
    await OrderService.createOrder(2);
  });

  it('should create an item', async() => {
    const order = await OrderService.createOrder(2);
    expect(order).toEqual({ id: '2', quantity: 2 });
  });

  it('should get item by id', async() => {
    const order = await OrderService.getOrderById(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });

  it('should get all items', async() => {
    const order = await OrderService.getAll();
    expect(order).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      quantity: expect.any(Number)
    }]));
  });

  it('should update item by id', async() => {
    const order = await OrderService.update(1, 10);
    expect(order).toEqual({
      id: '1',
      quantity: 10
    });
  });

  it('should delete item by id', async() => {
    const order = await OrderService.delete(1);
    expect(order).toEqual({
      id: '1',
      quantity: 2
    });
  });

});
