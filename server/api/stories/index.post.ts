import { db } from '../../utils/db';
import { articles, articleCompanies, articlePeople } from '../../database/schema';
import { auth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  const body = await readBody(event);
  
  try {
    // 1. Create Article
    const newArticle = await db.insert(articles).values({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        category: body.category,
        readTime: body.readTime,
        authorName: body.authorName || 'OPS Admin',
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null
    }).returning();

    const articleId = newArticle[0].id;

    // 2. Link Companies (Loop & Insert)
    if (body.featuredCompanyIds && body.featuredCompanyIds.length > 0) {
       for (const compId of body.featuredCompanyIds) {
          await db.insert(articleCompanies).values({
             articleId,
             companyId: compId
          });
       }
    }

    // 3. Link People (Loop & Insert)
    if (body.featuredPersonIds && body.featuredPersonIds.length > 0) {
       for (const personId of body.featuredPersonIds) {
          await db.insert(articlePeople).values({
             articleId,
             personId: personId
          });
       }
    }

    return { success: true, article: newArticle[0] };

  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});