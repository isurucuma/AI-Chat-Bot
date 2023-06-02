import React from "react";
import { GiConcentrationOrb } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

type Props = {
  className?: string;
};

function NavBar({ className }: Props) {
  return (
    <nav className={`${className} flex flex-row justify-between`}>
      <div className="flex flex-col items-center pl-9">
        <GiConcentrationOrb className="text-4xl" />
        <h1>DEV-AI</h1>
      </div>
      <div className="flex flex-row items-center pl-9 gap-2">
        <FaUserAlt className="text-2xl" />
        <h1>ADMIN</h1>
      </div>
    </nav>
  );
}

export default NavBar;
