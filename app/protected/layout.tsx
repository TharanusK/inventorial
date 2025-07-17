import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Layout from "@/components/Layout/with-sidebar-layout";

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

  return <Layout>{children}</Layout>;
}
