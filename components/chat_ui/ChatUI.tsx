import React from "react";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import UserInputField from "./UserInputField";

type Props = {
  className?: string;
};

function ChatUI({ className }: Props) {
  return (
    <section
      className={`grid grid-rows-10 lg:h-[650px] lg:w-[450px] border p-4 mx-4 my-4 rounded-2xl shadow-2xl overflow-hidden ${className}`}
    >
      <ChatHeader />
      <MessageContainer />
      <UserInputField />
    </section>
  );
}

export default ChatUI;
