const router = require('express').Router()
const controller = require('../controllers/steaks.js')

router
	  .get('/steaks', controller.GET)
	  .get('/steaks/:steakId', controller.GET)
	  .post('/steaks', controller.POST)
	  .put('/steaks', controller.PUT)
	  .delete('/steaks', controller.DELETE)

module.exports = router