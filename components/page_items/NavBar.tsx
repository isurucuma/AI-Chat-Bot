import React from "react";

type Props = {
  className?: string;
};

function NavBar({ className }: Props) {
  return <nav className={`${className} h-12 w-full bg-slate-200`}>NavBar</nav>;
}

export default NavBar;
