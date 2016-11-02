DROP DATABASE IF EXISTS eventful;
CREATE DATABASE eventful;

\c eventful

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

-- CREATE TABLE events (
--   id SERIAL PRIMARY KEY,
--   body VARCHAR NOT NULL,
--   user_id INTEGER REFERENCES users (id)
-- );
