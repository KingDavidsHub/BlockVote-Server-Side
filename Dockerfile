FROM node:20.12.2-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD npm start