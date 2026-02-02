FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
