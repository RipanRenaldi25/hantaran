FROM node:20-alpine AS BE_DEV
WORKDIR /app
COPY ./app/backend/package*.json ./
RUN npm install
COPY ./app/backend ./

FROM node:20-alpine AS BE_BUILD
WORKDIR /app
COPY ./app/backend/package*.json ./
RUN npm install
COPY ./app/backend ./
RUN npm run build

FROM node:20-alpine AS BE_PROD
WORKDIR /app
COPY ./app/backend/package*.json ./
RUN npm install
COPY --from=BE_BUILD /app/dist ./
COPY --from=BE_BUILD /app/swagger.json ./

FROM node:20-alpine AS FE_DEV
WORKDIR /app
COPY ./app/frontend/package*.json ./
RUN npm install
COPY ./app/frontend ./

FROM node:20-alpine AS FE_BUILD
WORKDIR /app
COPY --from=FE_DEV /app ./
RUN npm run build

FROM nginx:latest AS FE_PROD
WORKDIR /app
RUN rm -rf /usr/share/nginx/html
COPY --from=FE_BUILD /app/build /usr/share/nginx/html