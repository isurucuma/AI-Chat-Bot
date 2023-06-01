import React from "react";

type Props = {};

function BotInfo({}: Props) {
  // let inputLabels = ["Bot name", "Bot role", "Bot style", "Bot tone", "Constraints"] //all items will not be text inputs
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4">
        <div className="grid grid-cols-5">
          <h3 className="col-span-1">Bot name</h3>
          <input className="h-6"></input>
        </div>
        <div className="grid grid-cols-5">
          <h3 className="col-span-1">Bot role</h3>
          <input className="h-6"></input>
        </div>
        <div className="grid grid-cols-5">
          <h3 className="col-span-1">Bot style</h3>
          <input className="h-6"></input>
        </div>
        <div className="grid grid-cols-5">
          <h3 className="col-span-1">Bot tone</h3>
          <input className="h-6"></input>
        </div>
        <div className="grid grid-cols-5">
          <h3 className="col-span-1">Constraints</h3>
          <input className="h-6"></input>
        </div>
      </div>
      <div className="col-span-2">
        <div>
          Remember not to update these fields frequently as it cause the whole
          system to be recrete which costs many tokens
        </div>
        <button className="h-6">Save</button>
      </div>
    </div>
  );
}

export default BotInfo;
