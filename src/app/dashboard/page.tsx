import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import LogoutButton from "./_components/logout-button";
import { TextLink } from "~/app/_components/buttons";
import { DashboardCardClient } from "./_components/dashboard-card";
import { SettingsCardClient } from "./_components/settings-card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.email !== "c.vium.olesen@gmail.com") {
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

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-4">
              <TextLink href="/">Main Page</TextLink>
              <LogoutButton />
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg bg-white p-8 shadow-md transition-all dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
              <h2 className="mb-4 text-2xl font-semibold text-[#4B8DF8] dark:text-[#00FFD1]">
                Thank you for your interest in coStruct, Inc.!
              </h2>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We&apos;re currently in the process of shipping our MVP and
                finalizing our platform.
              </p>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                If you&apos;re an investor interested in learning more about
                coStruct, we&apos;d be happy to share our investor deck with
                you.
              </p>

              <div className="rounded-md bg-gray-50 p-4 dark:bg-[#252525]">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Please email{" "}
                  <a
                    href="mailto:c.vium.olesen@gmail.com"
                    className="text-[#4B8DF8] underline hover:text-[#3A6BC4] dark:text-[#00FFD1] dark:hover:text-[#00CCAA]"
                  >
                    c.vium.olesen@gmail.com
                  </a>{" "}
                  to request our investor presentation and learn more about our
                  vision, roadmap, and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4">
            <TextLink href="/">Main Page</TextLink>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
            <h2 className="mb-3 text-xl font-semibold">Welcome back!</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You are logged in as{" "}
              <span className="font-medium text-[#4B8DF8] dark:text-[#00FFD1]">
                {session.user.email}
              </span>
            </p>
          </div>

          <DashboardCardClient />
          <SettingsCardClient />
        </div>
      </div>
    </div>
  );
}
