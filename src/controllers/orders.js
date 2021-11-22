const model = require('../models/orders.js')

const GET = async (req, res) => {
	console.log(req.query)
	res.json(await model.getOrders(req.query))
}


const POST = async (req, res, next) => {
	try {
		let order = await model.insertOrder(req.body)
		if(order) {
			res.json({
				status: 201,
				message: "The new order has been added!",
				data: order
			})
		} else throw new Error("The table is already busy!")
	} catch(error) {
		return next(error)
	}
}

const PAY = async (req, res, next) => {
	try {
		let payment = await model.payOrder(req.body)
		if(payment) {
			res.json({
				status: 201,
				message: "The order is paid!",
				data: payment
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}

const DELETE_ORDER_SET = async (req, res, next) => {
	try {
		let orderSet = await model.deleteOrderSet(req.body)
		if(orderSet) {
			res.json({
				status: 201,
				message: "The order set is deleted!",
				data: orderSet
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (req, res, next) => {
	try {
		let order = await model.deleteOrder(req.body)
		if(order) {
			res.json({
				status: 201,
				message: "The order is deleted!",
				data: order
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}

const PUT = async (req, res, next) => {
	try {
		let order = await model.putOrder(req.body)
		if(order) {
			res.json({
				status: 201,
				message: "The order is changed!",
				data: order
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}


module.exports = {
	DELETE_ORDER_SET,
	DELETE,
	GET,
	POST,
	PAY,
	PUT
}