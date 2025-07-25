import { SignUpForm } from "@/components/form/auth/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10 ">
      <div className="w-3/4">
        <SignUpForm />
      </div>
    </div>
  );
}
