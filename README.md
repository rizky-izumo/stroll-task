## Description

Stroll task for Dynamic Question Assignment

## Pre-requisite

Ensure Node v22 is installed in your system with npm package manager along with Docker.

## Project setup

```bash
$ git clone https://github.com/rizky-izumo/stroll-task.git
$ cd stroll-task
$ npm install
```

## Compile and run the project

```bash
# Environment prep
$ cp .env.template .env
$ docker compose --env-file .env up -d

# Setup PostgreSQL and seed data
$ knex migrate:latest
$ docker compose --env-file .env run --rm db-seed

# Run server
$ npm run start:dev

```

## Write-up

I went with a simple monolithic service approach where upon service start, will load up a Bull cron that runs on a configurable question cycle rotation (at the moment, it's default to every Monday, 7pm SGT based on 24h notation)

- API to configure the cycle is provided inside Postman collection Stroll_task_apis.json
- API to add/remove questions is provided inside Postman collection Stroll_task_apis.json
- If there are multiple cycle configurations, only the latest (by update) will be taken as part of the cron job cycle

If I were to make the improve the design, that would be to add a user micro-service to involve users in answering the questions.
