DROP DATABASE IF EXISTS eventful;
CREATE DATABASE eventful;

\c eventful

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT,
  date_time VARCHAR,
  venue_name TEXT,
  venue_address TEXT,
  city_name VARCHAR,
  region VARCHAR,
  country_name VARCHAR,
  event_url TEXT,
  user_id INTEGER REFERENCES users (id)
);


