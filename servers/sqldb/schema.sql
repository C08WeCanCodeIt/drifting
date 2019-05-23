drop table users

create table if not exists users (
    id int primary key not null auto_increment,
    userName  varchar(254) unique,
    passHash binary(60),
    userType varchar(255),
    isSuspended bool
);