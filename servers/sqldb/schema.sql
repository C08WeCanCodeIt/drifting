drop table if exists users;

create table users (
    id int primary key not null auto_increment,
    userName varchar(32) unique,
    passHash binary(60),
    userType varchar(32),
);


/* create table if not exists message (
    messageID int primary key not null auto_increment,
    messageSubject varchar(255),
    messageBody  varchar(500),
    foreign key(userName) references user(userName)
);  */

# NOTE: kept running info MySQL error 1054 when creating a field for userStatus,
# Was unable to resolve error therefore the status is store in the user type
