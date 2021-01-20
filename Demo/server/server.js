const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');

require('dotenv').config();

const controller = require('./DbController.js');
const redis = require('redis');
const redisDb = redis.createClient();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

/*
  Get requests for data from front end
  Route the request to databse controllers
*/

app.post('/data', controller.checkCache, controller.mongoDb, (req, res) => {
  // send the data from the cache to the frontend
  res.json(res.locals.name);
});

// send html file for frontend
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
  console.log(redisDb.server_info.total_system_memory_human);
  console.log(redisDb.server_info.used_memory_human);
  res.json({
    1: redisDb.server_info.total_system_memory_human,
    2: redisDb.server_info.used_memory_human,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
