FROM node:16-alpine3.17
WORKDIR /
COPY client/package*.json ./
RUN npm install
COPY client ./
EXPOSE 80
RUN ls -l
CMD ["npm", "run", "serve"]