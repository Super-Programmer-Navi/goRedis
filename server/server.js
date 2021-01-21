/*
  Set up express server here and connect to Redis server
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const path = require('path');
const controller = require('./controller')

app.use(bodyParser.json());

app.post('/connect',
  controller.redisConnect,
  (req, res) => {
    console.log(res.locals);
    res.status(200).json({ login: res.locals.login, allMemory: res.locals.allMemory, usedMemory: res.locals.usedMemory });
  }
)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(PORT, () => {
  console.log(`We be LISTENING: ${PORT}`)
})