create table if not exists users (
    id int primary key not null auto_increment,
    userName  varchar(254) unique,
    passHash binary(60),
    type varchar(255),
    status varchar(255)
);

insert into users (userName, passHash, type, status) values ("default", "\0", "member", "test");