import React from "react";
import { IconType } from "react-icons";

type Props = {
  name: string;
  className?: string;
  isSelected?: boolean;
  ButtonIcon: IconType;
  onClick: (event: React.MouseEvent) => void;
};

function NavButton({
  name,
  className,
  isSelected = false,
  ButtonIcon,
  onClick: handleClick,
}: Props) {
  return (
    <div
      className={`flex items-center flex-col hover:text-slate-200 transition duration-200 cursor-pointer ${
        isSelected ? `text-slate-300` : `text-slate-500`
      } ${className} gap-2 px-2 py-1 border-b-2 border-transparent hover:border-slate-3}`}
      onClick={handleClick}
    >
      <div className={`${className} text-lg py-1px-3`}>
        <ButtonIcon className="text-4xl h-10" />
      </div>
      <h2 className="t">{name}</h2>
    </div>
  );
}

export default NavButton;
