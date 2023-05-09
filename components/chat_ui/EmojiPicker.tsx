import React from "react";
import { RiEmotionNormalLine } from "react-icons/ri";

type Props = {
  onSelect: (emoji: string) => void;
  className?: string;
};

const EmojiPicker = ({ onSelect, className }: Props) => {
  const [emojis] = React.useState([
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "🙂",
    "🤗",
    "🤔",
    "🤨",
    "😐",
    "😑",
    "😶",
    "🙄",
    "😏",
    "😣",
    "😥",
    "😮",
    "🤐",
    "😯",
    "😪",
    "😫",
    "😴",
    "😌",
    "🤓",
    "😛",
    "😜",
    "😝",
    "🤤",
    "😒",
    "😓",
    "😔",
    "😕",
    "🙃",
    "🤑",
    "😲",
    "🙁",
    "😖",
    "😞",
    "😟",
    "😤",
    "😢",
    "😭",
    "😦",
    "😧",
    "😨",
    "😩",
    "🤯",
    "😬",
    "😰",
    "😱",
    "🥵",
    "🥶",
    "😳",
    "🤪",
    "😵",
    "🥴",
    "🥺",
    "🤢",
    "🤮",
    "🤡",
    "👹",
    "👺",
    "💩",
    "👻",
    "💀",
    "👽",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
  ]);

  return (
    <div className={`p-2 bg-gray-100 rounded-lg shadow-md ${className}`}>
      <button
        type="button"
        className="p-1 text-gray-800"
        onClick={(event) => onSelect}
      ></button>
      <div className="grid grid-cols-8 gap-1 p-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className="w-8 h-8 p-1 rounded-full text-center hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
