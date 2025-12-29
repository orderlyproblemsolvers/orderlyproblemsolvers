import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { companies, technologies, companyStack } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const id = parseInt(getRouterParam(event, 'id') || '');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID required' });

  const body = await readBody(event);

  // 2. SANITIZATION
  const cleanLogo = body.logo ? body.logo.replace('/public', '') : null;

  try {
    // 3. Update Company Fields
    await db.update(companies).set({
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

        status: body.status,
        featured: body.featured,
        updatedAt: new Date()
    }).where(eq(companies.id, id));

    // 4. Sync Tech Stack (Delete All -> Re-insert)
    if (Array.isArray(body.stack)) {
        
        // A. Wipe existing links for this company
        await db.delete(companyStack).where(eq(companyStack.companyId, id));

        // B. Insert new links
        for (const item of body.stack) {
            // 🔄 REFACTOR: Handle both legacy strings and new objects
            const techName = typeof item === 'string' ? item : item.name;
            const techCat = typeof item === 'string' ? 'General' : item.category;

            const cleanName = techName.trim();
            if (!cleanName) continue;

            // Find existing tech
            let tech = await db.query.technologies.findFirst({
                where: eq(technologies.name, cleanName)
            });

            if (!tech) {
                // CREATE: Use the specific category provided by Admin
                const inserted = await db.insert(technologies).values({
                    name: cleanName,
                    category: techCat 
                }).returning();
                tech = inserted[0];
            } else {
                // UPDATE: If existing tech has no category (or 'General'), 
                // but we now know it's specific (e.g. 'FinTech'), update it.
                if ((!tech.category || tech.category === 'General') && techCat !== 'General') {
                     await db.update(technologies)
                       .set({ category: techCat })
                       .where(eq(technologies.id, tech.id));
                }
            }

            // Link
            await db.insert(companyStack).values({
                companyId: id,
                techId: tech.id
            }).onConflictDoNothing();
        }
    }

    return { success: true };

  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});