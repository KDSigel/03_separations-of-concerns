const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {

  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );
    const order = await Order.insert(quantity);
    return order;
  }

  static async getOrderById(id) {
    const order = await Order.getById(id);
    return order;
  }

  static async getAll() {
    const order = await Order.getAllOrders();
    return order;
  }

  static async update(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order updated! Your id is: ${id} and the new quantity is: ${quantity}`
    );
    const order = await Order.update(id, quantity);
    return order;
  }

  static async delete(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `your order id: ${id} has been removed`
    );
    const order = await Order.deleteOrder(id);
    return order;
  }

};
