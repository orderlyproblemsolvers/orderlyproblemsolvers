import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { people, technologies, personStack } from '../../database/schema';
import { auth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. SECURITY: Check if user is Admin
  const session = await auth.api.getSession({ headers: event.headers });
  
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. VALIDATION: Get Body
  const body = await readBody(event);
  
  if (!body.name || !body.slug || !body.role) {
    throw createError({ statusCode: 400, statusMessage: 'Name, Slug, and Role are required' });
  }

  try {
    // 3. INSERT PERSON
    const newPerson = await db.insert(people).values({
        name: body.name,
        slug: body.slug,
        role: body.role,
        bio: body.bio,
        avatar: body.avatar,
        location: body.location,
        
        // Contact Info
        email: body.email,
        website: body.website,

        companyId: body.companyId || null, // Link to existing company
        status: 'approved', // Admin creations are auto-approved
        featured: body.featured || false
    }).returning();

    const personId = newPerson[0].id;

    // 4. PROCESS TECH STACK
    // Expects body.stack to be an array of strings: ["Vue", "Rust", "AWS"]
    if (body.stack && Array.isArray(body.stack) && body.stack.length > 0) {
        
        for (const techName of body.stack) {
            // Clean the string
            const cleanName = techName.trim();
            if (!cleanName) continue;

            // A. Find or Create the Technology
            // Try to find it first to avoid duplicates
            let tech = await db.query.technologies.findFirst({
                where: eq(technologies.name, cleanName)
            });

            if (!tech) {
                // If it doesn't exist, create it
                const inserted = await db.insert(technologies).values({
                    name: cleanName,
                    category: 'General' // Default category
                }).returning();
                tech = inserted[0];
            }

            // B. Link Person to Technology
            await db.insert(personStack).values({
                personId: personId,
                techId: tech.id
            });
        }
    }

    return { success: true, person: newPerson[0] };

  } catch (e: any) {
    // Handle duplicates (Unique constraint on slug)
    if (e.code === '23505') {
        throw createError({ statusCode: 409, statusMessage: 'Slug already exists.' });
    }
    console.error("Create Person Error:", e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});