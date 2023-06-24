function handlePostback(senderId, postback) {
    const payload = postback.payload;
    if (payload === 'WELCOME_MESSAGE') {
        sendTextMessage(senderId, 'Welcome to my chatbot!');
    }
}

module.exports = handlePostback;