"use client";

import React, { useContext } from "react";
import { RiAttachmentLine, RiEmotionLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "./EmojiPicker";
import { IMessage } from "../../common-types/types";
import { ChatContext } from "./ChatUI";

type Props = {};

function UserInputField({}: Props) {
  const { chatHistory, setChatHistory } = useContext(ChatContext);
  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle send message
    console.log(`Sending message: ${message}`);
    // create a new IMessage from the message

    let newMessage: IMessage = {
      id: chatHistory.length,
      isFromUser: true,
      content: message,
      done: false,
    };

    // add it to the chatHistory
    setChatHistory((chatHistory) => [...chatHistory, newMessage]);
    setMessage("");

    // TODO: handle response from the server
    let serverResponse = await sendUserMessage(message);
    // create IMessage from the response
    let serverMessage: IMessage = {
      id: chatHistory.length,
      isFromUser: false,
      content: serverResponse,
      done: true,
    };
    setChatHistory((chatHistory) => [...chatHistory, serverMessage]);
  };

  // async function sendUserMessage(message: string): Promise<string> {
  //   // create a promise that resolves after 1 second
  //   const promise = new Promise<string>((resolve, reject) => {
  //     setTimeout(() => {
  //       // set timeout to simulate a response from the server
  //       resolve("AI response");
  //     }, 2000);
  //   });
  //   return promise;
  // }

  // async function sendUserMessage(message: string): Promise<string> {
  //   const promise = new Promise<string>((resolve, reject) => {
  //     fetch("http://localhost:5000/chatbot", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: message }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         resolve(data.message);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   });
  //   return promise;
  // }

// @app.get('/conversation')
// async def conversation(message: str):
// call https://fad1-34-73-113-36.ngrok.io/conversation?message= with the message and return response

  async function sendUserMessage(message: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      fetch("https://ce43-34-73-113-36.ngrok.io/conversation?message=" + message, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    return promise;
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  return (
    <div className="mt-1 row-span-2 bg-slate-100 w-full relative hover:bg-slate-200 transition ease-out duration-400 border border-none rounded-2xl">
      <form onSubmit={handleSubmit} className="flex p-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 transition ease-out duration-400"
        />
        <div className="flex ml-4">
          <button type="button" className="mr-2">
            <RiAttachmentLine size={24} className="text-gray-500" />
          </button>
          <button type="button" className="mr-2">
            <RiEmotionLine
              size={24}
              className="text-gray-500"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
          </button>
          <button type="submit">
            <IoSend size={24} className="text-blue-400" />
          </button>
        </div>
      </form>
      <EmojiPicker
        onEmojiSelect={(emoji: string) => {
          setMessage(message + emoji);
        }}
        className={`absolute bottom-16 right-4 h-96 overflow-scroll transition-all ease-in duration-300 transform ${
          showEmojiPicker ? "" : "hidden"
        }`}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
      />
    </div>
  );
}

export default UserInputField;
