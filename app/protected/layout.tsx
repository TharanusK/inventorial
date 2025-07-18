import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Layout from "@/components/Layout/with-sidebar-layout";
import { isUserAdmin } from "@/actions/auth/action";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Authentication
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const isAdmin = await isUserAdmin(data?.user.id);

  return <Layout isAdmin={isAdmin}>{children}</Layout>;
}
