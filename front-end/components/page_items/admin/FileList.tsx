"use client";
import React, { useContext } from "react";
import { BsTrashFill } from "react-icons/bs";
import { TUploadedFile } from "@/common-types/types";
import { knowledgePageContext } from "@/components/page_items/admin/KnowledgePageContainer";

type FileListProps = {
  files?: TUploadedFile[];
};

function FileList() {
  const { uploadedFiles, setUploadedFiles } = useContext(knowledgePageContext);

  const handleDeleteFile = async (fileName: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/files?fileName=${fileName}`,
        {
          method: "DELETE",
        }
      );
      if (response.status !== 200) {
        throw new Error("An error occurred during deleting file");
      }

      const data = await response.json();

      setUploadedFiles((prev) =>
        prev.filter((file) => file.fileName !== data.fileName)
      );
    } catch (error) {
      console.error("An error occurred during deleting file:", error);
    }
  };

  return (
    <table className="w-full bg-transparent">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left text-blue-600/60">Select</th>
          <th className="py-2 px-4 text-left text-blue-600/60">File Name</th>
          <th className="py-2 px-4 text-left text-blue-600/60">{"Size(kB)"}</th>
          <th className="py-2 px-4 text-left text-blue-600/60">Uploaded At</th>
          <th className="py-2 px-4 text-left text-blue-600/60">Uploaded By</th>
          <th className="py-2 px-4 text-left text-blue-600/60">Actions</th>
        </tr>
      </thead>
      <tbody className="text-slate-600">
        {uploadedFiles &&
          uploadedFiles.map((file, index) => (
            <tr
              key={index}
              className="bg-white border-b border-gray-300 hover:text-slate-900 hover:bg-slate-300/20 transition duratiopn-300"
            >
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
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
}

export default FileList;
