const { SystemChatMessage, HumanChatMessage, AIChatMessage } = require('langchain/schema');
const { ChatMessageHistory } = require('langchain/memory');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { BufferMemory } = require('langchain/memory');
const { FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { ConversationalRetrievalQAChain } = require('langchain/chains');

let vectorstore = null;

async function get_response(chatHistory, inputMessage) {
  await load_embeddings();
  const response = await get_conversation_chain(vectorstore, chatHistory, inputMessage);
  return response;
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
      memory: convertChatHistoryToLanchainMemory(chatHistory)
    },
  );

  const response = await chain.call({
    question: inputMessage,
  });

  return response.text;
}

module.exports = { get_response };