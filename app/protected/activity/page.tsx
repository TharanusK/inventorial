"use client";

import { getActivityLogs } from "@/actions/activity/action";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { ActivityLog } from "@/types/activity";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

type ActionTypes = "Added" | "Edited" | "Deleted" | "All actions";

export default function ActivityPage() {
  const [search, setSearch] = useState<string>("");
  const [actionType, setActionType] = useState<ActionTypes>("All actions");
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  console.log("🚀 ~ ActivityPage ~ logs:", logs);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await getActivityLogs({ search, actionType });
      const formattedData = data.map((log) => ({
        ...log,
        user_id: Array.isArray(log.user_id) ? log.user_id[0] : log.user_id,
      }));
      setLogs(formattedData);
      setLoading(false);
    };

    fetchLogs();
  }, [search, actionType]);

  return (
    <div className="flex w-full flex-col min-h-screen p-9 text-center gap-10 sm:text-left">
      <Header title="Activity Log" />

      <div className="flex w-full justify-between">
        <div className="relative w-[55%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <SearchIcon />
          </span>
          <Input
            className="pl-10  bg-card rounded-lg placeholder:text-sm"
            placeholder="Search products or users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value as ActionTypes)}
            className="border border-input text-sm rounded-md px-3 py-2 bg-card items-center"
          >
            <option value="All actions">All Actions</option>
            <option value="Added">Added</option>
            <option value="Edited">Edited</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading activity logs...
          </p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No activity logs found.
          </p>
        ) : (
          logs.map((log) => {
            const detail = JSON.parse(log.change_detail || "{}");
            const productName = detail.product_name || "-";
            const sku = detail.sku || "-";

            return (
              <div
                key={log.id}
                className="border border-border rounded-lg p-4  bg-card shadow-sm gap-1 flex flex-col"
              >
                <div className="text-sm font-semibold capitalize flex items-center gap-2 ">
                  <div className="bg-primary w-fit rounded-xl px-3 py-2 text-white">
                    {
                      {
                        add_product: "Added",
                        edit_product: "Edited",
                        delete_product: "Deleted",
                      }[log.action]
                    }
                  </div>
                  <div> By {log.user_id?.user_name || "-"}</div>
                </div>

                {log.action === "edit_product" ? (
                  <div className="flex flex-col text-sm text-foreground">
                    <strong>Product:</strong> {log.product?.name || "-"} (
                    {log.product?.sku || "-"})<strong>Changes:</strong>
                    {Object.entries(detail)
                      .map(
                        ([key, value]) => `${key.replace(/_/g, " ")} → ${value}`
                      )
                      .join(", ")}
                  </div>
                ) : (
                  <div className="text-sm text-foreground">
                    <strong>Product:</strong> {productName} ({sku})
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
