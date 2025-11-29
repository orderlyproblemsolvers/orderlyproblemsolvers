import { eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { companies, companyStack, technologies } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID required' });

  // 2. Fetch Company
  const company = await db.query.companies.findFirst({
    where: eq(companies.id, parseInt(id))
  });

  if (!company) throw createError({ statusCode: 404, statusMessage: 'Company not found' });

  // 3. Fetch Tech Stack (Tags)
  const stackRows = await db.select({
    name: technologies.name
  })
  .from(companyStack)
  .leftJoin(technologies, eq(companyStack.techId, technologies.id))
  .where(eq(companyStack.companyId, company.id));

  // Flatten to simple array ["Vue", "Stripe"]
  const stack = stackRows.map(r => r.name).filter(Boolean);

  return { ...company, stack };
});