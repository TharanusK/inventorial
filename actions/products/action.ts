"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products.");
  }

  return data;
}
