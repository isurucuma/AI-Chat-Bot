"use client";
import Button from "@/components/micro_items/Button";
import React, { useState, useEffect } from "react";

type Props = {};

function KeysPageContainer({}: Props) {
  const [openApiKey, setOpenApiKey] = useState("");
  const [fbToken, setFbToken] = useState("");
  const [waToken, setWaToken] = useState("");

  const handleAPIKeySubmit = () => {
    fetch("http://localhost:3002/updateKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ openai_api_key: openApiKey }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  };

  const handleSocialMediaTokenSubmit = () => {
    fetch("http://localhost:3002/updateSocialKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fbToken: fbToken, waToken: waToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3002/getKey")
      .then((response) => response.json())
      .then((data) => {
        setOpenApiKey(data.data);
      });
  }, []);

  return (
    <div className="mt-32">
      <div className="mt-8 flex flex-row justify-center gap-20 items-center">
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
        <Button name="Submit" className="my-8" onClick={handleAPIKeySubmit} />
      </div>
      <div className="mt-8 flex flex-row justify-center gap-20 items-center">
        <div>
          <h4 className="text-sm font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Social Media Tokens
          </h4>
          <form className="mb-2">
            <input
              className="flex h-10 w-96 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your WhatsApp token"
              id="name"
              value={waToken}
              onChange={(e) => setWaToken(e.target.value)}
            ></input>
          </form>
          <form>
            <input
              className="flex h-10 w-96 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your Facebook token"
              id="name"
              value={fbToken}
              onChange={(e) => setFbToken(e.target.value)}
            ></input>
          </form>
        </div>

        <Button
          name="Submit"
          className="my-8"
          onClick={handleSocialMediaTokenSubmit}
        />
      </div>
    </div>
  );
}

export default KeysPageContainer;
