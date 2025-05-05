FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install amqplib
RUN npm install prom-client

COPY . .
EXPOSE 3001
CMD ["npm", "start"]
