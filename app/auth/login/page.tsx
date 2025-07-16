import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10 ">
      <div className="w-3/4">
        <LoginForm />
      </div>
    </div>
  );
}
