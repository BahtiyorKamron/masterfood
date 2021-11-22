const model = require('../models/steaks.js')

const GET = async (req, res) => {
	res.json(await model.getSteaks(req.params))
}

const POST = async (req, res, next) => {
	try {
		let steak = await model.insertSteak(req.body, req.fileName)
		if(steak) {
			res.json({
				status: 201,
				message: "The new steak has been added!",
				data: steak
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}


const PUT = async (req, res, next) => {
	try {
		let steak = await model.updateSteak(req.body)
		if(steak) {
			res.json({
				status: 201,
				message: "The new steak has been updated!",
				data: steak
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (req, res, next) => {
	try {
		let steak = await model.deleteSteak(req.body)
		if(steak) {
			res.json({
				status: 200,
				message: "The steak has been deleted!",
				data: steak
			})
		} else throw new Error("There is an error")
	} catch(error) {
		return next(error)
	}
}


module.exports = {
	GET,
	POST,
	PUT,
	DELETE
}