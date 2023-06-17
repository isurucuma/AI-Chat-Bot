require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const aiResponse = require('./aiResponse');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/chat',async (req, res) => {
    const chatHistory = req.body.chatHistory;
    const message = req.body.message;

    const response = { message: await aiResponse.get_response(chatHistory,message) };
    console.log("response",response)

    res.send(response);
  });

app.post('/create_embeddings', async (req, res) => {
    // const doc = req.body.doc;
    console.log("test 1")
    const response = await aiResponse.create_embeddings();
    res.send(response);
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
}); 