import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Sidebar from "@/components/sidebar";

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

  return (
    <main className="min-h-screen flex flex-col items-center">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        {children}
      </div>
      <ThemeSwitcher />
    </main>
  );
}
