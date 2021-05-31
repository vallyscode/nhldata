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


