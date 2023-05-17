import React from "react";
import Message from "./Message";
import { IMessage } from "./types";

type Props = {};

function MessageContainer({}: Props) {
  const messages: IMessage[] = [
    { isFromUser: false, content: "Hi, how can I help you?" },
    { isFromUser: true, content: "I need help with my order.", done: false },
    { isFromUser: false, content: "Sure, what's your order number?" },
    { isFromUser: true, content: "12345" },
    {
      isFromUser: false,
      content: "Thank you, let me check on that.",
      done: false,
    },
    {
      isFromUser: false,
      content:
        "It looks like your order is on its way. This is some sort of garbage words to test the length fot ehtext that is supported",
    },
    {
      isFromUser: true,
      content:
        "Great, thanks! but anyway I will heve to get you assistant in the future also, there fore please make sure to remember my past chat and data",
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
