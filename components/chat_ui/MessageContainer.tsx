import React from "react";
import Message from "./Message";

type Props = {};

function MessageContainer({}: Props) {
  const messages = [
    { userMessage: false, text: "Hi, how can I help you?" },
    { userMessage: true, text: "I need help with my order.", sent: false },
    { userMessage: false, text: "Sure, what's your order number?" },
    { userMessage: true, text: "12345" },
    {
      userMessage: false,
      text: "Thank you, let me check on that.",
      sent: false,
    },
    {
      userMessage: false,
      text: "It looks like your order is on its way. This is some sort of garbage words to test the length fot ehtext that is supported",
    },
    {
      userMessage: true,
      text: "Great, thanks! but anyway I will heve to get you assistant in the future also, there fore please make sure to remember my past chat and data",
    },
  ];
  return (
    <div className="row-span-6 overflow-y-auto">
      <div className="flex flex-col space-y-2 p-4">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </div>
  );
}

export default MessageContainer;
