const router = require('express').Router()
const controller = require('../controllers/tables.js')

router
	  .get('/tables', controller.GET)
	  .post('/tables', controller.POST)
	  .delete('/tables', controller.DELETE)

module.exports = router