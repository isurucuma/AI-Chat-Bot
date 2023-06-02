import React from "react";
import { IconType } from "react-icons";
import { BsDatabaseCheck } from "react-icons/bs";

type Props = {
  name: string;
  className?: string;
  isSelected?: boolean;
  ButtonIcon: IconType;
};

function NavButton({ name, className, isSelected = false, ButtonIcon }: Props) {
  return (
    <div
      className={`flex items-center flex-col hover:text-slate-300 transition duration-200 ${
        isSelected ? `text-slate-400` : `text-slate-500`
      } ${className} gap-2 px-2 py-1 border-b-2 border-transparent hover:border-slate-3}`}
    >
      <button className={`${className} text-lg py-1px-3`}>
        <ButtonIcon className="text-4xl h-10" />
      </button>
      <h2 className="t">{name}</h2>
    </div>
  );
}

export default NavButton;
