import NavButton from "@/components/micro_items/NavButton";
import React from "react";
import { BsDatabaseCheck } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { NavSelection } from "@/common-types/types";

type Props = {
  className?: string;
  navSelection: NavSelection;
  setNavSelection: (navSelection: NavSelection) => void;
};

function VerticalNav({ className, navSelection, setNavSelection }: Props) {
  return (
    <div>
      <div className={`${className}`}>
        <NavButton
          name="Knowledge"
          ButtonIcon={BsDatabaseCheck}
          isSelected={navSelection === NavSelection.knowledgeBase}
          onClick={(event) => {
            setNavSelection(NavSelection.knowledgeBase);
          }}
        />
        <NavButton
          name="Activity"
          ButtonIcon={BsPlayCircle}
          isSelected={navSelection === NavSelection.activity}
          onClick={(event) => {
            setNavSelection(NavSelection.activity);
          }}
        />
        <NavButton
          name="Keys"
          ButtonIcon={FaKey}
          isSelected={navSelection === NavSelection.keys}
          onClick={(event) => {
            setNavSelection(NavSelection.keys);
          }}
        />
      </div>
    </div>
  );
}

export default VerticalNav;
