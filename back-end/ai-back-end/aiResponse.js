const { SystemChatMessage, HumanChatMessage, AIChatMessage } = require('langchain/schema');
const { ChatMessageHistory } = require('langchain/memory');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { BufferMemory } = require('langchain/memory');
const { ConversationChain } = require('langchain/chains');
const {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder } = require('langchain/prompts');
const { FAISS,FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { Document } = require('langchain/document');
const {ConversationalRetrievalQAChain } = require('langchain/chains');

let vectorstore = null;

async function get_response(chatHistory, inputMessage) {
    await load_embeddings();
    const response = await get_conversation_chain(vectorstore, chatHistory, inputMessage);
    return response;
}

async function create_embeddings() {
    // const pdf_docs = ["./data/pdf/1.pdf", "./data/pdf/2.pdf", "./data/pdf/3.pdf"];

    // get pdf form data/pdf folder
    // const pdf_docs = [];
    // const directory = "./data/pdf";
    // fs.readdirSync(directory).forEach(file => {
    //     pdf_docs.push(directory + "/" + file);
    // });
    // console.log("pdf_docs", pdf_docs);

    const loader = new PDFLoader("./data/pdf/Madusha_Keshan.pdf", {
      splitPages: false,
    });
    const docs = await loader.load();

    // const text = get_pdf_text(docs);
    const text = docs[0].pageContent;

    const text_chunks = await get_text_chunks(text);
    await create_new_vectorstore(text_chunks);
    return { status: "success" }
};

async function load_embeddings() {
    const directory = "./data/vectorstore";
    vectorstore = await FaissStore.load(
        directory,
        new OpenAIEmbeddings()
        );
};


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
        memoryKey: "chat_history",
        returnMessages: true,
    });


    return memory;
}


function get_pdf_text(pdf_docs) {
    let text = "";
    for (let i = 0; i < pdf_docs.length; i++) {
        let pdf_reader = new PdfReader(pdf_docs[i]);
        for (let j = 0; j < pdf_reader.pages.length; j++) {
            text += pdf_reader.pages[j].extractText();
        }
    }
    return text;
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
    // embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    let vectorstore = await FaissStore.fromDocuments(
        text_chunks, 
        embeddings = embeddings
        );

    const directory = "./data/vectorstore";
    await vectorstore.save(directory);
}


async function get_conversation_chain(vectorstore, chatHistory, inputMessage) {
    const model = new ChatOpenAI({ temperature: 0, verbose: true });

    // const data = await vectorstore.getVectorData(inputMessage);
    // const data = await vectorstore.similaritySearch(inputMessage, 1)

    // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //     SystemMessagePromptTemplate.fromTemplate(
    //         "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. and also ai can use chatHistory and data. /n data: {data}"
    //     ),
    //     new MessagesPlaceholder("chatHistory"),
    //     HumanMessagePromptTemplate.fromTemplate("{input}"),

    // ]);

    // const chain = new ConversationChain({
    //     memory: convertChatHistoryToLanchainMemory(chatHistory),
    //     prompt: chatPrompt.format({ inputMessage, data } ),
    //     llm: chat,
    //     verbose: true,
    // });

    const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorstore.asRetriever(),
        {
          memory: convertChatHistoryToLanchainMemory(chatHistory)
        },
      );

    const response = await chain.call({
        question:inputMessage,
    });

    return response.text;
}


module.exports = { get_response, create_embeddings };









