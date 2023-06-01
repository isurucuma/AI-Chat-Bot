"use client";
import React from "react";
import { BsTrashFill } from "react-icons/bs";

type File = {
  fileName: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
};

type FileListProps = {
  files?: File[];
};

const FileList: React.FC<FileListProps> = ({ files }) => {
  if (!files) {
    files = [
      {
        fileName: "file1.pdf",
        size: "1.2 MB",
        uploadedAt: "2021-01-01 12:00:00",
        uploadedBy: "John Doe",
      },
      {
        fileName: "file2.pdf",
        size: "1.2 MB",
        uploadedAt: "2021-01-01 12:00:00",
        uploadedBy: "John Doe",
      },
    ];
  }
  const handleDeleteFile = (fileName: string) => {
    // Implement your logic for deleting the file
    console.log("Deleting file:", fileName);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="py-2 px-4">Select</th>
          <th className="py-2 px-4">File Name</th>
          <th className="py-2 px-4">Size</th>
          <th className="py-2 px-4">Uploaded At</th>
          <th className="py-2 px-4">Uploaded By</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files &&
          files.map((file, index) => (
            <tr key={index}>
              <td className="py-2 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4">{file.fileName}</td>
              <td className="py-2 px-4">{file.size}</td>
              <td className="py-2 px-4">{file.uploadedAt}</td>
              <td className="py-2 px-4">{file.uploadedBy}</td>
              <td className="py-2 px-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteFile(file.fileName)}
                >
                  <BsTrashFill size={18} />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default FileList;
