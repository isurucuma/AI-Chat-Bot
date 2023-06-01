"use client";
import React, { useState } from "react";

type Props = {};

function DocumentUpload({}: Props) {
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

  const handleConfirmUpload = () => {
    // Implement your logic for confirming and uploading the file
    console.log("File uploaded:", file);
    setFile(undefined);
  };

  return (
    <div className="flex flex-row">
      <div
        className={`border-2 border-dashed rounded-lg p-4 ${
          isDragging ? "bg-gray-200" : "bg-white"
        }`}
        onDragEnter={(event) => handleDragEnter(event)}
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(event) => handleDrop(event)}
      >
        {!file ? (
          <>
            <p className="text-gray-500">Drag file to upload</p>
            <input type="file" className="hidden" />
          </>
        ) : (
          <>
            <p className="mb-2">File: {file.name}</p>
          </>
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={handleConfirmUpload}
        disabled={!file}
      >
        Confirm Upload
      </button>
    </div>
  );
}

export default DocumentUpload;
