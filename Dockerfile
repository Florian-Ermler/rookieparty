FROM node:latest as build-stage
WORKDIR /app
COPY frontend .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build-stage ./app/dist/frontend /usr/share/nginx/html