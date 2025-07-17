"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import GridViewIcon from "@mui/icons-material/GridView";
import HistoryIcon from "@mui/icons-material/History";
const navItems = [
  { href: "/protected/dashboard", icon: <GridViewIcon />, label: "Dashboard" },
  {
    href: "/protected/activity",
    icon: <HistoryIcon />,
    label: "Activity Logs",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className=" fixed top-0 left-0 h-screen w-16 bg-primary flex flex-col items-center py-6 text-white">
      <div className="flex flex-col items-center space-y-6 flex-1 w-full">
        <div>
          <Image
            src="/Icons/inventorial-icon.svg"
            alt="logo"
            width={24}
            height={24}
            className="mb-4"
          />
          <div className="border-t-2 border-muted w-full" />
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
      </div>

      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </aside>
  );
}
