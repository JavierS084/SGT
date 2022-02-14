CREATE DATABASE sgt;

USE sgt;

CREATE TABLE users(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    superuser TINYINT(1)


);


CREATE TABLE forms(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(250) NOT NULL,
    others VARCHAR (250),
    cargo VARCHAR(250) NOT NULL,
    dependencia VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE


);


DESCRIBE users;




UPDATE users SET superuser=0 WHERE username  = 'juan123';