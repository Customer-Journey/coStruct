"use client";

import { useState } from "react";
import { createClient } from "~/utils/supabase-browser";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

type UserSettings = {
  id: string;
  email_notifications: boolean;
  theme: string;
};

interface ProfileFormProps {
  profile: Profile | null;
  settings: UserSettings | null;
}

export default function ProfileForm({ profile, settings }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || "",
    bio: profile?.bio || "",
    avatar_url: profile?.avatar_url || "",
    email_notifications: settings?.email_notifications || false,
    theme: settings?.theme || "light",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      // Update profile
      if (profile) {
        await supabase
          .from("profiles")
          .update({
            display_name: formData.display_name,
            bio: formData.bio,
            avatar_url: formData.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", profile.id);
      }

      // Update settings
      if (settings) {
        await supabase
          .from("user_settings")
          .update({
            email_notifications: formData.email_notifications,
            theme: formData.theme,
            updated_at: new Date().toISOString(),
          })
          .eq("id", settings.id);
      }

      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white/10 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Edit Profile</h2>

      <div className="mb-4">
        <label
          htmlFor="display_name"
          className="mb-1 block text-sm font-medium"
        >
          Display Name
        </label>
        <input
          type="text"
          id="display_name"
          name="display_name"
          value={formData.display_name || ""}
          onChange={handleChange}
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="avatar_url" className="mb-1 block text-sm font-medium">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar_url"
          name="avatar_url"
          value={formData.avatar_url || ""}
          onChange={handleChange}
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
        {formData.avatar_url && (
          <div className="mt-2">
            <img
              src={formData.avatar_url}
              alt="Avatar preview"
              className="h-16 w-16 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/150";
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="bio" className="mb-1 block text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          rows={4}
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <h3 className="mb-4 text-xl font-semibold">Settings</h3>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="email_notifications"
          name="email_notifications"
          checked={formData.email_notifications}
          onChange={handleChange}
          className="mr-2 h-5 w-5"
        />
        <label htmlFor="email_notifications" className="text-sm font-medium">
          Receive email notifications
        </label>
      </div>

      <div className="mb-6">
        <label htmlFor="theme" className="mb-1 block text-sm font-medium">
          Theme
        </label>
        <select
          id="theme"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
