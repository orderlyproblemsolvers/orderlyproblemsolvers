import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { people, technologies, personStack } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security: Check Admin
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. Get ID
  const id = parseInt(getRouterParam(event, 'id') || '');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID required' });

  // 3. Get Data
  const body = await readBody(event);

  try {
    // 4. Update Person Fields
    await db.update(people).set({
        name: body.name,
        slug: body.slug,
        role: body.role,
        bio: body.bio,
        avatar: body.avatar,
        location: body.location,
        
        // Contact Info
        email: body.email,
        website: body.website,

        companyId: body.companyId || null, // Handle Unlinking
        status: body.status,
        featured: body.featured
    }).where(eq(people.id, id));

    // 5. Sync Tech Stack (Delete All -> Re-insert)
    // This ensures the DB exactly matches the form, handling removals and additions
    if (Array.isArray(body.stack)) {
        
        // A. Wipe existing links for this person
        await db.delete(personStack).where(eq(personStack.personId, id));

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
                    category: 'General' 
                }).returning();
                tech = inserted[0];
            }

            // Link
            await db.insert(personStack).values({
                personId: id,
                techId: tech.id
            });
        }
    }

    return { success: true };

  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});