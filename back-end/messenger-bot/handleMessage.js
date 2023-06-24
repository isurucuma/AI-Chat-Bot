const axios = require('axios');
const messageHistory = require('./messageHistory');
const generateResponse = require('./generateResponse');
const sendTextMessage = require('./sendTextMessage');

function handleMessage(senderId, message) {
    const userMessage = message.text;
    const userId = senderId;

    // get message history
    const messageHistoryString = messageHistory.getMessageHistoryString(userId);

    // get response
    generateResponse(userMessage, messageHistoryString)
        .then((response) => {
            // send response
            sendTextMessage(senderId, response);

            // add message to history
            messageHistory.addMessageToHistory(userId, userMessage, true);
            messageHistory.addMessageToHistory(userId, response, false);
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = handleMessage;