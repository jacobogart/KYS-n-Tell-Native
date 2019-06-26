const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const credentials = require('../server/utilities')
const client = require('twilio')(
  credentials.twilioSid,
  credentials.twilioToken
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api', (req, res) => {
  res.send('HELLOO')
})

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: credentials.twilioNumber,
      to: req.body.to,
      body: req.body.message
    })
    .then(() => {
      res.send(JSON.stringify({ ok: true }));
    })
    .catch(err => {
      res.send(JSON.stringify({ ok: false, contact: req.body.to }));
    });
})

module.exports = app;