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
        status: 'pending',
        featured: false
      });
    } else if (body.type === 'person') {
      await db.insert(people).values({
        name: body.name,
        slug: uniqueSlug,
        role: body.role,
        bio: body.description,
        location: body.location,
        email: body.email, 
        status: 'pending',
      });
    }

    // 4. ✅ SEND CONFIRMATION EMAIL (With Dark Mode Logic)
    try {
      const currentYear = new Date().getFullYear();
      
      const data = await resend.emails.send({
        from: 'Orderly Problem Solvers <onboarding@orderlyproblemsolvers.com>', 
        to: [body.email],
        subject: 'Submission Received: Verification Pending',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              /* DARK MODE SUPPORT 
                 If the user's device is in dark mode, this inverts the logo 
                 (Black -> White) so it remains visible.
              */
              @media (prefers-color-scheme: dark) {
                .invert-on-dark {
                  filter: invert(1) brightness(1000%);
                }
                .dark-text {
                  color: #ffffff !important;
                }
                .dark-bg {
                  background-color: #333333 !important;
                  border-color: #444444 !important;
                }
              }
            </style>
          </head>
          <body style="font-family: 'Helvetica', 'Arial', sans-serif; color: #111; margin: 0; padding: 0;">
            
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              
              <div style="border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 class="dark-text" style="font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin: 0;">
                  OPS / Index
                </h1>
              </div>

              <p class="dark-text" style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Hello <strong>${body.name}</strong>,
              </p>
              
              <p class="dark-text" style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                We have received your submission to the directory. Our editorial board reviews every profile manually to ensure we maintain a high signal-to-noise ratio.
              </p>

              <div class="dark-bg" style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin: 0 0 5px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: bold;">
                  Ticket ID
                </p>
                <p class="dark-text" style="margin: 0; font-family: monospace; font-size: 14px; font-weight: bold;">
                  ${uniqueSlug.toUpperCase()}
                </p>
              </div>

              <p class="dark-text" style="font-size: 16px; line-height: 1.6;">
                You will receive a final confirmation once your profile is verified and published (usually within 48 hours).
              </p>

              <div style="border-top: 1px solid #e5e7eb; margin-top: 60px; padding-top: 40px; font-size: 12px; color: #6b7280; text-align: center;">
                
                <div style="margin-bottom: 20px;">
                  <img 
                    src="https://res.cloudinary.com/dmevyf7jt/image/upload/v1765146948/Asset_1_hczevt.png" 
                    alt="OPS Logo" 
                    width="50" 
                    height="auto"
                    class="invert-on-dark" 
                    style="display: block; margin: 0 auto; height: auto; border: 0; outline: none; text-decoration: none;" 
                  />
                </div>

                <p class="dark-text" style="font-style: italic; margin-bottom: 20px; font-size: 14px; color: #111;">
                  "Because every great solution deserves to be found."
                </p>

                <p style="margin-bottom: 20px;">
                  <a href="https://orderlyproblemsolvers.com/legal/privacy" style="color: #6b7280; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #d1d5db;">Privacy Policy</a>
                  <a href="https://orderlyproblemsolvers.com/legal/terms" style="color: #6b7280; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #d1d5db;">Terms of Service</a>
                </p>

                <p>
                  &copy; ${currentYear} Orderly Problem Solvers&trade;. All rights reserved.
                </p>
                
              </div>

            </div>
          </body>
          </html>
        `
      });
      console.log('📧 Email sent successfully:', data.id);
    } catch (emailError) {
      console.error('❌ Resend Error:', emailError);
    }

    return { success: true, message: 'Submission received' };

  } catch (e: any) {
    console.error("Submission Database Error:", e);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});