# Project setup

### Install package
```bash
npm i && npm i --save-dev prisma dotenv
```

### Setup .env
```bash
cat <<'EOF' > .env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://app:app@localhost:5432/app"
JWT_SECRET="dev_secret_change_me"
JWT_EXPIRES_IN=604800
EOF
```

# Compile and run the project

## Start database container
```bash
docker-compose up -d
```
## Start backend

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Prisma

## Apply migration
```bash
npx prisma migrate dev
```

## Generate schema & fill database
```bash
npx prisma generate
npx prisma db seed
```

## Start prisma studio
```bash
npx prisma studio
```
