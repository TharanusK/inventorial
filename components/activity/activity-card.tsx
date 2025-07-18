import { ActivityLog } from "@/types/activity";

interface Props {
  log: ActivityLog;
}

export default function ActivityCard({ log }: Readonly<Props>) {
  const detail = JSON.parse(log.change_detail || "{}");
  const productName = detail.product_name || "-";
  const sku = detail.sku || "-";
  const user = log.user_id?.user_name || "-";

  const actionLabels: Record<string, string> = {
    add_product: "Added",
    edit_product: "Edited",
    delete_product: "Deleted",
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card shadow-sm gap-1 flex flex-col">
      <div className="text-sm font-semibold capitalize flex items-center gap-2">
        <div className="bg-primary w-fit rounded-xl px-3 py-2 text-white">
          {actionLabels[log.action] || log.action}
        </div>
        <div>By {user}</div>
      </div>

      {log.action === "edit_product" ? (
        <div className="flex flex-col text-sm text-foreground">
          <strong>Product:</strong> {log.product?.name || "-"} (
          {log.product?.sku || "-"})<strong>Changes:</strong>{" "}
          {Object.entries(detail)
            .map(([key, value]) => `${key.replace(/_/g, " ")} → ${value}`)
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
}
