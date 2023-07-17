# FROM node:16-alpine3.17
# WORKDIR /
# COPY client/package*.json ./
# RUN npm install
# COPY client ./
# EXPOSE 80
# RUN ls -l
# CMD ["npm", "run", "serve"]


FROM node:16-alpine3.17 as build
WORKDIR /usr/src/app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run build 
FROM nginx:1.15.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY client/.nginx/nginx.conf /etc/nginx/nginx.conf