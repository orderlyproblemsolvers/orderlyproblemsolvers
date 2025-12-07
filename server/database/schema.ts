import { pgTable, text, integer, boolean, timestamp, serial, json } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// --- 1. AUTHENTICATION TABLES (Better-Auth) ---

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  
  role: text('role', { enum: ['user', 'admin', 'editor'] }).default('user').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: timestamp('expires_at'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// --- 2. DIRECTORY TABLES ---

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  headline: text('headline'),
  description: text('description'),
  logo: text('logo'),
  website: text('website'),
  location: text('location'),
  industry: text('industry'),
  stage: text('stage'),
  
  // ✅ NEW FIELD: Videos for Companies
  videos: json('videos').$type<string[]>().default([]),
  
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  featured: boolean('featured').default(false),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const people = pgTable('people', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  bio: text('bio'),
  avatar: text('avatar'),
  location: text('location'),
  
  // Contact Details
  email: text('email'),
  website: text('website'),
  
  // ✅ NEW FIELD: Videos for People
  videos: json('videos').$type<string[]>().default([]),

  // Linked Company (Optional)
  companyId: integer('company_id').references(() => companies.id, { onDelete: 'set null' }),
  
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- 3. MEDIA TABLES ---

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  coverImage: text('cover_image'),
  category: text('category'),
  readTime: text('read_time'),
  
  // Author Logic
  authorName: text('author_name').default('OPS Admin'),
  authorId: integer('author_id').references(() => people.id, { onDelete: 'set null' }),
  
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- 4. TAGGING & RELATIONSHIP SYSTEMS ---

export const technologies = pgTable('technologies', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  category: text('category'),
});

// Company <-> Tech
export const companyStack = pgTable('company_stack', {
  companyId: integer('company_id').references(() => companies.id, { onDelete: 'cascade' }).notNull(),
  techId: integer('tech_id').references(() => technologies.id, { onDelete: 'cascade' }).notNull(),
});

// Person <-> Tech
export const personStack = pgTable('person_stack', {
  personId: integer('person_id').references(() => people.id, { onDelete: 'cascade' }).notNull(),
  techId: integer('tech_id').references(() => technologies.id, { onDelete: 'cascade' }).notNull(),
});

// Article <-> Companies (Many-to-Many)
export const articleCompanies = pgTable('article_companies', {
  articleId: integer('article_id').references(() => articles.id, { onDelete: 'cascade' }).notNull(),
  companyId: integer('company_id').references(() => companies.id, { onDelete: 'cascade' }).notNull(),
});

// Article <-> People (Many-to-Many)
export const articlePeople = pgTable('article_people', {
  articleId: integer('article_id').references(() => articles.id, { onDelete: 'cascade' }).notNull(),
  personId: integer('person_id').references(() => people.id, { onDelete: 'cascade' }).notNull(),
});