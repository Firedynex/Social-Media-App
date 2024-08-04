CREATE DATABASE SocialMediaDB;
USE SocialMediaDB;
CREATE TABLE users(
	email VARCHAR(255),
    username VARCHAR(20),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pass VARCHAR(50)
);
CREATE TABLE normal_lists(
    list_name VARCHAR(50),
    list_description VARCHAR(255),
    list_content VARCHAR(255),
    author VARCHAR(20),
    list_url VARCHAR(100)
);
CREATE TABLE events(
    organizer VARCHAR(100),
    event_name VARCHAR(50),
    event_location VARCHAR(70),
    event_date DATE,
    event_time TIME,
    event_description VARCHAR(255),
    email_reminder BOOLEAN,
    cars_needed BOOLEAN,
    author VARCHAR(20),
)
SELECT * FROM users;