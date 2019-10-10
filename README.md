# Moleculer MicroServices

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

## Traefik

Traefix automatically detects docker containers and configures itself witht he appropriate route and services. In the end, Traefix will serve as our reverse proxie to the world.

  - Pulling the image:
```docker pull traefik```
- To work with traefik, we need to setup a docker-compose service:

```yaml
traefik:
  image: traefik
  # Enables the web UI and tells Traefik to listen to docker
  command: --api.insecure=true --providers.docker
  ports:
    # The HTTP port
    - "80:80"
    # The Web UI (enabled by --api.insecure=true)
    - "8080:8080"
  volumes:
    # So that Traefik can listen to the Docker events
    - /var/run/docker.sock:/var/run/docker.sock
```
- Access traefix the following address for the dashoard:
  http://localhost:8080/
- Access the rawdata at :
  http://localhost:8080/api/rawdata

## Moleculer

To run moleculer dev based on the init project in a docker container with NATS, Redis and traefik:
- Create an mpm dockerfile and install:

```
  RUN npm i moleculer --save
  RUN npm i moleculer-cli -g
```
- Create the image and run the container
- Log into the container
- Run the initializer:
```moleculer init project <project_name>```
- Bash will ask if you want a transporter, a cache, etc... Pick the options as needed
- This will create all the necessary files
- Stop and remove container
- Create a docker-compose file with 4 services:
  - Nodejs with the moleculer code in a mapped volume
  - Redis with port 6379 open
  - Nats with ports with at least port 4222 open, can also open 8222 and 6222
  - Traefik with ports 80 and 8080 open
- Change the moleculer.config.js:
  - For NATS configuration change from NATS to nats://nats:4222
  - For redis configruation change from REDIS to redis://redis:6379
- Run docker-compose up
- login to the container, cd to the project directory and do ```npm run dev```
- Go to localhost:3000 to access the application

To run the production version of the application go to the project root directory inside the  main directory and run ```docker-compose up --build -d```
