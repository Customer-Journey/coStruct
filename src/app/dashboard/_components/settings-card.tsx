"use client";

import { SecondaryButton } from "~/app/_components/buttons";

export function SettingsCardClient() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-[#1A1A1A] dark:shadow-[#00FFD1]/5">
      <h2 className="mb-3 text-xl font-semibold">Account Settings</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Manage your profile and preferences.
      </p>
      <SecondaryButton className="mt-4">View Settings</SecondaryButton>
    </div>
  );
}
