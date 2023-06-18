
const { FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { Document } = require('langchain/document');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const {DirectoryLoader} = require('langchain/document_loaders/fs/directory');
const {JSONLoader, JSONLinesLoader} = require('langchain/document_loaders/fs/json');
const {TextLoader} = require('langchain/document_loaders/fs/text');
const {CSVLoader} = require('langchain/document_loaders/fs/csv');


// get metaData
async function getMetaDta() {
  const configFilePath = './config.json';

  try {
    // read the config file
    const configFile = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(configFile);

    return { status: 'success', metaData: config.bot_metaData };
  } catch (err) {
    console.error(err);
    return { status: 'error' };
  }
}

// get open ai key in .env file
async function getApiKey() {
  const envFilePath = './.env';

  try {
    // read the env file
    const envFile = fs.readFileSync(envFilePath, 'utf8');

    // get open ai key
    const openAiApiKey = envFile.match(/OPENAI_API_KEY=(.*)/)[1];

    return { status: 'success', data: openAiApiKey };
  } catch (err) {
    console.error(err);
    return { status: 'error' };
  }
}


/**
 * this funshion will update open ai key in .env file
 * @param {*} openAiApiKey 
 */
async function updateApiKey(openAiApiKey) {
  const envFilePath = './.env';

  try {
    // read the env file
    const envFile = fs.readFileSync(envFilePath, 'utf8');

    // update envFile
    const newEnvFile = envFile.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${openAiApiKey}`);

    // write the updated env file
    fs.writeFileSync(envFilePath, newEnvFile);

    return { status: 'success' };
  } catch (err) {
    console.error(err);
    return { status: 'error' };
  }
}

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
  // call fileserver to get all files path, api:http://localhost:3001/api/v1/files
  const response = await fetch('http://localhost:3001/api/v1/files');
  const data = await response.json();

  const filePaths = data.map((file) => {
    return 'http://localhost:3001/media/' + file.fileName;
  });


  // loop through file paths get all pdf files and create vectorstore
  for (i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];

    // download the PDF file from the online path
    const response = await fetch(filePath);

    // create new file path and save the pdf file - temp{index}.pdf
    const pdfPath = path.join(__dirname, `./pdf/temp${i}.pdf`);
    const fileStream = fs.createWriteStream(pdfPath);
    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', (err) => {
        reject(err);
      });
      fileStream.on('finish', function () {
        resolve();
      });
    });
  }

  const loader = new DirectoryLoader(
    "./services/pdf",
    {
      ".txt": (path) => new TextLoader(path),
      ".pdf": (path) => new PDFLoader(path),
    }
  );

  const docs = await loader.load();
  // const text = docs[0].pageContent;
  const text_chunks = await get_text_chunks(docs);
  await create_new_vectorstore(text_chunks);



  console.log("delete file - start")
  const directory = path.join(__dirname, `./pdf`);
  // delete the files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  console.log("delete file - end")

  
  return { status: 'success' };
}


async function get_text_chunks(docs) {
  let splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  let docOutput = [];
  for (let doc of docs) {
    // let chunks = await splitter.createDocuments(doc.pageContent);
    let chunks = await splitter.splitDocuments([
      new Document({ pageContent: doc.pageContent }),
    ]);
    docOutput.push(...chunks);
  }
  return docOutput;
}

async function create_new_vectorstore(text_chunks) {
  // console.log(text_chunks)
  let embeddings = new OpenAIEmbeddings();
  let vectorstore = await FaissStore.fromDocuments(
    text_chunks,
    embeddings = embeddings
  );

  const directory = './data/vectorstore';
  await vectorstore.save(directory);
}



module.exports = { createVectorDB, updateMetaDta, updateApiKey, getApiKey, getMetaDta };