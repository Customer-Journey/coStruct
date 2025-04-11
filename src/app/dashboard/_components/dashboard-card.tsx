"use client";

import { PrimaryButton } from "~/app/_components/buttons";

export function DashboardCardClient() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
      <h2 className="mb-3 text-xl font-semibold">Your Projects</h2>
      <p className="text-gray-600 dark:text-gray-400">
        You currently have no active projects.
      </p>
      <PrimaryButton className="mt-4">Create Project</PrimaryButton>
    </div>
  );
}
