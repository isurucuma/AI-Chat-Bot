"use client";
import React, { useState, useContext, useEffect, use } from "react";
import Button from "@/components/micro_items/Button";
import { knowledgePageContext } from "@/components/page_items/admin/KnowledgePageContainer";
import { TUploadedFile } from "@/common-types/types";

type Props = {
  className?: string;
};

function DocumentUpload({ className }: Props) {
  const { uploadedFiles, setUploadedFiles } = useContext(knowledgePageContext);
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
    fetch("http://localhost:3002/updatePDF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      }
      );
  };

  useEffect(() => {
    fillFilesTable();
  }, []);

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <div
        className={`flex-1 border-2 border-dashed rounded-lg p-4 h-32 flex items-center justify-center ${isDragging ? "bg-gray-200" : "bg-white"
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
      <div className="flex-initial flex gap-10 justify-between pl-8">
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
        <button className="bg-red-600 text-white px-4 rounded py-2" onClick={handleRetrainModel}>Retrain Model</button>
      </div>
    </div>
  );
}

export default DocumentUpload;
