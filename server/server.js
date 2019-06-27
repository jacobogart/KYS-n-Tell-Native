const app = require('./app.js');

app.set('port', 3001);

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);