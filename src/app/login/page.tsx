import { redirect } from "next/navigation";
import { TextLink } from "~/app/_components/buttons";
import { createClient } from "~/utils/supabase-server";
import AuthButton from "~/app/_components/AuthButton";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] px-6 py-12 text-[#111111] md:px-12 lg:px-24 dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-6 left-6 z-10 md:left-12 lg:left-24">
        <TextLink href="/" title="To home page">
          ← Back
        </TextLink>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
        <div className="animate-fade-in w-full">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Sign in to coStruct
            </h1>
            <h2 className="mt-3 text-lg text-[#4B8DF8] dark:text-[#00FFD1]">
              Enter your credentials to access your account
            </h2>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md transition-all dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
            <h2 className="mb-6 text-xl font-semibold text-[#4B8DF8] dark:text-[#00FFD1]">
              Account Access
            </h2>
            <AuthButton />
          </div>

          <div className="mt-8 text-center" style={{ animationDelay: "0.3s" }}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By signing in, you agree to our
              <a
                href="#"
                className="ml-1 text-[#4B8DF8] hover:text-[#3A6BC4] dark:text-[#00FFD1] dark:hover:text-[#00CCAA]"
              >
                Terms of Service
              </a>
              <span className="mx-1">and</span>
              <a
                href="#"
                className="text-[#4B8DF8] hover:text-[#3A6BC4] dark:text-[#00FFD1] dark:hover:text-[#00CCAA]"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
