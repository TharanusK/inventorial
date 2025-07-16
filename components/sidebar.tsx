"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Activity } from "lucide-react";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = [
  { href: "/protected/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  {
    href: "/protected/activity",
    icon: <Activity />,
    label: "Activity Logs",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-16 bg-primary flex flex-col items-center py-6 space-y-6 text-white">
      <div>
        <Image
          src="/Icons/inventorial-icon.svg"
          alt="logo"
          width={24}
          height={24}
          className="mb-4"
        />
        <div className="flex-1 border-t-2 border-muted" />
      </div>

      {navItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === href
              ? "bg-white text-black"
              : "hover:bg-violet-400 text-white"
          }`}
          title={label}
        >
          {icon}
        </Link>
      ))}
      <ThemeSwitcher />
    </aside>
  );
}
