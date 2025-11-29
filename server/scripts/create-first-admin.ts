import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm'; // <--- Import 'eq' here
import * as schema from '../database/schema'; 

// 1. Setup DB Connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// 2. Setup Auth Instance
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: { enabled: true }
});

async function createAdmin() {
  // --- CONFIGURATION ---
  const email = "orderlyproblemsolvers@gmail.com"; 
  const password = "OPSmain2025#"; 
  const name = "OPS Admin";
  // ---------------------

  console.log(`Creating Admin User: ${email}...`);

  try {
    // 1. Create user using Better-Auth (Handles Password Hashing)
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name
      }
    });

    // 2. Promote to Admin
    if (user) {
      await db.update(schema.user)
        .set({ role: 'admin' })
        .where(eq(schema.user.email, email)); // <--- FIXED LINE using 'eq'
      
      console.log("✅ Success! Admin account created.");
      console.log("You can now log in at /auth/sign-in");
    }
  } catch (e: any) {
    // Handle "User already exists" specifically
    if (e.body?.message === "User already exists") {
        console.log("⚠️ User already exists. Promoting to admin anyway...");
        await db.update(schema.user)
            .set({ role: 'admin' })
            .where(eq(schema.user.email, email));
        console.log("✅ User updated to Admin.");
    } else {
        console.error("Error creating admin:", e);
    }
  }
}

createAdmin();