
const {FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { Document } = require('langchain/document');

/**
 * update metadata of the bot
 * @returns 
 */
async function updateMetaDta() {
    await create_embeddings();
    // TODO: update meta data
    return { status: 'success' };
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



module.exports = {createVectorDB };