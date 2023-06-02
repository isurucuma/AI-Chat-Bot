"use client";
import Button from "@/components/micro_items/Button";
import React, { useState } from "react";

type Props = {
  className?: string;
};

function DocumentUpload({ className }: Props) {
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
    <div className={`flex flex-row items-center ${className}`}>
      <div
        className={`flex-1 border-2 border-dashed rounded-lg p-4 h-32 flex items-center justify-center ${
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
      <div className="flex-1 flex pl-8 h-fit">
        <Button
          className="bg-blue-500 text-white px-4 rounded py-4"
          onClick={handleConfirmUpload}
          disabled={!file}
          name="Confirm Upload"
        />
      </div>
    </div>
  );
}

export default DocumentUpload;
