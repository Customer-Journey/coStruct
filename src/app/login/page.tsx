import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { LoginForm } from "./_components/login-form";
import { TextLink } from "~/app/_components/buttons";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8F9FA] text-[#111111] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
      {/* Back to home link */}
      <div className="absolute top-6 left-6 z-10 md:left-12">
        <TextLink href="/" title="To home page">
          ← Back
        </TextLink>
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="animate-fade-in w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F5F5F5]">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            to access your coStruct dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
