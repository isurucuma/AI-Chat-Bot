import React, { use, useContext, useEffect, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "./ChatUI";
type Props = {};

function MessageContainer({}: Props) {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { chatHistory } = useContext(ChatContext);
  useEffect(() => {
    if (messageContainerRef.current) {
      console.log("scroll happened");
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div ref={messageContainerRef} className="row-span-6 overflow-y-auto">
      <div className="flex flex-col space-y-2 p-4">
        {chatHistory.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </div>
  );
}

export default MessageContainer;
