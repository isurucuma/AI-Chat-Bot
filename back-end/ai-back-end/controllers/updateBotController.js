// const aiResponse = require('../services/aiResponse');
const updateBot = require('../services/updateBot');


// The updateBotController handles incoming requests related to updating the bot's settings
// and sends responses back to the client
const updateBotController = {
  async updateBot(req, res) {
    const response = await updateBot.createVectorDB();
    res.send(response);
  }
};

module.exports = updateBotController;