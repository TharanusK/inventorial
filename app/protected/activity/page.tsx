"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function ActivityPage() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex w-full flex-col min-h-screen p-9 text-center gap-10 sm:text-left ">
      <Header title="Activity Log" />
      <div className="flex w-full justify-between">
        <div className="relative w-[55%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <SearchIcon />
          </span>
          <Input
            className="pl-10 bg-[#FAFAFA] rounded-lg placeholder:text-sm"
            placeholder="Search products or users email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          {" "}
          <Button
            asChild
            size="sm"
            variant={"default"}
            className="w-fit"
          ></Button>
        </div>
      </div>

      {/* ActivityCard */}
    </div>
  );
}
