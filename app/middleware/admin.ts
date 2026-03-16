import { authClient } from "@/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // 1. FORCE A FRESH SERVER CHECK
    // We use 'getSession' directly instead of 'useAuthSession'. 
    // This bypasses any stale local state and asks the backend "Who is this?"
    const { data: session } = await authClient.getSession({
        fetchOptions: {
            headers: useRequestHeaders(['cookie']) // Pass cookies if running on server
        }
    });

    // 2. CHECK 1: Are they logged in?
    if (!session) {
        // Send them to login, but remember where they wanted to go
        return navigateTo(`/auth/sign-in?redirect=${encodeURIComponent(to.fullPath)}`);
    }

    // 3. CHECK 2: Are they an Admin?
    // We accept 'admin' or 'editor' (if you add that later)
    const role = (session.user as any)?.role;
    
    if (role !== 'admin') {
        return navigateTo('/'); // Kick regular users to homepage
    }
});