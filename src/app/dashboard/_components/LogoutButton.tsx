"use client";

import { createClient } from "~/utils/supabase-browser";
import { useRouter } from "next/navigation";
import { TertiaryButton } from "~/app/_components/buttons";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return <TertiaryButton onClick={handleSignOut}>Sign Out</TertiaryButton>;
}
