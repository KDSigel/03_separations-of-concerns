const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const OrderService = require('../lib/services/OrderService');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('test Order.js queries', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async() => {
    await OrderService.createOrder(2);
  });

  it('creating an order', async() => {
    const order = await Order.insert(10);
    expect(order).toEqual({
      id: '2',
      quantity: 10
    });
  });

  it('should get item by id', async() => {
    const order = await Order.getById(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });

  it('should get all items', async() => {
    const order = await Order.getAllOrders();
    expect(order).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      quantity: expect.any(Number)
    }]));
  });

  it('should update item by id', async() => {
    const order = await Order.update(1, 10);
    expect(order).toEqual({
      id: '1',
      quantity: 10
    });
  });

  it('should delete item by id', async() => {
    const order = await Order.deleteOrder(1);
    expect(order).toEqual({
      id: '1',
      quantity: 2
    });
  });

});
