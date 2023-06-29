
create database pruebatecnica;

\c pruebatecnica;

create table Asistente(
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    tipoDocumento varchar(9) not null,
    NumeroDocumento varchar(10) not null,
    telefono numeric(10,0) not null,
    email varchar(50) not null,
    estado boolean not null,
    primary key(tipoDocumento,NumeroDocumento)
);

alter table asistente 
    add constraint document_type_ch check (tipodocumento in ('CC','CE','Pasaporte'));

insert into asistente values ('Ivan Santiago','Chauta Gaviria','CC','1010031429',3506632164,'santiagochauta@gmail.com','true');

