// const aiResponse = require('../services/aiResponse');
const updateBot = require('../services/updateBot');


// The botController handles incoming requests related to updating the bot's settings
// and sends responses back to the client
const botController = {
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
  },

  async updateApiKey(req, res) {
    const openai_api_key = req.body.openai_api_key;
    const response = await updateBot.updateApiKey(openai_api_key);
    res.send(response);
  },

  async getMetaDta(req, res) {
    const response = await updateBot.getMetaDta();
    res.send(response);
  },

  async getApiKey(req, res) {
    const response = await updateBot.getApiKey();
    res.send(response);
  }

};




module.exports = botController;