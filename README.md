# Resizing Image API

API for resizing images

## Environment
- Node.js: 20.18.1
- Npm: 10.8.2
- Docker Desktop: 4.32.2
- Mongosh: 2.3.8

## Setup

This will install all the dependencies
```
cd api
npm install
```

This will create and populate the MongoDB database in an open Docker instance.
```
docker-compose up -d
```

## Running
For running the API just simply run this command inside the api folder
```
npm run start:dev
```
Go to http://localhost:3000/api in order to see the API Documentation.

## Examples
You will have some example `Tasks` and `Images`in the database the first time you run the API. The `/output` folder is not upload to the respository. These are some `ids` of the already created tasks
- 67964b05c2e2337d9e85d0ab
- 67964b1cc2e2337d9e85d0b9
- 67964b2ec2e2337d9e85d0c5
- 67964b37c2e2337d9e85d0d1
- 67964b49c2e2337d9e85d0dd

## Extra
- For connecting to your MongoDB instance inside your host machine:
```
    mongosh mongodb://localhost/mydb  
```

- If you want to slow down a little bit the resizing process, you have some commented code in `tasks.service.ts`

