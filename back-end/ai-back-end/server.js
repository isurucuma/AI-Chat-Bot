
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const chatController = require('./controllers/chatController.js');
const botController = require('./controllers/botController.js');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/chat', chatController.get_response);

app.post('/updatePDF', botController.updatePDF);

app.post('/updateMetaDta', botController.updateMetaDta);
app.get('/getMetaDta', botController.getMetaDta);

app.post('/updateKey', botController.updateApiKey);
app.get('/getKey', botController.getApiKey);

app.listen(3002, () => {
  console.log('Server is listening on port 3002');
});