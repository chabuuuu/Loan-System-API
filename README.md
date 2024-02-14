# LOAN SERVICE
## A Service In Loan MIcroservice System

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Loan Service là một service thuộc Loan Microservice System, được viết bằng ExpressJS để quản lý Employee, Borrower, Lender và thực hiện tạo các Loan Contract, Payment, quản lý các Loan Package,...
Service sử dụng RabbitMQ để lắng nghe các sự kiện tạo Loan Contract từ API GATEWAY
## Features
- Quản lý thông tin Employee, Borrower, Lender
- Quản lý Loan Contract
- Quản lý Loan Payment

## Tech

- [ExpressJS] - for API building
- [Postgresql] - Database
- [Redis] - for caching
- [Prisma/TypeORM] - ORM

## Enviroment variables
Xem file .env.example
```env
PORT="" //SERVER PORT

SELECTED_ORM ="" //SET ORM: "prisma" or "typeorm"

//Postgres config:
DB_HOST ="" 
DB_PORT = 
DB_USERNAME =""
DB_PASSWORD =""
DB_NAME =""
DATABASE_URL=""


ROOT="" //Project root path:

JWT_SECRET ="" //JWT Secret Key
JWT_EXPIRES_IN="" //Jwt expire


REDIS_URL="" //Redis Connection String

MONGODB_URL="" //MongoDB Connection String

TELE_BOT_TOKEN="" //Telegram API Key

TELE_CHAT_ID="" //Telegram User ID for Test

//Config backup database export location:
BACKUP_DB=""
BACKUP_ROOT=""
```

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

For production environments...

```sh
cd Worker-API
npm i
npm run prod
```

For db migration...

```sh
npm run migrate
```


