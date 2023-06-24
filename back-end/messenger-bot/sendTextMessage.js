const request = require('request');

function sendTextMessage(senderId, text) {
    console.log("send msg start .................")
    request({
        url: 'https://graph.facebook.com/v11.0/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text: text }
        }
    }, (error, response, body) => {
        if (error) {
            console.error('Error sending message: ', error);
        } else if (response.body.error) {
            console.error('Error: ', response.body.error);
        }
    });
}

module.exports = sendTextMessage;
