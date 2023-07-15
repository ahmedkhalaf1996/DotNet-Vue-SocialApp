# FROM node:16-alpine3.17
FROM  node:18.16.0-alpine3.18
WORKDIR /
COPY client/package*.json ./
RUN npm install
COPY client ./
EXPOSE 8080
RUN ls -l
CMD ["npm", "run", "serve"]