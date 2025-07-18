import { LoginForm } from "@/components/form/auth/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10 ">
      <div className="w-4/5">
        <LoginForm />
      </div>
    </div>
  );
}
