import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = createServerClient(
            env.NEXT_PUBLIC_SUPABASE_URL,
            env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value;
                    },
                    set(name: string, value: string, options) {
                        const cookieOptions = {
                            name,
                            value,
                            ...options,
                        };
                        request.cookies.set(cookieOptions);
                        const response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        });
                        response.cookies.set(cookieOptions);
                        return response;
                    },
                    remove(name: string, options) {
                        const cookieOptions = {
                            name,
                            value: "",
                            ...options,
                        };
                        request.cookies.set(cookieOptions);
                        const response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        });
                        response.cookies.delete(name);
                        return response;
                    },
                },
            }
        );

        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL("/", request.url));
} 