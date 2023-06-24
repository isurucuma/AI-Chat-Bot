"use client";
import React, { useState, useContext, useEffect, use } from "react";
import Button from "@/components/micro_items/Button";
import { knowledgePageContext } from "@/components/page_items/admin/KnowledgePageContainer";
import { TUploadedFile } from "@/common-types/types";
import { time } from "console";

type Props = {
  className?: string;
};

enum TrainingStatus {
  NOT_STARTED,
  SUCCESSFUL,
  IN_PROGRESS,
  ERROR,
}

function DocumentUpload({ className }: Props) {
  const {
    uploadedFiles,
    setUploadedFiles,
    isRetraining,
    setIsRetraining,
    trainingStatus,
    setTrainingStatus,
  } = useContext(knowledgePageContext);

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const fillFilesTable = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/files");
      const data = await response.json();
      console.log(data);
      const uploadedFiles: TUploadedFile[] = data.map((file: any) => {
        const joinedFilename = file.fileName;
        let uploadedFile: TUploadedFile = {
          fileName: joinedFilename,
          size: file.size,
          uploadedAt: new Date(file.uploadedAt).toLocaleString(),
          uploadedBy: file.uploadedBy,
        };
        return uploadedFile;
      });
      setUploadedFiles(uploadedFiles);
    } catch (error) {
      console.error("An error occurred during fetching file list:", error);
    }
  };

  const handleConfirmUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        // Send the file as a binary file to the backend
        const response = await fetch("http://localhost:3001/api/v1/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
        // just call to fill the files table
        await fillFilesTable();
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  const handleRetrainModel = async () => {
    setIsRetraining(true);
    setTrainingStatus(TrainingStatus.IN_PROGRESS);
    try {
      const response = await fetch("http://localhost:3002/updatePDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonRes = await response.json();
      console.log(jsonRes);
      setTrainingStatus(TrainingStatus.SUCCESSFUL);
    } catch (error) {
      console.error("An error occurred during retraining process:", error);
      setTrainingStatus(TrainingStatus.ERROR);
    } finally {
      setIsRetraining(false);
    }
  };

  useEffect(() => {
    fillFilesTable();
  }, []);

  const handleAlertCloseButtonClick = () => {
    setTrainingStatus(TrainingStatus.NOT_STARTED);
  };

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <div className="fixed bottom-2 right-16 ">
        {isRetraining && trainingStatus === TrainingStatus.IN_PROGRESS && (
          <div
            id="alert-1"
            className="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 "
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
              Training process is going on. Please wait...
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
        {!isRetraining && trainingStatus === TrainingStatus.SUCCESSFUL && (
          <div
            id="alert-3"
            className="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 "
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
              Training process is completed successfully.
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
        {!isRetraining && trainingStatus === TrainingStatus.ERROR && (
          <div
            id="alert-2"
            className="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 "
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
              Training process failed. Please contact the developer.
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
      </div>

      <div
        className={`${
          isRetraining && "pointer-events-none"
        } flex-1 border-2 border-dashed rounded-lg p-4 h-32 flex items-center justify-center ${
          isDragging ? "bg-gray-200" : "bg-white"
        }`}
        onDragEnter={(event) => handleDragEnter(event)}
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(event) => handleDrop(event)}
      >
        {!file ? (
          <>
            <p className="text-gray-500/60">Drag file to upload</p>
            <input type="file" className="hidden" />
          </>
        ) : (
          <>
            <p className="mb-2">File: {file.name}</p>
          </>
        )}
      </div>
      <div
        className={`${
          isRetraining && "pointer-events-none"
        } flex-initial flex gap-10 justify-between pl-8`}
      >
        <Button
          className="bg-blue-500 text-white px-4 rounded py-4"
          onClick={handleConfirmUpload}
          disabled={!file}
          name="Confirm Upload"
        />
        {/* <Button
          className="bg-red-600 text-white px-4 rounded py-2"
          onClick={handleRetrainModel}
          // disabled={!file}
          disabled={false}
          name="Retrain Model"
        /> */}
        <button
          className="bg-red-600 text-white px-4 rounded py-2"
          onClick={handleRetrainModel}
        >
          Retrain Model
        </button>
      </div>
    </div>
  );
}

export default DocumentUpload;
