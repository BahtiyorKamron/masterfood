create database masterfood;

create table steaks (
	steak_id int generated always as identity primary key,
	steak_name varchar(50) not null,
	steak_img varchar(256) not null,
	steak_price int not null
);

create table tables (
	table_id int generated always as identity primary key,
	table_number smallint not null
);

create table orders (
	order_id int generated always as identity primary key,
	table_id int not null references tables (table_id) on delete cascade,
	order_paid bool default false,
	order_created_at timestamptz default current_timestamp
);

create table order_sets (
	order_set_id int generated always as identity primary key,
	count smallint not null,
	steak_id int not null references steaks(steak_id) on delete cascade,
	order_id int not null references orders(order_id) on delete cascade,
	order_set_price int not null
);


insert into steaks (steak_name, steak_price, steak_img) values
('combo 1', 27000, 'https://picsum.photos/400'),
('lavash', 21000, 'https://picsum.photos/400'),
('haggi', 23000, 'https://picsum.photos/400'),
('Razliv', 6000, 'https://picsum.photos/400'),
('Cola 1', 8000, 'https://picsum.photos/400');


insert into tables (table_number) values (1);
insert into tables (table_number) values (2);
insert into tables (table_number) values (3);
insert into tables (table_number) values (4);


insert into orders (table_id) values (1);
insert into orders (table_id) values (3);

insert into order_sets (steak_id, order_id, count, order_set_price) values (6, 1, 2, 42000);
insert into order_sets (steak_id, order_id, count, order_set_price) values (7, 1, 1, 23000);

insert into order_sets (steak_id, order_id, count, order_set_price) values (1, 2, 1, 27000);
insert into order_sets (steak_id, order_id, count, order_set_price) values (5, 2, 1, 8000);



select 
	case
		when o.table_id is not null and o.order_paid = true then false
		when o.table_id is null then false
		else true
	end as table_busy
from orders o
right join tables t on t.table_id = o.table_id
where t.table_id = 2
order by o.order_created_at desc
limit 1


select
	distinct on(t.table_id)
	t.table_id,
	t.table_number,
	case
		when o.order_paid = true then false
		else true
	end as table_busy
from tables t
inner join (
	select
		*
	from orders
	order by order_created_at desc
) as o on o.table_id = t.table_id
order by t.table_id;



	-- select 
	-- 	o.order_id,
	-- 	t.table_id,
	-- 	case
	-- 		when o.table_id is not null and o.order_paid = true then false
	-- 		when o.table_id is null then false
	-- 		else true
	-- 	end as table_busy
	-- from orders o
	-- left join tables t on t.table_id = o.table_id
	-- order by o.order_created_at desc
