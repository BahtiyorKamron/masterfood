const express = require('express')
const server = express()
const multer = require('multer')
const path = require('path')
const steakRouter = require('./routes/steaks.js')
const orderRouter = require('./routes/orders.js')
const tableRouter = require('./routes/tables.js')
const storage = multer.diskStorage({
  	destination: function (req, file, cb) {
    	cb(null, path.join(__dirname, 'uploads'))
  	},
  	filename: function (req, file, cb) {
    	const fileName = (Date.now() + '-' + Math.round(Math.random() * 1E9)) + file.originalname
    	req.fileName = '/uploads/' + fileName
    	cb(null, fileName)
  	}
})

const upload = multer({ storage: storage })

// middlewares
server.use( express.json() )
server.use( upload.single('file') )
server.use( '/uploads', express.static( path.join(__dirname, 'uploads') ) )

// handling routes
server.use( steakRouter )
server.use( orderRouter )
server.use( tableRouter )


server.use( (error, req, res, next) => {
	return res.status(400).json({
		status: 400,
		message: error.message
	})
} )

server.listen( process.env.PORT || 4500, () => console.log('*4500') )