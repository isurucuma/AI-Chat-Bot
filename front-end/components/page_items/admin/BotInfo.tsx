"use client";
import Button from "@/components/micro_items/Button";
import React, { useState, useEffect } from "react";

type Props = {
  className?: string;
};

function BotInfo({ className }: Props) {
  const [botName, setbotName] = useState("");
  const [botRole, setbotRole] = useState("");
  const [botStyle, setbotStyle] = useState("");
  const [botTone, setbotTone] = useState("");

  // use Efect for load the data from the database
  // api: localhost:3002/getMetaDta
  useEffect(() => {
    fetch("http://localhost:3002/getMetaDta")
      .then((response) => response.json())
      .then((data) => {
        setbotName(data.metaData.bot_name);
        setbotRole(data.metaData.bot_role);
        setbotStyle(data.metaData.bot_style);
        setbotTone(data.metaData.bot_tone);
      });
  }, []);

  // use this method to handle the update button click
  const handleUpdateButtonClink = () => {
    console.log(botName, botRole, botStyle, botTone);
    fetch("http://localhost:3002/updateMetaDta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bot_name: botName,
        bot_role: botRole,
        bot_style: botStyle,
        bot_tone: botTone,
      }),
    })  
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      }
      );
  };

  let labelStyles = `col-span-1 text-lg text-slate-600 px-2 py-1`;
  let inputStyles = `col-span-4 border-2 border-gray-300 rounded-lg px-2 py-1`;
  let formItemStyles = `grid grid-cols-5`;
  return (
    <div className={`grid grid-cols-6 ${className}`}>
      <form className="col-span-4 flex flex-col gap-2 px-6">
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot name</label>
          <input
            className={`${inputStyles}`}
            onChange={(event) => {
              setbotName(event.target.value);
            }}
            value={botName}
          />
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot role</label>
          <input
            className={`${inputStyles}`}
            onChange={(event) => {
              setbotRole(event.target.value);
            }}
            value={botRole}
          />
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot style</label>
          <input
            className={`${inputStyles}`}
            onChange={(event) => {
              setbotStyle(event.target.value);
            }}
            value={botStyle}
          />
        </div>
        <div className={formItemStyles}>
          <label className={labelStyles}>Bot tone</label>
          <input
            className={`${inputStyles}`}
            onChange={(event) => {
              setbotTone(event.target.value);
            }}
            value={botTone}
          />
        </div>
        {/* <div className={formItemStyles}>
          <label className={labelStyles}>Constraints</label>
          <input
            className={`${inputStyles}`}
            onChange={(event) => {
              setbotConstraints(event.target.value);
            }}
            value={botConstraints}
          />
        </div> */}
      </form>
      <div className="col-span-2">
        <div className="border-[1px] border-dashed border-red-500 rounded-md px-8 py-4 text-center text-gray-600">
          Remember not to update these fields frequently as it cause the whole
          system to be re-create which costs many tokens
        </div>
        <Button
          name="Update"
          className="mt-4"
          onClick={handleUpdateButtonClink}
        />
      </div>
    </div>
  );
}

export default BotInfo;
