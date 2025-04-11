import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "~/env";

export const createClient = async () => {
    const cookieStore = await cookies();

    return createServerClient(
        env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: Record<string, unknown> = {}) {
                    try {
                        cookieStore.set({
                            name,
                            value,
                            ...(options as Omit<Record<string, unknown>, 'name' | 'value'>)
                        });
                    } catch (error) {
                        // The cookies.set function is not available in middleware or other contexts.
                        // We should return without throwing an error.
                    }
                },
                remove(name: string, options: Record<string, unknown> = {}) {
                    try {
                        cookieStore.set({
                            name,
                            value: "",
                            ...(options as Omit<Record<string, unknown>, 'name' | 'value'>)
                        });
                    } catch (error) {
                        // The cookies.set function is not available in middleware or other contexts.
                        // We should return without throwing an error.
                    }
                },
            },
        }
    );
}; 