import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies, technologies, companyStack } from '../../database/schema';
import { auth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. SECURITY: Check if user is Admin
  const session = await auth.api.getSession({ headers: event.headers });
  
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. VALIDATION: Get Body
  const body = await readBody(event);
  
  if (!body.name || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: 'Name and Slug are required' });
  }

  try {
    // 3. INSERT COMPANY
    const newCompany = await db.insert(companies).values({
        name: body.name,
        slug: body.slug,
        headline: body.headline,
        description: body.description,
        industry: body.industry,
        location: body.location,
        website: body.website,
        stage: body.stage,
        logo: body.logo,
        status: 'approved', // Admin creations are auto-approved
        featured: body.featured || false
    }).returning();

    const companyId = newCompany[0].id;

    // 4. PROCESS TECH STACK (The Logic we were missing)
    // Expects body.stack to be an array of strings: ["Vue", "Nuxt", "Stripe"]
    if (body.stack && Array.isArray(body.stack) && body.stack.length > 0) {
        
        for (const techName of body.stack) {
            // Clean the string
            const cleanName = techName.trim();
            if (!cleanName) continue;

            // A. Find or Create the Technology
            // We try to find it first to avoid duplicates
            let tech = await db.query.technologies.findFirst({
                where: eq(technologies.name, cleanName)
            });

            if (!tech) {
                // If it doesn't exist, create it
                // We categorize it loosely based on the company's industry for now
                // or default to 'General'
                const inserted = await db.insert(technologies).values({
                    name: cleanName,
                    category: body.industry || 'General' 
                }).returning();
                tech = inserted[0];
            }

            // B. Link Company to Technology
            await db.insert(companyStack).values({
                companyId: companyId,
                techId: tech.id
            });
        }
    }

    return { success: true, company: newCompany[0] };

  } catch (e: any) {
    // Handle duplicates (Unique constraint on slug)
    if (e.code === '23505') {
        throw createError({ statusCode: 409, statusMessage: 'Slug already exists.' });
    }
    console.error("Create Company Error:", e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});