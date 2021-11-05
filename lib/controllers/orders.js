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

  .get('/', async(req, res, next) => {
    try {
      const order = await OrderService.getAll();
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
  })

  .put('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrderService.update(id, req.body.quantity);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrderService.delete(id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  });
