"use client";

import { createClient } from "~/utils/supabase-browser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "./buttons";

export default function AuthButton() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      setView("sign-in");
      alert("Check your email for the confirmation link!");
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      {view === "sign-in" ? (
        <>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4B8DF8] focus:ring focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#00FFD1]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4B8DF8] focus:ring focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#00FFD1]"
                placeholder="••••••••"
              />
            </div>
            <div>
              <PrimaryButton
                type="submit"
                disabled={loading}
                className="w-full py-3"
              >
                {loading ? "Signing In..." : "Sign In"}
              </PrimaryButton>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setView("sign-up")}
              className="text-[#4B8DF8] hover:text-[#3A6BC4] hover:underline dark:text-[#00FFD1] dark:hover:text-[#00CCAA]"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4B8DF8] focus:ring focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#00FFD1]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4B8DF8] focus:ring focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#00FFD1]"
                placeholder="••••••••"
              />
            </div>
            <div>
              <PrimaryButton
                type="submit"
                disabled={loading}
                className="w-full py-3"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </PrimaryButton>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setView("sign-in")}
              className="text-[#4B8DF8] hover:text-[#3A6BC4] hover:underline dark:text-[#00FFD1] dark:hover:text-[#00CCAA]"
            >
              Already have an account? Sign in
            </button>
          </div>
        </>
      )}
    </div>
  );
}
