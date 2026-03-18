# A.P.I. Construction Vercel Website

This is a deploy-ready Next.js website package for A.P.I. Construction.

## What is included
- Premium one-page marketing site
- Real contact form API route
- Email notification support using Resend
- Optional SMS lead notifications using Twilio
- SEO titles, description, and local service-area copy
- Real project images wired from `/public/assets`

## Local setup
1. Install dependencies
   - `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your Resend credentials
4. Start the site
   - `npm run dev`

## Vercel deployment
1. Upload the folder to GitHub
2. Import the repo into Vercel
3. Add the environment variables from `.env.example`
4. Deploy

## Required environment variables
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Optional SMS variables
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `TWILIO_TO_NUMBER`

## Notes
- The form sends an email every time a lead is submitted.
- If Twilio variables are also present, it sends an SMS alert too.
- `CONTACT_FROM_EMAIL` should use a verified sender/domain in Resend for production.
