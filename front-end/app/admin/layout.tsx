"use client";
import NavBar from "@/components/page_items/NavBar";
import React, { createContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthLevel } from "@/common-types/types";

type User = {
  name?: string;
  authLevel: AuthLevel;
};

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: {
    authLevel: AuthLevel.NORMAL,
    name: "Guest",
  },
  setUser: () => {},
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    authLevel: AuthLevel.ADMIN,
    name: "Guest",
  });
  const router = useRouter();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <div className="flex flex-col">
        <NavBar className="flex-initial px-14 pt-3" />
        <div className="flex-1 mx-10">{children}</div>
      </div>
    </AuthContext.Provider>
  );
}
