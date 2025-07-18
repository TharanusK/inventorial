"use server";

import { createClient } from "@/lib/supabase/server";
import { ActivityLog } from "@/types/activity";

export async function getActivityLogs(
  search?: string,
  actionType?: string
): Promise<ActivityLog[]> {
  const supabase = await createClient();

  let query = supabase
    .from("activity_logs")
    .select(`*, users(email)`)
    .order("created_at", { ascending: false });

  if (actionType && actionType !== "all") {
    query = query.eq("action", actionType);
  }

  if (search?.trim()) {
    query = query.or(
      `change_detail->>product_name.ilike.%${search}%,users.email.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching activity logs:", error.message);
    return [];
  }

  return data;
}
