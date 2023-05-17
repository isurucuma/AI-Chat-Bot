"use client";
import React, { useState } from "react";
import { IMessage } from "./types";

function Message({
  id = 0,
  isFromUser = false,
  content = "something",
  done = false,
}: IMessage) {
  // defining states needed to intepret the message
  const [textMessage, setTextMessage] = useState("");

  const messageStyle = isFromUser
    ? "bg-blue-400 text-white rounded-bl-lg rounded-tl-lg rounded-tr-lg mb-2 max-w-md"
    : "bg-gray-100 text-gray-700 rounded-bl-lg rounded-br-lg rounded-tr-lg mb-2 max-w-md";
  const dotStyle = done ? "bg-green-500" : "bg-gray-400";
  return (
    <div className={`flex ${isFromUser ? "justify-end" : "justify-start"}`}>
      <div className={`${messageStyle} relative`}>
        <p className="px-4 py-2">{content}</p>
        <div
          className={`h-1 w-1 rounded-full absolute ${dotStyle} ${
            isFromUser ? " bottom-1 right-1" : "top-1 left-1"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Message;
