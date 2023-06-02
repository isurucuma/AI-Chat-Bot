import NavButton from "@/components/micro_items/NavButton";
import React from "react";
import { BsDatabaseCheck } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";
import { FaKey } from "react-icons/fa";

type Props = {
  className?: string;
};

function VerticalNav({ className }: Props) {
  return (
    <div>
      <div className={`${className}`}>
        <NavButton name="Knowledge" ButtonIcon={BsDatabaseCheck} isSelected />
        <NavButton name="Activity" ButtonIcon={BsPlayCircle} />
        <NavButton name="Keys" ButtonIcon={FaKey} />
      </div>
    </div>
  );
}

export default VerticalNav;
