create database tienda_online;

use tienda_online;

create table clientes (
	id int  primary key,
	nombre varchar(100) not null,
	correo varchar(100) not null,
	fecha_registro date default (current_date)
);

create table productos (
	id int primary key,
	nombre varchar(100) not null,
	precio decimal(10,2),
	cantidad int,
	categoria varchar(100)	
);


create table ordenes (
	id int primary key,
	nombre varchar(100) not null,
	fecha_orden date default (current_date),
	estado varchar(50),
	id_cliente int,
	foreign key (id_cliente) references clientes(id)
);



alter table clientes add column telefono varchar(100);

alter table productos modify column cantidad decimal(10,2);



create index idx_correo on clientes (correo);

create index idx_categoria on productos(categoria);


alter table ordenes  add constraint fk_ordenes_productos foreign key (id) references productos(id); 


create view vista_clientes_ordenes AS
select 
    c.nombre AS nombre_cliente,
    c.correo AS correo_electronico,
    p.nombre AS nombre_producto,
    o.fecha_orden AS fecha_orden
from ordenes o
join clientes c ON o.id_cliente = c.id_cliente
join productos p ON o.id_producto = p.id;


truncate table productos;


drop table transacciones;
drop table ordenes;
drop database tienda_online;