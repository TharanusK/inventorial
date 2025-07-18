"use server";

type UserWithRole = {
  roles: {
    name: string;
  } | null;
};

import { createClient } from "@/lib/supabase/server";

export async function isUserAdmin(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(`roles ( name )`)
    .eq("id", id)
    .single<UserWithRole>();

  if (error) {
    console.error("Error checking user role:", error.message);
    return false;
  }

  return data?.roles?.name === "admin";
}
