const axios = require('axios');

// async function sendUserMessage(message: string): Promise<string> {
//     // create a promise that resolves after 1 second
//     const promise = new Promise<string>((resolve, reject) => {
//       fetch("http://localhost:3002/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ chatHistory: chatHistory, message: message }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           resolve(data.message);
//         }
//         )
//         .catch((error) => {
//           console.error("Error:", error);
//         }
//         );
//     });
//     return promise;
//   }

async function getAiResponse(userMessage, messageHistory) {
    const response = await axios.post('http://localhost:3002/chat', {
        chatHistory: messageHistory,
        message: userMessage,
    });
    console.log("...................")
    console.log(response.data.message.trim())
    console.log("...................")
    return response.data.message.trim();
}

module.exports = getAiResponse;