
const {FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { Document } = require('langchain/document');
const fs = require('fs');

/**
 * update metadata of the bot
 * @param {string} bot_name - the name of the bot
 * @param {string} bot_role - the role of the bot
 * @param {string} bot_style - the style of the bot
 * @param {string} bot_tone - the tone of the bot
 * @returns {Promise<{status: string}>} - a Promise that resolves to an object with a status property
 */
async function updateMetaDta(botName, botRole, botStyle, botTone) {
    const configFilePath = './config.json';

    try {
        // read the config file
        const configFile = fs.readFileSync(configFilePath, 'utf8');
        const config = JSON.parse(configFile);

        // update config.bot_metaData
        config.bot_metaData.bot_name = botName;
        config.bot_metaData.bot_role = botRole;
        config.bot_metaData.bot_style = botStyle;
        config.bot_metaData.bot_tone = botTone;


        // write the updated config file
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 4));

        return { status: 'success' };
    } catch (err) {
        console.error(err);
        return { status: 'error' };
    }
}

/**
 * this will create new vectorstore
 */
async function createVectorDB() {
  const loader = new PDFLoader('./data/pdf/Madusha_Keshan.pdf', {
    splitPages: false,
  });
  const docs = await loader.load();
  const text = docs[0].pageContent;
  const text_chunks = await get_text_chunks(text);
  await create_new_vectorstore(text_chunks);
  return { status: 'success' };
}


async function get_text_chunks(text) {
  let splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: text }),
  ]);
  return docOutput;
}

async function create_new_vectorstore(text_chunks) {
  let embeddings = new OpenAIEmbeddings();
  let vectorstore = await FaissStore.fromDocuments(
    text_chunks,
    embeddings = embeddings
  );

  const directory = './data/vectorstore';
  await vectorstore.save(directory);
}



module.exports = {createVectorDB,updateMetaDta };