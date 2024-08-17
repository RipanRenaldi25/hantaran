# HANTARAN PROJECT APPLICATION

This application is a simple web application for managing orders, payments, and user management for hantaran project.

## HOW TO USE

Before you start this application, there's requirement to run this project:

1. node.js v20++
2. docker

###

With Docker

1. move to docker directory

```
cd misc/docker
```

2. Build image of the application and run it on the container using docker compose

```
docker compose up -d --build

```

3. See the application container port

```
docker compose ps
```

4. Move your directory to parent directory (Optional)

```
cd ../../
```

Here's the full description on what port the application is running:

1. frontend development: localhost:3000
2. frontend production: localhost:8080
3. backend development: localhost:5001
4. backend production: localhost:5000

For api (backend) documentation route, you can access it on `/` endpoint

### Without Docker

You can run application locally by following this instruction

1. Move to docker directory

```
cd misc/docker
```

2. Copy the environment variable for each application

```
cp .env ../../app/frontend/.env &&
cp .env ../../app/backend/.env &&
cd ../../
```

3. (Backend) Install dependencies and run the application

```
cd app/backend && npm install &&
npm run start:dev &&
cd ../../
```

4. (Frontend) Install dependencies and run the application

```
cd app/frontend && npm instal && npm run start
```

## Used technology

1. Express JS
2. React
3. @reduxjs/toolkit
4. Typescript
