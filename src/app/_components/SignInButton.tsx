"use client";

import { TextLink, TertiaryButton } from "./buttons";
import { createClient } from "~/utils/supabase-browser";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

interface SignInButtonProps {
  session: Session | null;
}

export function SignInButton({ session }: SignInButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session) {
    return (
      <div className="animate-fade-in flex items-center gap-4">
        <TextLink
          href="/dashboard"
          className="text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
        >
          Dashboard
        </TextLink>
        <TertiaryButton
          onClick={handleSignOut}
          className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          Sign Out
        </TertiaryButton>
      </div>
    );
  }

  return (
    <TextLink
      href="/login"
      className="animate-fade-in flex items-center text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-1 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
          clipRule="evenodd"
        />
      </svg>
      Sign In
    </TextLink>
  );
}
