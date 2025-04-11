"use client";

import { signOut } from "next-auth/react";
import { TertiaryButton } from "~/app/_components/buttons";

export default function LogoutButton() {
  return (
    <TertiaryButton onClick={() => signOut({ callbackUrl: "/" })}>
      Sign Out
    </TertiaryButton>
  );
}
