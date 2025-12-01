import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, timestamp, boolean, text, serial, integer } from 'drizzle-orm/pg-core';

const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: text("role", { enum: ["user", "admin", "editor"] }).default("user").notNull()
});
const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
});
const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
});
const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});
const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  headline: text("headline"),
  description: text("description"),
  logo: text("logo"),
  website: text("website"),
  location: text("location"),
  industry: text("industry"),
  stage: text("stage"),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const people = pgTable("people", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  location: text("location"),
  // Contact Details
  email: text("email"),
  website: text("website"),
  // Linked Company (Optional)
  companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  category: text("category"),
  readTime: text("read_time"),
  // Author Logic
  authorName: text("author_name").default("OPS Admin"),
  authorId: integer("author_id").references(() => people.id, { onDelete: "set null" }),
  // NOTE: Featured columns removed here in favor of junction tables below
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow()
});
const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  category: text("category")
});
const companyStack = pgTable("company_stack", {
  companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  techId: integer("tech_id").references(() => technologies.id, { onDelete: "cascade" }).notNull()
});
const personStack = pgTable("person_stack", {
  personId: integer("person_id").references(() => people.id, { onDelete: "cascade" }).notNull(),
  techId: integer("tech_id").references(() => technologies.id, { onDelete: "cascade" }).notNull()
});
const articleCompanies = pgTable("article_companies", {
  articleId: integer("article_id").references(() => articles.id, { onDelete: "cascade" }).notNull(),
  companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull()
});
const articlePeople = pgTable("article_people", {
  articleId: integer("article_id").references(() => articles.id, { onDelete: "cascade" }).notNull(),
  personId: integer("person_id").references(() => people.id, { onDelete: "cascade" }).notNull()
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  account: account,
  articleCompanies: articleCompanies,
  articlePeople: articlePeople,
  articles: articles,
  companies: companies,
  companyStack: companyStack,
  people: people,
  personStack: personStack,
  session: session,
  technologies: technologies,
  user: user,
  verification: verification
}, Symbol.toStringTag, { value: 'Module' }));

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export { articles as a, companyStack as b, companies as c, db as d, personStack as e, articleCompanies as f, articlePeople as g, people as p, technologies as t };
//# sourceMappingURL=db.mjs.map
