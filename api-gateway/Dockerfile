FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install amqplib
RUN npm install @opentelemetry/api @opentelemetry/sdk-node

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
