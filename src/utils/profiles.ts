import { createClient } from "./supabase-browser";

export type Profile = {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
};

export async function getUserProfile() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return data as Profile;
}

export async function updateUserProfile(
    updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", (await supabase.auth.getUser()).data.user?.id || "")
        .select()
        .single();

    if (error) {
        console.error("Error updating profile:", error);
        return null;
    }

    return data as Profile;
}

export type UserSettings = {
    id: string;
    email_notifications: boolean;
    theme: string;
    created_at: string;
    updated_at: string;
};

export async function getUserSettings() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .single();

    if (error) {
        console.error("Error fetching settings:", error);
        return null;
    }

    return data as UserSettings;
}

export async function updateUserSettings(
    updates: Partial<Omit<UserSettings, "id" | "created_at" | "updated_at">>
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user_settings")
        .update(updates)
        .eq("id", (await supabase.auth.getUser()).data.user?.id || "")
        .select()
        .single();

    if (error) {
        console.error("Error updating settings:", error);
        return null;
    }

    return data as UserSettings;
} 