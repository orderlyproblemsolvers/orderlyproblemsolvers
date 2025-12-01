import { createAuthClient } from "better-auth/vue";
const config = useRuntimeConfig();
const baseURL = config.public.siteUrl || "http://localhost:3000" || "https://orderlyproblemsolvers.netlify.app";

export const authClient = createAuthClient({
    
    baseURL: baseURL// Ensure this matches your .env BETTER_AUTH_URL
});

// We rename 'useSession' to 'useAuthSession' to avoid collision with Nuxt's built-in useSession
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession: useAuthSession 
} = authClient;