const router = require('express').Router()
const controller = require('../controllers/orders.js')

router
	  .get('/orders', controller.GET)
	  .post('/orders', controller.POST)
	  .post('/orders/payment', controller.PAY)
	  .delete('/orders/orderSet', controller.DELETE_ORDER_SET)
	  .delete('/orders', controller.DELETE)
	  .put('/orders', controller.PUT)

module.exports = router