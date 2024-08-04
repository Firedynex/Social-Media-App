CREATE DATABASE SocialMediaDB;
USE SocialMediaDB;
CREATE TABLE users(
	email VARCHAR(255) NOT NULL,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pass VARCHAR(50) NOT NULL
);
CREATE TABLE normal_lists(
    list_name VARCHAR(50) NOT NULL,
    list_description VARCHAR(255) NOT NULL,
    list_content VARCHAR(255) NOT NULL,
    author VARCHAR(20) NOT NULL,
    list_url VARCHAR(100) NOT NULL
);
CREATE TABLE events(
    organizer VARCHAR(100),
    event_name VARCHAR(50),
    event_location VARCHAR(70),
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_description VARCHAR(255) NOT NULL,
    email_reminder BOOLEAN,
    cars_needed BOOLEAN,
    author VARCHAR(20) NOT NULL,
)
SELECT * FROM users;