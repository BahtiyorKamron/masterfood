const path = require('path')
require('dotenv').config({ path: path.join( __dirname, '.env' ) })

const pgConfig = {
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
}

module.exports = {
	pgConfig
}
