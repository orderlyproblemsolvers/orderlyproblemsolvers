import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../database/schema';

// 1. Initialize the Neon Connection
// The '!' ensures TypeScript knows this env var is required
const sql = neon(process.env.DATABASE_URL!);

// 2. Initialize Drizzle
// We pass the schema object so your app has full type safety
export const db = drizzle(sql, { schema });