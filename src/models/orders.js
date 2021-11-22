const db = require('../lib/postgres.js')

const GET_ORDERS = `
	select
		o.order_id,
		o.order_paid,
		o.order_created_at,
		t.table_number,
		sum(os.order_set_price * os.count) as order_total_price,
		json_agg(os) as order_sets
	from orders o
	natural join tables t
	inner join (
	select
		order_id,
		order_set_price,
		order_set_id,
		count,
		steak_name
	from order_sets 
	natural join steaks
	) as os on os.order_id = o.order_id
	where 
	case
		when $1 > 0 then o.table_id = $1
		else true 
	end
	group by o.order_id, t.table_number
`

const INSERT_ORDER = `
	INSERT INTO orders (
		table_id
	) VALUES ($1)
	RETURNING order_id
`

const INSERT_ORDER_SET = `
	INSERT INTO order_sets (
		order_id,
		steak_id,
		count,
		order_set_price
	) select $1, $2, $3, s.steak_price from steaks s
	where s.steak_id = $2
	RETURNING *
`

const CHECK_TABLE = `
	select 
		o.order_id,
		case
			when o.table_id is not null and o.order_paid = true then false
			when o.table_id is null then false
			else true
		end as table_busy
	from orders o
	right join tables t on t.table_id = o.table_id
	where t.table_id = $1
	order by o.order_created_at desc
	limit 1
`

const PAY_ORDER = `
	UPDATE orders SET 
		order_paid = true
	WHERE table_id = $1
	RETURNING *
`

const DELETE_ORDER_SET = `
	DELETE FROM order_sets
	WHERE order_set_id = $1
	RETURNING *
`

const DELETE_ORDER = `
	DELETE FROM orders
	WHERE order_id = $1
	RETURNING *
`

const PUT_ORDER = `
	WITH old_data as (
		SELECT
			count
		FROM order_sets
		WHERE order_set_id = $1
	) UPDATE order_sets os SET
		count = old_data.count + $2
	FROM old_data
	WHERE order_set_id = $1
	RETURNING os.*
`

const getOrders = ({ tableId = 0 }) => db(GET_ORDERS, tableId)
const insertOrder = async ({ steak_id, table_id, count }) => {
	let tableBusy = await db(CHECK_TABLE, table_id)
	if(!tableBusy[0].table_busy) {
		let [newOrder] = await db(INSERT_ORDER, table_id)
		let [newOrderSet] = await db(INSERT_ORDER_SET, newOrder.order_id, steak_id, count )
		return newOrderSet
	} else {
		let [newOrderSet] = await db(INSERT_ORDER_SET, tableBusy[0].order_id, steak_id, count)
		return newOrderSet
	}
}

const payOrder = async ({ table_id }) => {
	return db(PAY_ORDER, table_id)
}

const deleteOrderSet = async ({ order_set_id }) => {
	return db(DELETE_ORDER_SET, order_set_id)
}

const deleteOrder = async ({ order_id }) => {
	return db(DELETE_ORDER, order_id)
}

const putOrder = async ({ order_set_id, count }) => {
	return db(PUT_ORDER, order_set_id, count)
}


module.exports = {
	deleteOrderSet,
	insertOrder,
	deleteOrder,
	getOrders,
	putOrder,
	payOrder
}