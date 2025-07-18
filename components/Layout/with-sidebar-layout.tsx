"use client";

import { LogoutButton } from "../logout-button";
import Sidebar from "../sidebar";
import { usePathname } from "next/navigation";

const hiddenSidebarRoutes = [
  "/protected/product/add",
  "/protected/product/edit",
];

export default function Layout({
  children,
  isAdmin,
}: Readonly<{
  children: React.ReactNode;
  isAdmin: boolean;
}>) {
  const pathname = usePathname();

  const hideSidebar = hiddenSidebarRoutes.includes(pathname);

  return (
    <main className="min-h-screen flex w-screen">
      {!hideSidebar && <Sidebar isAdmin={isAdmin} />}
      <div
        className={`flex-1 flex flex-col w-full ${hideSidebar ? "" : "ml-16"}`}
      >
        {children}
      </div>
      <div className="fixed top-4 right-4">
        <LogoutButton/>
      </div>
    </main>
  );
}
