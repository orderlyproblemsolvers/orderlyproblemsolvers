import { createAuthClient } from "better-auth/vue";
const config = useRuntimeConfig();


export const authClient = createAuthClient({
    
    baseURL: import.meta.client 
      ? window.location.origin 
      : (useRuntimeConfig().public.siteUrl || "http://localhost:3000")
});

// We rename 'useSession' to 'useAuthSession' to avoid collision with Nuxt's built-in useSession
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession: useAuthSession 
} = authClient;