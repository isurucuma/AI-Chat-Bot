"use client";
import React, { useState, useContext } from "react";
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

  const handleConfirmUpload = async () => {
    // Implement your logic for confirming and uploading the file
    file &&
      (async () => {
        console.log("File uploaded:", file);
        const formData = new FormData();
        formData.append("file", file);

        // This way the file is sent as a binary file to the backend
        // const response = await fetch("/api/upload", {
        //   method: "POST",
        //   body: formData,
        // });

        // This is only for the demo
        const response = new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            resolve(
              JSON.stringify({
                success: true,
                message: `File: ${file.name} uploaded successfully`,
                fileDetails: {
                  fileName: file.name,
                  size: Math.ceil(file.size / 1000).toString() + " KB",
                  uploadedAt: new Date().toLocaleString(),
                  uploadedBy: "Admin",
                },
              })
            );
            // reject(
            //   JSON.stringify({ success: false, message: "File upload failed" })
            // );
          }, 1000);
        });

        response
          .then((data) => {
            console.log(data);
            const parsedData = JSON.parse(data);
            const newUploadedFile: TUploadedFile = parsedData.fileDetails;
            setUploadedFiles((prevUploadedFiles) => [
              ...prevUploadedFiles,
              newUploadedFile,
            ]);
            setFile(undefined);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
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
            <p className="text-gray-500/60">Drag file to upload</p>
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
