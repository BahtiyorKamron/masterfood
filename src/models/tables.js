const db = require('../lib/postgres.js')

const TABLES = `
	select
	distinct on(t.table_id)
	t.table_id,
	t.table_number,
	case
		when o.order_paid = true then false
		when o.order_paid is null then false
		else true
	end as table_busy
	from tables t
	left join (
		select
			*
		from orders
		order by order_created_at desc
	) as o on o.table_id = t.table_id
	order by t.table_id;
`

const INSERT_TABLE = `
	INSERT INTO tables (
		table_number
	) VALUES ($1)
	RETURNING *
`

const DELETE_TABLE = `
	DELETE FROM tables
	WHERE table_id = $1
	RETURNING *
`

const getTables = () => {
	return db(TABLES)
}

const insertTable = ({ table_number }) => {
	return db(INSERT_TABLE, table_number)
}

const deleteTable = ({ table_id }) => {
	return db(DELETE_TABLE, table_id)
}

module.exports = {
	getTables,
	insertTable,
	deleteTable
}