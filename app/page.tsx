import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-svh w-full justify-center p-6 md:p-10 ">
        <div className="w-4/5">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
