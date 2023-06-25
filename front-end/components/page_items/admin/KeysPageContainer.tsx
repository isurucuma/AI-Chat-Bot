"use client";
import Button from "@/components/micro_items/Button";
import React, { useState, useEffect } from "react";

type Props = {};
enum KeySubmissionStatusCodes {
  SUCCESS,
  FAILURE,
  IN_PROGRESS,
  NONE,
}

function KeysPageContainer({}: Props) {
  const [openApiKey, setOpenApiKey] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [pageAccessToken, setPageAccessToken] = useState("");
  const [keySubmissionStatus, setKeySubmissionStatus] =
    useState<KeySubmissionStatusCodes>(KeySubmissionStatusCodes.NONE);

  const handleAPIKeySubmit = () => {
    setKeySubmissionStatus(KeySubmissionStatusCodes.IN_PROGRESS);
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
        setKeySubmissionStatus(KeySubmissionStatusCodes.SUCCESS);
      })
      .catch((error) => {
        setKeySubmissionStatus(KeySubmissionStatusCodes.FAILURE);
      });
  };

  const handleSocialMediaTokenSubmit = () => {
    setKeySubmissionStatus(KeySubmissionStatusCodes.IN_PROGRESS);
    fetch("http://localhost:3005/changetoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        VERIFY_TOKEN: verifyToken,
        PAGE_ACCESS_TOKEN: pageAccessToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setKeySubmissionStatus(KeySubmissionStatusCodes.SUCCESS);
      })
      .catch((error) => {
        setKeySubmissionStatus(KeySubmissionStatusCodes.FAILURE);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3002/getKey")
      .then((response) => response.json())
      .then((data) => {
        setOpenApiKey(data.data);
      });

    fetch("http://localhost:3005/gettoken")
      .then((response) => response.json())
      .then((data) => {
        setVerifyToken(data.VERIFY_TOKEN);
        setPageAccessToken(data.PAGE_ACCESS_TOKEN);
      });
  }, []);

  const handleAlertCloseButtonClick = () => {
    setKeySubmissionStatus(KeySubmissionStatusCodes.NONE);
  };

  return (
    <div className="mt-10 h-full relative">
      {keySubmissionStatus != KeySubmissionStatusCodes.NONE &&
        keySubmissionStatus === KeySubmissionStatusCodes.IN_PROGRESS && (
          <div
            id="alert-1"
            className="absolute bottom-8 right-28 flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 "
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              API Keys are getting submitted. Please wait...
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 "
              data-dismiss-target="#alert-1"
              aria-label="Close"
              onClick={handleAlertCloseButtonClick}
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      {keySubmissionStatus != KeySubmissionStatusCodes.NONE &&
        keySubmissionStatus === KeySubmissionStatusCodes.SUCCESS && (
          <div
            id="alert-3"
            className="absolute bottom-8 right-28 flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 "
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              Key submission completed successfully...
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 "
              data-dismiss-target="#alert-3"
              aria-label="Close"
              onClick={handleAlertCloseButtonClick}
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      {keySubmissionStatus != KeySubmissionStatusCodes.NONE &&
        keySubmissionStatus === KeySubmissionStatusCodes.FAILURE && (
          <div
            id="alert-2"
            className="absolute bottom-8 right-28 flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              Key submission failed. Please check and try again...
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
              data-dismiss-target="#alert-2"
              aria-label="Close"
              onClick={handleAlertCloseButtonClick}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      <div className="mt-4 flex flex-row justify-center gap-20 items-center">
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
              placeholder="Enter your Page access token"
              id="name"
              value={pageAccessToken}
              onChange={(e) => setPageAccessToken(e.target.value)}
            ></input>
          </form>
          <form>
            <input
              className="flex h-10 w-96 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your Verify token"
              id="name"
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
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
