import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'; // To read the .env file during local development

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});