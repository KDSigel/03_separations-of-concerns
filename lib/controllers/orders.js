const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()

  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body.quantity);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      res.send(order);
    } catch(err) {
      next(err);
    }


    
  });
