import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // Ensure this matches your .env BETTER_AUTH_URL
});

// We rename 'useSession' to 'useAuthSession' to avoid collision with Nuxt's built-in useSession
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession: useAuthSession 
} = authClient;