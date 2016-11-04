INSERT INTO events (title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
