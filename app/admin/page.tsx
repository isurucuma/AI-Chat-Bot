import BotInfo from "@/components/page_items/admin/BotInfo";
import DocumentUpload from "@/components/page_items/admin/DocumentUpload";
import FileList from "@/components/page_items/admin/FileList";
import React from "react";

type Props = {};

function Admin({}: Props) {
  return (
    <div className="flex flex-row">
      <div className="flex-initial h-full flex flex-col">
        <button>Bot Knowdgebase</button>
        <button>Bot Activity</button>
        <button>Key Management</button>
      </div>
      <div className="flex-1" style={{ minHeight: `calc(100vh - 48px)` }}>
        <BotInfo />
        <div className="h-1 bg-slate-300 w-full border rounded-lg"></div>
        <DocumentUpload />
        <FileList files={undefined} />
      </div>
    </div>
  );
}

export default Admin;
