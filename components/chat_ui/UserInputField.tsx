"use client";

import React from "react";
import { RiAttachmentLine, RiEmotionLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "./EmojiPicker";

type Props = {};

function UserInputField({}: Props) {
  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle send message
    console.log(`Sending message: ${message}`);
    setMessage("");
  };

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
        onSelect={(emoji: string) => {
          setMessage(message + emoji);
        }}
        className={`absolute bottom-16 right-4 h-96 overflow-scroll transition-all ease-in duration-300 transform ${
          showEmojiPicker ? "" : "hidden"
        }`}
      />
    </div>
  );
}

export default UserInputField;
