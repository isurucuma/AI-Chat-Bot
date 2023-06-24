// let messageHistory = [
//     {
//         userId: 1234,
//         chatHistory: [
//             { isFromUser: false, content: 'Hello' },
//             { isFromUser: true, content: 'Hello' },
//         ]
//     },
//     {
//         userId: 1235,
//         chatHistory: [
//             { isFromUser: false, content: 'Hello' },
//             { isFromUser: true, content: 'Hello' },
//         ]
//     },
// ];

const fs = require('fs');

const MESSAGE_HISTORY_FILE = 'messageHistory.json';

let messageHistory = [];

function loadMessageHistory() {
    try {
        const data = fs.readFileSync(MESSAGE_HISTORY_FILE);
        messageHistory = JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, create it
            saveMessageHistory();
        } else {
            console.error(`Failed to load message history: ${err}`);
        }
    }
}

function saveMessageHistory() {
    try {
        const data = JSON.stringify(messageHistory);
        fs.writeFileSync(MESSAGE_HISTORY_FILE, data);
    } catch (err) {
        console.error(`Failed to save message history: ${err}`);
    }
}

// function addMessageToHistory(userId, message, isFromUser) {
//     const userHistory = messageHistory.find((user) => user.userId === userId);
//     if (userHistory) {
//         userHistory.chatHistory.push({ isFromUser, content: message });
//     } else {
//         messageHistory.push({
//             userId,
//             chatHistory: [{ isFromUser, content: message }],
//         });
//     }
// }


function addMessageToHistory(userId, message, isFromUser) {
    loadMessageHistory();

    const userHistory = messageHistory.find((user) => user.userId === userId);
    if (userHistory) {
        userHistory.chatHistory.push({ isFromUser, content: message });
    } else {
        messageHistory.push({
            userId,
            chatHistory: [{ isFromUser, content: message }],
        });
    }

    saveMessageHistory();
}


// function getMessageHistoryString(userId) {
//     const userHistory = messageHistory.find((user) => user.userId === userId);
//     if (userHistory) {
//         return userHistory.chatHistory;
//     } else {
//         return [];
//     }
// }

// module.exports = {
//     addMessageToHistory,
//     getMessageHistoryString
// };



function getMessageHistoryString(userId) {
    loadMessageHistory();

    const userHistory = messageHistory.find((user) => user.userId === userId);
    if (userHistory) {
        return userHistory.chatHistory;
    } else {
        return [];
    }
}

module.exports = {
    addMessageToHistory,
    getMessageHistoryString
};