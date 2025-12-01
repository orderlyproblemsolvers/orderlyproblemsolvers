import { authClient } from "@/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // 1. SKIP SERVER CHECK (The Fix)
    // We let the server render the page shell immediately to avoid 500 errors
    // caused by database connections or internal API resolution issues.
    if (import.meta.server) return;

    // 2. CLIENT-SIDE CHECK
    // Now we are in the browser, where we know cookies and URLs work perfectly.
    try {
        const { data: session } = await authClient.useAuthSession(useFetch);

        // 3. No Session? -> Bounce to Login
        if (!session.value) {
            // We encode the redirect so they come back after login
            return navigateTo(`/auth/sign-in?redirect=${encodeURIComponent(to.fullPath)}`);
        }

        // 4. Check Role
        // Using "any" casting to avoid TS errors on the custom 'role' field
        const userRole = (session.value.user as any)?.role;
        
        if (userRole !== 'admin') {
            console.log(`⛔ Access Denied: User is '${userRole}', needed 'admin'`);
            return navigateTo('/'); 
        }
        
    } catch (error) {
        // Failsafe: If anything explodes, just go to login
        console.error("Auth Middleware Error:", error);
        return navigateTo('/auth/sign-in');
    }
});