import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { companies, people } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const body = await readBody(event);
  if (!body.id || !body.type || !body.status) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid parameters' });
  }

  try {
    if (body.type === 'company') {
       await db.update(companies)
         .set({ status: body.status })
         .where(eq(companies.id, body.id));
    } 
    else if (body.type === 'person') {
       await db.update(people)
         .set({ status: body.status })
         .where(eq(people.id, body.id));
    }
    
    return { success: true };

  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});