# Clarity - Quick Start Guide

Get Clarity up and running in 10 minutes!

## Prerequisites

- Node.js 18+ installed
- A Google account
- An OpenAI account with API access

## Step-by-Step Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Set Up Database (2 minutes)

**Easiest Option: Supabase (Free)**

1. Go to https://supabase.com and sign up
2. Create a new project
3. Wait for it to initialize (~2 minutes)
4. Go to Settings → Database
5. Copy the "Connection string" (URI format)
6. Replace `[YOUR-PASSWORD]` with your database password

### 3. Get Google OAuth Credentials (3 minutes)

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: Clarity
   - User support email: your email
   - Developer contact: your email
   - Save and continue through all steps
6. Back to Create OAuth client ID:
   - Application type: Web application
   - Name: Clarity
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click Create
7. Copy the Client ID and Client Secret

### 4. Get OpenAI API Key (1 minute)

1. Go to https://platform.openai.com/
2. Sign in or create account
3. Go to API keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)

**Note:** You'll need to add credits to your OpenAI account. $5-10 is enough for testing.

### 5. Configure Environment (1 minute)

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
DATABASE_URL="<your-supabase-connection-string>"
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="<your-google-client-id>"
GOOGLE_CLIENT_SECRET="<your-google-client-secret>"
OPENAI_API_KEY="<your-openai-api-key>"
```

### 6. Initialize Database (1 minute)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 7. Start the App (1 minute)

```bash
npm run dev
```

Open http://localhost:3000

## Test It Out

1. Click "Get Started"
2. Sign in with Google
3. Click "Upload Meeting"
4. Upload a short audio file (1-2 minutes recommended for first test)
5. Wait for processing (~30 seconds to 2 minutes)
6. View your transcribed meeting with extracted action items!

## Troubleshooting

### "Invalid client" when signing in
- Make sure redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct

### Database connection error
- Verify DATABASE_URL is correct
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Check Supabase project is running

### OpenAI API error
- Verify OPENAI_API_KEY is correct
- Check you have credits in your OpenAI account
- Ensure you have access to Whisper and GPT-4 APIs

### Module not found
```bash
rm -rf node_modules .next
npm install
```

## What's Next?

- Read `README.md` for full documentation
- See `SETUP.md` for detailed setup instructions
- Check `DEPLOYMENT_CHECKLIST.md` when ready to deploy
- Review `PROJECT_SUMMARY.md` for architecture overview

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:studio       # Open Prisma Studio (database GUI)
npm run db:migrate      # Run migrations
npm run db:generate     # Generate Prisma Client

# Debugging
npx prisma studio       # View database contents
```

## File Upload Tips

**Supported formats:**
- MP3 (.mp3)
- M4A (.m4a)
- WebM (.webm)
- WAV (.wav)

**Recommendations:**
- Start with a 1-2 minute file for testing
- Keep files under 25MB for best performance
- Clear audio quality = better transcription

## Cost Estimate for Testing

- 10 test meetings (5 minutes each): ~$0.50-1.00
- Database: Free (Supabase free tier)
- Hosting: Free (local development)

**Total: Less than $1 to fully test!**

## Need Help?

1. Check the error message in browser console (F12)
2. Check terminal/server logs
3. Review the troubleshooting section above
4. Check environment variables are set correctly
5. Verify all services (Supabase, Google, OpenAI) are working

## Success!

If you can:
- ✅ Sign in with Google
- ✅ Upload an audio file
- ✅ See the transcription
- ✅ See extracted action items

**You're all set! Clarity is working perfectly.**

Now you can:
- Customize the UI
- Add your branding
- Deploy to production (see DEPLOYMENT_CHECKLIST.md)
- Build additional features

Enjoy using Clarity! 🎉

