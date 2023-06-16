"use client";
import KnowledgePageContainer from "@/components/page_items/admin/KnowledgePageContainer";
import VerticalNav from "@/components/page_items/admin/VerticalNav";
import React, { useContext, useEffect, useState } from "react";
import { NavSelection } from "@/common-types/types";
import ActivityPageContainer from "@/components/page_items/admin/ActivityPageContainer";
import KeysPageContainer from "@/components/page_items/admin/KeysPageContainer";
import { AuthContext } from "./layout";
import { useRouter } from "next/navigation";

type Props = {};
// create an enum to store the nav selection

function Admin({}: Props) {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (user.authLevel !== 0) {
      console.log("User is not admin");
      router.push("/admin/login");
    }
    console.log("Admin page rendered");
  }, [user]);
  const [navSelection, setNavSelection] = useState<NavSelection>(
    NavSelection.knowledgeBase
  );

  return (
    <div
      className="flex flex-row my-4 px-4 gap-4"
      style={{ minHeight: `calc(100vh - 40px)` }}
    >
      <VerticalNav
        className="h-full flex flex-col gap-8 px-4 py-4 border-2 border-gray-300 rounded-3xl bg-sky-950"
        navSelection={navSelection}
        setNavSelection={setNavSelection}
      />
      <div className="flex-1 px-4 py-4 border-2 border-dashed border-gray-500 rounded-lg">
        {navSelection === NavSelection.knowledgeBase && (
          <KnowledgePageContainer />
        )}
        {navSelection === NavSelection.activity && <ActivityPageContainer />}
        {navSelection === NavSelection.keys && <KeysPageContainer />}
      </div>
    </div>
  );
}

export default Admin;
