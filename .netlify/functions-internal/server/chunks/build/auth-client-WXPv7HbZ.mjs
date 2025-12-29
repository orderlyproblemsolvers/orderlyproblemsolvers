import { createAuthClient } from 'better-auth/vue';

const authClient = createAuthClient({
  baseURL: "https://orderlyproblemsolvers.com"
  // Ensure this matches your .env BETTER_AUTH_URL
});
const {
  signIn,
  signUp,
  signOut,
  useSession: useAuthSession
} = authClient;

export { authClient as a, useAuthSession as u };
//# sourceMappingURL=auth-client-WXPv7HbZ.mjs.map
