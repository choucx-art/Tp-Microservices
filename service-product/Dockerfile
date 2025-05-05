FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install amqplib
RUN npm install prom-client
COPY . .
EXPOSE 3002
CMD ["npm", "start"]
