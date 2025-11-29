import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);

async function nuke() {
  console.log('☢️  AGGRESSIVE NUKE...');
  try {
    // We drop specific tables with CASCADE to ensure clean slate for Auth
    await db.execute(sql`DROP TABLE IF EXISTS "session" CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS "account" CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS "user" CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS "verification" CASCADE;`);
    
    console.log('✅ Auth tables deleted.');
  } catch (e) {
    console.error('Error nuking db:', e);
  }
}

nuke();