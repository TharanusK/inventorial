"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { getActivityLogs } from "@/actions/activity/action";
import { ActivityLog } from "@/types/activity";
import ActivityFilter from "@/components/activity/activity-filter";
import ActivityList from "@/components/activity/activity-list";

type ActionTypes = "Added" | "Edited" | "Deleted" | "All actions";

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState<ActionTypes>("All actions");
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await getActivityLogs({ search, actionType });
      const formatted = data.map((log) => ({
        ...log,
        user_id: Array.isArray(log.user_id) ? log.user_id[0] : log.user_id,
      }));
      setLogs(formatted);
      setLoading(false);
    };

    fetchLogs();
  }, [search, actionType]);

  return (
    <div className="flex w-full flex-col min-h-screen p-9 text-center gap-10 sm:text-left">
      <Header title="Activity Logs" />
      <ActivityFilter
        search={search}
        setSearch={setSearch}
        actionType={actionType}
        setActionType={setActionType}
      />
      <ActivityList logs={logs} loading={loading} />
    </div>
  );
}
