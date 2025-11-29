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

  try {
    // 2. Update Company Fields
    await db.update(companies).set({
        name: body.name,
        slug: body.slug,
        headline: body.headline,
        description: body.description,
        industry: body.industry,
        location: body.location,
        website: body.website,
        stage: body.stage,
        logo: body.logo,
        status: body.status, // Allow changing status back to pending/rejected
        featured: body.featured,
        updatedAt: new Date()
    }).where(eq(companies.id, id));

    // 3. Sync Tech Stack (Delete All -> Re-insert)
    // This is the safest way to handle "updates" to a many-to-many relationship
    if (Array.isArray(body.stack)) {
        
        // A. Wipe existing links
        await db.delete(companyStack).where(eq(companyStack.companyId, id));

        // B. Insert new links
        for (const techName of body.stack) {
            const cleanName = techName.trim();
            if (!cleanName) continue;

            // Find or Create Tech
            let tech = await db.query.technologies.findFirst({
                where: eq(technologies.name, cleanName)
            });

            if (!tech) {
                const inserted = await db.insert(technologies).values({
                    name: cleanName,
                    category: body.industry || 'General' 
                }).returning();
                tech = inserted[0];
            }

            // Link
            await db.insert(companyStack).values({
                companyId: id,
                techId: tech.id
            });
        }
    }

    return { success: true };

  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});