docker pull postgres

docker run --name postgres-dev -e POSTGRES_PASSWORD=admin -p 5432:5432 -d --rm postgres