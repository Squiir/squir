FROM node:20-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && npm run start:prod
