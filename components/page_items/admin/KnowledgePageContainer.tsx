import React, { createContext, useState } from "react";
import BotInfo from "./BotInfo";
import DocumentUpload from "./DocumentUpload";
import FileList from "./FileList";
import { TUploadedFile } from "@/common-types/types";
import { dummyUploadedFiles } from "@/common-types/dummy-data";

type Props = {};

type KnowledgePageContextType = {
  uploadedFiles: TUploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<TUploadedFile[]>>;
};

export const knowledgePageContext = createContext<KnowledgePageContextType>({
  uploadedFiles: [],
  setUploadedFiles: () => {},
});

function PageContainer({}: Props) {
  const [uploadedFiles, setUploadedFiles] =
    useState<TUploadedFile[]>(dummyUploadedFiles);

  return (
    <knowledgePageContext.Provider
      value={{
        uploadedFiles: uploadedFiles,
        setUploadedFiles: setUploadedFiles,
      }}
    >
      <BotInfo className="mt-2" />
      <div className="h-0.5 bg-slate-300 border rounded-lg mt-6 mb-4 mx-4"></div>
      <h2 className="text-lg text-gray-600 mt-2 mb-1 ml-8">
        Documents for the bot's knowledge-base
      </h2>
      <DocumentUpload className="mb-4" />
      <FileList />
    </knowledgePageContext.Provider>
  );
}

export default PageContainer;
