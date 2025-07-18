import { ActivityLog } from "@/types/activity";
import ActivityCard from "./activity-card";

interface Props {
  logs: ActivityLog[];
  loading: boolean;
}

export default function ActivityList({ logs, loading }: Readonly<Props>) {
  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading activity logs...</p>
    );
  }

  if (logs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No activity logs found.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {logs.map((log) => (
        <ActivityCard key={log.id} log={log} />
      ))}
    </div>
  );
}
