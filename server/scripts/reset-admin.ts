import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm'; 
import * as schema from '../database/schema'; 

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true }
});

async function resetAdmin() {
  const email = "orderlyproblemsolvers@gmail.com"; // Ensure this matches what you tried before
  const password = "OPSmain2025#"; 
  const name = "OPS Admin";

  console.log(`🔄 Resetting Admin User: ${email}...`);

  try {
    // 1. DELETE EXISTING ZOMBIE USER
    // We delete from 'user' table. The 'account' and 'session' tables 
    // will automatically clean up if you have cascading deletes, 
    // but let's be safe and just try to find and delete the user.
    
    const existingUser = await db.query.user.findFirst({
        where: eq(schema.user.email, email)
    });

    if (existingUser) {
        console.log("Found existing user. Deleting...");
        // Delete Account first (Foreign Key constraint)
        await db.delete(schema.account).where(eq(schema.account.userId, existingUser.id));
        // Delete User
        await db.delete(schema.user).where(eq(schema.user.id, existingUser.id));
        console.log("🗑️ Old user deleted.");
    }

    // 2. CREATE FRESH ADMIN
    console.log("Creating fresh Admin account...");
    const newUser = await auth.api.signUpEmail({
      body: { email, password, name }
    });

    if (newUser) {
      // 3. PROMOTE TO ADMIN
      await db.update(schema.user)
        .set({ role: 'admin' })
        .where(eq(schema.user.email, email));
      
      console.log("✅ SUCCESS! Admin account created and verified.");
      console.log("Login at: http://localhost:3000/auth/sign-in");
    }

  } catch (e) {
    console.error("❌ Error:", e);
  }
}

resetAdmin();
