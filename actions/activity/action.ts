"use server";

import { createClient } from "@/lib/supabase/server";

type GetActivityLogsOptions = {
  search?: string;
  actionType?: "Added" | "Edited" | "Deleted" | "All actions";
};

export async function getActivityLogs(options: GetActivityLogsOptions = {}) {
  const supabase = await createClient();
  const { search, actionType } = options;

  let query = supabase
    .from("activity_logs")
    .select(
      `
      id,
      user_id(user_name),
      action,
      change_detail,
      created_at,
      product_id
    `
    )
    .order("created_at", { ascending: false });

  if (actionType && actionType !== "All actions") {
    const actionMap: Record<string, string> = {
      Added: "add_product",
      Edited: "edit_product",
      Deleted: "delete_product",
    };
    query = query.eq("action", actionMap[actionType]);
  }

  const { data: logs, error } = await query;
  if (error || !logs) {
    console.error("Error fetching logs:", error);
    return [];
  }

  // Step 1: Get product info for all logs (for non-deleted ones)
  const productIds = [
    ...new Set(logs.map((log) => log.product_id).filter(Boolean)),
  ];

  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name, sku")
    .in("id", productIds);

  if (productError) {
    console.error("Error fetching products:", productError);
  }

  const productMap = Object.fromEntries(
    (products || []).map((product) => [product.id, product])
  );

  // Step 2: Filter and enrich logs
  const filtered = logs
    .filter((log) => {
      if (!search) return true;
      const keyword = search.toLowerCase();
      return (
        log.user_id?.user_name.toLowerCase().includes(keyword) ||
        log.change_detail.toLowerCase().includes(keyword) ||
        productMap[log.product_id]?.name?.toLowerCase().includes(keyword) ||
        productMap[log.product_id]?.sku?.toLowerCase().includes(keyword)
      );
    })
    .map((log) => ({
      ...log,
      product: productMap[log.product_id] || null, // merged product info
    }));

  return filtered;
}
