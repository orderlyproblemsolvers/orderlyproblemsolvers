import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { people } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID required' });

  try {
    await db.delete(people).where(eq(people.id, parseInt(id)));
    return { success: true };
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: 'Error deleting profile. It might be linked to an article.' });
  }
});