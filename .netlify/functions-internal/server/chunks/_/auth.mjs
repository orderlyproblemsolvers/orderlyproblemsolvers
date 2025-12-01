import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { d as db } from './db.mjs';

if (!process.env.BETTER_AUTH_URL) {
  console.error("\u{1F6A8} ERROR: BETTER_AUTH_URL is missing in .env file!");
}
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true
  },
  // 🚨 THIS IS THE FIX 🚨
  // We must tell Better-Auth to read the 'role' column and send it to the client
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        // It's already in DB schema, so false here prevents errors
        input: false
        // Security: Don't allow users to set this via API
      }
    }
  },
  trustedOrigins: ["http://localhost:3000"]
});

export { auth as a };
//# sourceMappingURL=auth.mjs.map
