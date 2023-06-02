import NavButton from "@/components/micro_items/NavButton";
import BotInfo from "@/components/page_items/admin/BotInfo";
import DocumentUpload from "@/components/page_items/admin/DocumentUpload";
import FileList from "@/components/page_items/admin/FileList";
import VerticalNav from "@/components/page_items/admin/VerticalNav";
import React from "react";

type Props = {};

function Admin({}: Props) {
  return (
    <div
      className="flex flex-row my-4 px-4 gap-4"
      style={{ minHeight: `calc(100vh - 40px)` }}
    >
      <VerticalNav className="h-full flex flex-col gap-8 px-4 py-4 border-2 border-gray-300 rounded-3xl bg-sky-950" />
      <div className="flex-1 px-4 py-4 border-2 border-dashed border-gray-500 rounded-lg">
        <BotInfo className="mt-2" />
        <div className="h-0.5 bg-slate-300 border rounded-lg mt-6 mb-4 mx-4"></div>
        <h2 className="text-lg text-gray-600 mt-2 mb-1 ml-8">
          Documents for the bot's knowledge-base
        </h2>
        <DocumentUpload className="mb-4" />
        <FileList files={undefined} />
      </div>
    </div>
  );
}

export default Admin;
