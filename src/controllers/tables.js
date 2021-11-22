const model = require('../models/tables.js')

const GET = async (req, res) => {
	res.json(await model.getTables())
}


const POST = async (req, res, next) => {
	try {
		let table = await model.insertTable(req.body)
		if(table) {
			res.json({
				status: 201,
				message: "The new table has been added!",
				data: table
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (req, res, next) => {
	try {
		let table = await model.deleteTable(req.body)
		if(table) {
			res.json({
				status: 201,
				message: "The table is deleted!",
				data: table
			})
		} else throw new Error("There is an error!")
	} catch(error) {
		return next(error)
	}
}

module.exports = {
	GET,
	POST,
	DELETE
}