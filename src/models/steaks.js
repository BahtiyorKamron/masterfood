const db = require('../lib/postgres.js')

const GET_STEAKS = `
	SELECT 
		*
	FROM steaks
	WHERE
	CASE
		WHEN $1 > 0 THEN steak_id = $1
		ELSE true
	END
`

const DELETE_STEAK = `
	DELETE FROM steaks
	WHERE steak_id = $1
	RETURNING *
`

const INSERT_STEAK = `
	INSERT INTO steaks (
		steak_name,
		steak_price,
		steak_img
	) values ($1, $2, $3)
	RETURNING *
`

const UPDATE_STEAK = `
	WITH old_data as (
		SELECT
			steak_id,
			steak_name,
			steak_price
		FROM steaks
		WHERE steak_id = $1
	) UPDATE steaks s SET
		steak_name = (
		CASE
			WHEN length($2) > 1 THEN $2
			ELSE o.steak_name
		END),
		steak_price = (
		CASE
			WHEN $3 > 0 THEN $3
			ELSE o.steak_price
		END)
	FROM old_data o
	WHERE s.steak_id = $1
	RETURNING s.steak_id, 
	s.steak_name as new_name, o.steak_name as old_name, 
	s.steak_price as new_price, o.steak_price as old_price
`

const getSteaks   = ({ steakId = 0 })  =>  db(GET_STEAKS, steakId)
const deleteSteak = ({ steak_id })     =>  db(DELETE_STEAK, steak_id)

const insertSteak = ({ steak_name, steak_price }, steak_img) => {
	return db(INSERT_STEAK, steak_name, steak_price, steak_img)
}

const updateSteak = ({ steak_id, steak_price = 0, steak_name = '' }) => {
	return db(UPDATE_STEAK, steak_id, steak_name, steak_price)
}


module.exports = {
	getSteaks,
	updateSteak,
	insertSteak,
	deleteSteak
}