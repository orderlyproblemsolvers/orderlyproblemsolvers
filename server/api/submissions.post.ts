import { db } from '../utils/db';
import { companies, people } from '../database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Simple Validation
  if (!body.name || !body.type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  // Generate a Slug (URL friendly name)
  // e.g. "PayFlow Inc" -> "payflow-inc"
  const baseSlug = body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  // Add random number to ensure uniqueness for public submissions
  const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;

  try {
    if (body.type === 'company') {
      await db.insert(companies).values({
        name: body.name,
        slug: uniqueSlug,
        headline: body.description?.substring(0, 100), // First 100 chars as headline
        description: body.description,
        industry: body.industry,
        location: body.location,
        website: body.website,
        email: body.email, // We might want to store contact info differently later
        status: 'pending', // 🚨 CRITICAL: Must be approved by admin
        featured: false
      });
    } 
    
    else if (body.type === 'person') {
      await db.insert(people).values({
        name: body.name,
        slug: uniqueSlug,
        role: body.role,
        bio: body.description,
        location: body.location,
        status: 'pending', // 🚨 CRITICAL
      });
    }

    return { success: true, message: 'Submission received' };

  } catch (e: any) {
    console.error("Submission Error:", e);
    throw createError({ statusCode: 500, statusMessage: 'Database Error' });
  }
});