\c gamesdb;

CREATE TABLE players (
    id serial PRIMARY KEY,
    playerid integer,
    playername VARCHAR,
    teamid integer,
    teamname VARCHAR,
    playerage integer,
    playernumber VARCHAR,
    playerposition VARCHAR,
    assists integer,
    goals integer,
    hits integer,
    penaltyminutes integer
);