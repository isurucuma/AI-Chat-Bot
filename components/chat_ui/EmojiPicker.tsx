import React, { ReactHTMLElement, useEffect, useRef } from "react";
import { RiEmotionNormalLine } from "react-icons/ri";

type Props = {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (showEmojiPicker: boolean) => void;
};

const EmojiPicker = ({
  onEmojiSelect,
  className,
  showEmojiPicker,
  setShowEmojiPicker,
}: Props) => {
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
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={emojiPickerRef}
      className={`p-2 bg-gray-100 rounded-lg shadow-md ${className}`}
    >
      <button
        type="button"
        className="p-1 text-gray-800"
        onClick={(event) => onEmojiSelect}
      ></button>
      <div className="grid grid-cols-8 gap-1 p-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onEmojiSelect(emoji)}
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
