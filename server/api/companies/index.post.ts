import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies, technologies, companyStack } from '../../database/schema';
import { auth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. SECURITY
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. GET BODY
  const body = await readBody(event);
  
  // Simple validation
  if (!body.name || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: 'Name and Slug are required' });
  }

  const cleanLogo = body.logo ? body.logo.replace('/public', '') : null;

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
        logo: cleanLogo,
        videos: body.videos || [],
        status: 'approved',
        featured: body.featured || false
    }).returning();

    const companyId = newCompany[0].id;

    // 4. PROCESS TECH STACK
    // ⚠️ CHANGED: Now expects array of objects: { name: string, category: string }
    if (body.stack && Array.isArray(body.stack) && body.stack.length > 0) {
        
        for (const item of body.stack) {
            // Handle both legacy string array (just in case) and new object array
            const techName = typeof item === 'string' ? item : item.name;
            const techCat = typeof item === 'string' ? 'General' : item.category;

            const cleanName = techName.trim();
            if (!cleanName) continue;

            // A. Find Existing Technology
            let tech = await db.query.technologies.findFirst({
                where: eq(technologies.name, cleanName)
            });

            if (!tech) {
                // CREATE: If missing, create with the USER SELECTED category
                const inserted = await db.insert(technologies).values({
                    name: cleanName,
                    category: techCat 
                }).returning();
                tech = inserted[0];
            } else {
                // UPDATE (Optional): 
                // If existing tech has a generic category but user provided a specific one, 
                // we *could* update it here. For safety, let's only update if it's currently null/'General'.
                if ((!tech.category || tech.category === 'General') && techCat !== 'General') {
                    await db.update(technologies)
                      .set({ category: techCat })
                      .where(eq(technologies.id, tech.id));
                }
            }

            // B. Link
            await db.insert(companyStack).values({
                companyId: companyId,
                techId: tech.id
            }).onConflictDoNothing(); // Prevent duplicate links if user double-clicked
        }
    }

    return { success: true, company: newCompany[0] };

  } catch (e: any) {
    if (e.code === '23505') {
        throw createError({ statusCode: 409, statusMessage: 'Slug already exists.' });
    }
    console.error("Create Company Error:", e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});