# HANTARAN PROJECT APPLICATION

This application is a simple web application for managing orders, payments, and user management for hantaran project.

## HOW TO USE

Before you start this application, there's requirement to run this project:

1. node.js v20++
2. docker

###

With Docker

#### Development Environment

For development purpose, you need to install dependencies in both front end and backend

1. Install Dependencies

```
cd app/frontend &&
npm install &&
cd ../../ &&
cd app/backend &&
npm install
```

2. Fill out .env.example.development variable with correct values

3. Rename .env.example.development file to .env.development

4. move to docker directory

```
cd misc/docker
```

5. Build image of the application and run it on the container using docker compose

```
docker compose up -d --build
```

6. See the application container port

```
docker compose ps
```

7. Move your directory to parent directory (Optional)

```
cd ../../
```

Here's the full description on what port the application is running:

1. frontend development: localhost:3000
2. frontend production: localhost:8080
3. backend development: localhost:5001
4. backend production: localhost:5000

For api (backend) documentation route, you can access it on `/` endpoint

#### Production Environment

For production environment, you just need to build docker images for each front end and back end application.

1. Move to docker directory

```
cd misc/docker
```

2. Rename .env.example.production file to .env.production

3. Up and build your docker images

```
docker compose up -d --build be_prod fe_prod
```

### Without Docker

You can run application locally by following this instruction

1. Install Dependencies

```
cd app/frontend &&
npm install &&
cd ../../ &&
cd app/backend &&
npm install &&
cd ../../
```

2. Fill out .env.example.development variable with correct values

3. move to docker directory

```
cd misc/docker
```

4. Rename .env.example.development file to .env.development and copy it to each backend and front end directory, or you just can run this command

```
cp .env.example.development ../../app/frontend/.env &&
cp .env.example.development ../../app/backend/.env &&
cd ../../
```

5. Run your back end application by following this command

```
cd app/backend &&
npm run start:dev
```

6. Open your another terminal and run your front end application by following this command

```
cd app/frontend && npm run dev
```

7. You can open your application on http://localhost:5001 for backend and http://localhost:5173 for frontend

## Used technology

1. Express JS
2. React
3. @reduxjs/toolkit
4. Typescript
