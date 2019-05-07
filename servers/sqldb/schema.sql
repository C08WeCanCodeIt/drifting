create table if not exists users (
    id int primary key not null auto_increment,
    userName varchar(32) unique,
    passHash binary(60),
    userType varchar(32),
    userStatus varchar(32)
);

create table if not exists message (
    messageID int primary key not null auto_increment,
    messageSubject varchar(255),
    messageBody  varchar(500),
    foreign key(userName) references user(userName)
)