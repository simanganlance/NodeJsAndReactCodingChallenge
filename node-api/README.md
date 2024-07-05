# Node.js CRUD API

The challenge is to design and implement a Node.js API endpoint that interacts with a database (e.g., MongoDB, PostgreSQL) and includes error handling, validation, and unit tests.

## Prerequisite
1. Node.js installed
2. MongoDB installed

## Run and setup
1. Run the command `npm install` in the root folder to install dependencies
2. Configure the MongoDB Connection String in `config.js` 
```javascript
module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI || '{Change to MongoDB Connection String}',
  };
```
3. Ensure that MongoDB is running.
4. Then run the project using `npm start`

## Run Test
1. Run the command `npx jasmine` in the root folder.
