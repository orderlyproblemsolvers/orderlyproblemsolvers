import { Resend } from 'resend';
import { db } from '../utils/db';
import { companies, people } from '../database/schema';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. Validation
  if (!body.name || !body.type || !body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  // 2. Generate Slug
  const baseSlug = body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;

  try {
    // 3. Database Insertion
    if (body.type === 'company') {
      await db.insert(companies).values({
        name: body.name,
        slug: uniqueSlug,
        headline: body.description?.substring(0, 100), 
        description: body.description,
        industry: body.industry,
        location: body.location,
        website: body.website,
        // Note: Ensure your 'companies' table actually has an email column if you want to store it. 
        // If not, remove this line to avoid SQL errors.
        // email: body.email, 
        status: 'pending',
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
        email: body.email, // 'people' table definitely has this
        status: 'pending',
      });
    }

    // 4. ✅ SEND CONFIRMATION EMAIL
    // We wrap this in a try/catch so email failures don't block the user's success message
    try {
      const data = await resend.emails.send({
        // Make sure this matches the domain you verified in Resend
        from: 'Orderly Problem Solvers <onboarding@orderlyproblemsolvers.com>', 
        to: [body.email],
        subject: 'Submission Received: Verification Pending',
        html: `
          <div style="font-family: 'Helvetica', 'Arial', sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <div style="border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin: 0;">
                OPS / Index
              </h1>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hello <strong>${body.name}</strong>,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              We have received your submission to the directory. Our editorial board reviews every profile manually to ensure we maintain a high signal-to-noise ratio.
            </p>

            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <p style="margin: 0 0 5px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: bold;">
                Ticket ID
              </p>
              <p style="margin: 0; font-family: monospace; font-size: 14px; font-weight: bold;">
                ${uniqueSlug.toUpperCase()}
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">
              You will receive a final confirmation once your profile is verified and published (usually within 48 hours).
            </p>

            <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #6b7280;">
              <p>Celebrating solutions</p>
              <a href="https://orderlyproblemsolvers.com" style="color: #000; text-decoration: none; font-weight: bold;">orderlyproblemsolvers.com</a>
            </div>

          </div>
        `
      });
      console.log('📧 Email sent successfully:', data.id);
    } catch (emailError) {
      console.error('❌ Resend Error:', emailError);
      // We log the error but do NOT throw it, so the frontend still gets a "success" response
    }

    return { success: true, message: 'Submission received' };

  } catch (e: any) {
    console.error("Submission Database Error:", e);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});