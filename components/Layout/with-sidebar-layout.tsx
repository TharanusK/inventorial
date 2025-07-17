"use client";

import Sidebar from "../sidebar";
import { usePathname } from "next/navigation";

const hiddenSidebarRoutes = ["/protected/product/add"];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideSidebar = hiddenSidebarRoutes.includes(pathname);

  return (
    <main className="min-h-screen flex ">
      {!hideSidebar && <Sidebar />}
      <div
        className={`flex-1 flex flex-col w-full ${hideSidebar ? "" : "ml-16"}`}
      >
        {children}
      </div>
    </main>
  );
}
