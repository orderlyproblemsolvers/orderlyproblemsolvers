import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

if (!process.env.BETTER_AUTH_URL) {
  console.error("🚨 ERROR: BETTER_AUTH_URL is missing in .env file!");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  emailAndPassword: {  
    enabled: true 
  },
  
  // 🚨 THIS IS THE FIX 🚨
  // We must tell Better-Auth to read the 'role' column and send it to the client
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false, // It's already in DB schema, so false here prevents errors
        input: false // Security: Don't allow users to set this via API
      }
    }
  },

  trustedOrigins: ["http://localhost:3000", "https://orderlyproblemsolvers.netlify.app", 'https://orderlyproblemsolvers.com'] 
});