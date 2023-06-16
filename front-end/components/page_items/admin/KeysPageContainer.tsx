"use client";
import Button from "@/components/micro_items/Button";
import React, { useState } from "react";

type Props = {};

function KeysPageContainer({}: Props) {
  const [openApiKey, setOpenApiKey] = useState("");
  const handleSubmit = () => {
    console.log(openApiKey);
    setOpenApiKey("");
  };

  return (
    <div className="mt-40 flex flex-row justify-center gap-20 items-center">
      <form>
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          OpenAI API Key
        </label>
        <input
          className="flex h-10 w-96 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Enter your OpenAI API key"
          id="name"
          value={openApiKey}
          onChange={(e) => setOpenApiKey(e.target.value)}
        ></input>
        <p className="mt-1 text-xs text-gray-500">*This field is required</p>
      </form>
      <Button name="Submit" className="my-8" onClick={handleSubmit} />
    </div>
  );
}

export default KeysPageContainer;
