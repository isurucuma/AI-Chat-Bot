import React from "react";

type Props = {
  id?: number;
  userMessage?: boolean;
  text?: string;
  sent?: boolean;
};

function Message({
  id = 0,
  userMessage = false,
  text = "something",
  sent = false,
}: Props) {
  const messageStyle = userMessage
    ? "bg-blue-400 text-white rounded-bl-lg rounded-tl-lg rounded-tr-lg mb-2 max-w-md"
    : "bg-gray-100 text-gray-700 rounded-bl-lg rounded-br-lg rounded-tr-lg mb-2 max-w-md";
  const dotStyle = sent ? "bg-green-500" : "bg-gray-400";
  return (
    <div className={`flex ${userMessage ? "justify-end" : "justify-start"}`}>
      <div className={`${messageStyle} relative`}>
        <p className="px-4 py-2">{text}</p>
        <div
          className={`h-1 w-1 rounded-full absolute ${dotStyle} ${
            userMessage ? " bottom-1 right-1" : "top-1 left-1"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Message;
