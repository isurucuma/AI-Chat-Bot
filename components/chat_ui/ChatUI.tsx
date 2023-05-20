"use client";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import UserInputField from "./UserInputField";
import { createContext, useState } from "react";
import { IMessage } from "../../common-types/types";
import { dummyMessages } from "@/common-types/dummy-data";

type Props = {
  className?: string;
};

type ChatContextType = {
  systemMessage: string;
  setSystemMessage: React.Dispatch<React.SetStateAction<string>>;
  chatHistory: IMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<IMessage[]>>;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatContext = createContext<ChatContextType>({
  systemMessage: "",
  setSystemMessage: () => {},
  chatHistory: [],
  setChatHistory: () => {},
  userMessage: "",
  setUserMessage: () => {},
});

// can do the samething in this way also but make sure to access the context inside the providers only
// export const ChatContext = createContext<ChatContextType>({} as ChatContextType)

function ChatUI({ className }: Props) {
  const [systemMessage, setSystemMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<IMessage[]>(dummyMessages); // TODO: remove dummy messages in production
  const [userMessage, setUserMessage] = useState("");
  return (
    <ChatContext.Provider
      value={{
        systemMessage,
        setSystemMessage,
        chatHistory,
        setChatHistory,
        userMessage,
        setUserMessage,
      }}
    >
      <section
        className={`grid grid-rows-10 lg:h-[650px] lg:w-[450px] border p-4 mx-4 my-4 rounded-2xl shadow-2xl overflow-hidden ${className}`}
      >
        <ChatHeader />
        <MessageContainer />
        <UserInputField />
      </section>
    </ChatContext.Provider>
  );
}

export default ChatUI;
