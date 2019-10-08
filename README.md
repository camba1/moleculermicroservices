# MoleculerMicroServices

Project to create simple nodejs micro services using moleculer. The microservices will use NATS as the broker , running in a different container. IT will also use redis as the caching mechanism which will also be running in a d different container.


## NATS

- Pulling the image:
```docker pull nats```
- Starting NATS from command line
```docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats```
- Note that port :
  - 4222 is for clients.
  - 8222 is an HTTP management port for information reporting.
  - 6222 is a routing port for clustering.
- To check if service is up :
``` nc -c -v localhost 4222```
- Or check the monitoring end point in the server:
```http://localhost:8222```

## Redis

- Pulling the image:
```docker pull redis```
- Starting Redis from command line
```docker run --name some-redis -p 6379:6379 -d redis redis-server --appendonly yes```
- For persistence, ```add -v <volumeName>:/data```
- Using the cli:
```
  docker exec -it some-redis 'bash'
  redis-cli
```
- Note port 6379 is the default port for client access to Redis
-
