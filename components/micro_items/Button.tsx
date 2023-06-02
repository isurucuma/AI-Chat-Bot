import React from "react";

type Props = {
  name: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ name, className, onClick, disabled }: Props) {
  return (
    <button
      className={`${className} border-2 rounded-lg border-gray-100 text-lg py-1 bg-sky-700 text-slate-200 px-3`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default Button;
