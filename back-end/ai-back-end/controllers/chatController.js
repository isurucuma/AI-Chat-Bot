const aiResponse = require('../services/aiResponse');

// The chatController handles incoming requests related to chat functionality
// and sends responses back to the client
const chatController = {
  async get_response(req, res) {
    const chatHistory = req.body.chatHistory;
    const message = req.body.message;

    const response = { message: await aiResponse.get_response(chatHistory, message) };
    console.log("response", response)

    res.send(response);
  },
};

module.exports = chatController;