let messageHistory = [
    {
        userId: 1234,
        chatHistory: [
            { isFromUser: false, content: 'Hello' },
            { isFromUser: true, content: 'Hello' },
        ]
    },
    {
        userId: 1235,
        chatHistory: [
            { isFromUser: false, content: 'Hello' },
            { isFromUser: true, content: 'Hello' },
        ]
    },
];


function addMessageToHistory(userId, message, isFromUser) {
    const userHistory = messageHistory.find((user) => user.userId === userId);
    if (userHistory) {
        userHistory.chatHistory.push({ isFromUser, content: message });
    } else {
        messageHistory.push({
            userId,
            chatHistory: [{ isFromUser, content: message }],
        });
    }
}


function getMessageHistoryString(userId) {
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