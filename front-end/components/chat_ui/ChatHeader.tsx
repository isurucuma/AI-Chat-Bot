import Image from "next/image";
import React from "react";
import avatar from "../../public/avatar.png";
import { IoIosArrowDown } from "react-icons/Io";
type Props = {
  className?: string;
};

function ChatHeader({ className }: Props) {
  return (
    <div
      className={`grid grid-cols-4 row-span-1 pl-4 relative max-h-28 ${className}`}
    >
      <div className="h-full col-span-1 flex flex-col justify-center">
        <Image src={avatar} alt="avatar" style={{ borderRadius: "50%" }} />
      </div>
      <div className="ml-8 mt-3 col-span-3">
        <h1 className="text-xl font-bold">Chat bot</h1>
        <p className="text-sm text-slate-400">I am your online assistant</p>
      </div>
      <IoIosArrowDown className="absolute top-3 right-3 h-5 w-5 hover:shadow-lg border border-none rounded-full transition duration-150 hover:ease-in" />
    </div>
  );
}

export default ChatHeader;
