# Desigh
The idea is simple, loop on schedule endpoint until there will be some live game, then verify if that game is not already recording/recorded and fire a recorder process with feed link as argument. Recorder process will mark the feed link as recording and loops feed and save player details untill state changes to game over.

![Design](solution/design.png)

# Setup
Prepare monitor process
```bash
cd monitor && npm install
```
Prepare recorder process
```bash
cd recorder && npm install
```

# Database
Starting dockerized postgres
```bash
docker run --rm \
    --name gamesdb \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=mypassword \
    -e POSTGRES_USER=myuser \
    -v ${PWD}/database/data:/var/lib/postgresql/data \
    -v ${PWD}/database/initdb:/docker-entrypoint-initdb.d \
    postgres
```

# PG Admin
Postgres Admin web console
```bash
docker run --rm -p 5050:5050 thajeztah/pgadmin4
```

# Launching
Launch monitor
```bash
cd monitor && npm start
```



