require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const messageHistory = require('./messageHistory');
const handleMessage = require('./handleMessage');
const handlePostback = require('./handlePostback');
const handlesysteminformation = require('./handlesysteminformation');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("/ -- get")
    res.send('Hello World!');
});

// change systemState in config.json
app.post('/changesystemstate', (req, res) => {
    console.log("/changesystemstate -- post")
    const systemState = req.body.systemState;
    handlesysteminformation.changeSystemState(systemState);
    res.sendStatus(200);
});
// change PAGE_ACCESS_TOKEN and VERIFY_TOKEN in .env
app.post('/changetoken', (req, res) => {
    console.log("/changetoken -- post")
    const PAGE_ACCESS_TOKEN = req.body.PAGE_ACCESS_TOKEN;
    const VERIFY_TOKEN = req.body.VERIFY_TOKEN;
    handlesysteminformation.changeToken(PAGE_ACCESS_TOKEN, VERIFY_TOKEN);
    res.sendStatus(200);
});

// get systemState in config.json
app.get('/getsystemstate', (req, res) => {
    console.log("/getsystemstate -- get")
    const systemState = handlesysteminformation.getSystemState();
    res.send(systemState);
});

// get PAGE_ACCESS_TOKEN and VERIFY_TOKEN in .env
app.get('/gettoken', (req, res) => {
    console.log("/gettoken -- get")
    const { PAGE_ACCESS_TOKEN, VERIFY_TOKEN } = handlesysteminformation.getToken();
    res.send({ PAGE_ACCESS_TOKEN, VERIFY_TOKEN });
});

app.get('/webhook', (req, res) => {
    console.log("dsda")
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];

            if (webhookEvent.message) {
                handleMessage(webhookEvent.sender.id, webhookEvent.message);
            } else if (webhookEvent.postback) {
                handlePostback(webhookEvent.sender.id, webhookEvent.postback);
            }
        });

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});



app.listen(3005, () => {
    console.log('Server is listening on port 3005');
});