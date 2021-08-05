FROM node:14-alpine3.12
WORKDIR /app
ADD package.json ./ 
RUN npm install
ADD . .
CMD node server.js