// const aiResponse = require('../services/aiResponse');
const updateBot = require('../services/updateBot');


// The updateBotController handles incoming requests related to updating the bot's settings
// and sends responses back to the client
const updateBotController = {
  async updatePDF(req, res) {
    const response = await updateBot.createVectorDB();
    res.send(response);
  },

  async updateMetaDta(req, res) {
    const botName = req.body.bot_name;
    const botRole = req.body.bot_role;
    const botStyle = req.body.bot_style;
    const botTone = req.body.bot_tone;
    console.log(req.body)
    const response = await updateBot.updateMetaDta(botName, botRole, botStyle, botTone);
    res.send(response);
  }
};




module.exports = updateBotController;