CREATE DATABASE gamesdb;

\c gamesdb;

CREATE TABLE feeds (
    id serial PRIMARY KEY,
    feed VARCHAR,
    progress VARCHAR
);

-- INSERT INTO feeds (feed, progress) VALUES ('/api/v1/game/2020030176/feed/live', 'recording');
-- INSERT INTO feeds (feed, progress) VALUES ('/api/v1/game/2020030211/feed/live', 'recorded');