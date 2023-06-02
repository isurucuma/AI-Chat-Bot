import Button from "@/components/micro_items/Button";
import React from "react";

type Props = {
  className?: string;
};

function BotInfo({ className }: Props) {
  let labelStyles = `col-span-1 text-lg text-slate-600 px-2 py-1`;
  let inputStyles = `col-span-4 border-2 border-gray-300 rounded-lg px-2 py-1`;
  let formItemStyles = `grid grid-cols-5`;
  return (
    <div className={`grid grid-cols-6 ${className}`}>
      <form className="col-span-4 flex flex-col gap-2 px-6">
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot name</label>
          <input className={`${inputStyles}`}></input>
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot role</label>
          <input className={`${inputStyles}`}></input>
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot style</label>
          <input className={`${inputStyles}`}></input>
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot tone</label>
          <input className={`${inputStyles}`}></input>
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Constraints</label>
          <input className={`${inputStyles}`}></input>
        </div>
      </form>
      <div className="col-span-2">
        <div className="border-[1px] border-dashed border-red-500 rounded-md px-8 py-4 text-center text-gray-600">
          Remember not to update these fields frequently as it cause the whole
          system to be re-create which costs many tokens
        </div>
        <Button name="Update" className="mt-4" />
      </div>
    </div>
  );
}

export default BotInfo;
