const { SystemChatMessage, HumanChatMessage, AIChatMessage } = require('langchain/schema');
const { ChatMessageHistory } = require('langchain/memory');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { BufferMemory } = require('langchain/memory');
const { FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { ConversationalRetrievalQAChain } = require('langchain/chains');
const prompts = require('../config.json');

let QUESTION_GENERATOR_PROMPT;
let QA_PROMPT;
let vectorstore = null;

async function get_response(chatHistory, inputMessage) {
  await load_embeddings();
  getPrompt();
  const response = await get_conversation_chain(vectorstore, chatHistory, inputMessage);
  return response;
}

function getPrompt() {
  QUESTION_GENERATOR_PROMPT = prompts.QUESTION_GENERATOR_PROMPT;
  QA_PROMPT = prompts.QA_PROMPT;

  // get bot_metadata
  const bot_metadata = prompts.bot_metaData;
  QA_PROMPT = QA_PROMPT.replace('{bot_style}', bot_metadata.bot_style);
  QA_PROMPT = QA_PROMPT.replace('{bot_role}', bot_metadata.bot_role);
  QA_PROMPT = QA_PROMPT.replace('{bot_name}', bot_metadata.bot_name);
  QA_PROMPT = QA_PROMPT.replace('{bot_tone}', bot_metadata.bot_tone);
}


async function load_embeddings() {
  const directory = './data/vectorstore';
  vectorstore = await FaissStore.load(
    directory,
    new OpenAIEmbeddings()
  );
}

function convertChatHistoryToLanchainMemory(chatHistory) {
  let pastMessages = [];
  chatHistory.forEach((message) => {
    if (message.isFromUser) {
      pastMessages.push(new HumanChatMessage(message.content));
    } else {
      pastMessages.push(new AIChatMessage(message.content));
    }
  });

  const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory(pastMessages),
    memoryKey: 'chat_history',
    returnMessages: true,
  });

  return memory;
}

async function get_conversation_chain(vectorstore, chatHistory, inputMessage) {
  const model = new ChatOpenAI({ temperature: 0, verbose: true });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      memory: convertChatHistoryToLanchainMemory(chatHistory),
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: QUESTION_GENERATOR_PROMPT,
    },

  );

  const response = await chain.call({
    question: inputMessage,
  });

  return response.text;
}

module.exports = { get_response };