# 🧟 Cranberries

## Intro

This is a generic zombie manager to help you organize your undead.

UI - React / TypeScript / Apollo GraphQL

Server - NodeJS / TypeScript / Apollo GraphQL Server / Express / Mongoose

## Getting Started

### MongoDB

You will need a running instance of mongodb. You can start an instance with docker using the following command:

```
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest
```

### Server

Before running the server, rename `.env.example` in `/cranberries-server` to `.env`

Then run the server with

```
cd cranberries-server
yarn
yarn dev
```

Playground is on `localhost:4000/graphql`

## UI

```
cd cranberries-ui
yarn
yarn dev
```

Navigate to `localhost:3000`

License:

MIT
