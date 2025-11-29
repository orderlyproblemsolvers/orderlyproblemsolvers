import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { people, personStack, technologies } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID required' });

  // 2. Fetch Person
  const person = await db.query.people.findFirst({
    where: eq(people.id, parseInt(id))
  });

  if (!person) throw createError({ statusCode: 404, statusMessage: 'Person not found' });

  // 3. Fetch Tech Stack (Tags)
  const stackRows = await db.select({
    name: technologies.name
  })
  .from(personStack)
  .leftJoin(technologies, eq(personStack.techId, technologies.id))
  .where(eq(personStack.personId, person.id));

  // Flatten to simple array ["Vue", "Stripe"]
  const stack = stackRows.map(r => r.name).filter(Boolean);

  return { ...person, stack };
});