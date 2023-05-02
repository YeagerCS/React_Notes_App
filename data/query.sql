drop if exists Notes;

create database Notes;
use Notes;

create table notes(
    id int identity(1, 1) not null primary key,
    title text,
    content text,
    date date,
    users_id int null,
    foreign key (users_id) references users(id)
);

create table users(
    id int identity(1, 1) not null primary key,
    username varchar(255),
    password varchar(255),
    token varchar(512)
)