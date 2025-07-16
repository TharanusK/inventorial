"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Activity } from "lucide-react";
import Image from "next/image";
const navItems = [
  { href: "/protected/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  { href: "/protected/activity", icon: <Activity />, label: "Activity Logs" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-16 bg-primary flex flex-col items-center py-6 space-y-6 text-white">
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
          className={`p-2 rounded-lg transition-colors ${
            pathname === href
              ? "border border-background"
              : "hover:border border-background "
          }`}
          title={label}
        >
          {icon}
        </Link>
      ))}
    </aside>
  );
}
