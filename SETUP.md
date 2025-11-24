# Clarity Setup Guide

This guide will walk you through setting up Clarity from scratch.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE clarity;
```
3. Your DATABASE_URL will be:
```
postgresql://username:password@localhost:5432/clarity?schema=public
```

### Option B: Cloud Database (Recommended)

**Using Supabase (Free tier available):**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the "Connection string" (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password

**Using Vercel Postgres:**

1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the connection string

## Step 3: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Fill in each variable:

### DATABASE_URL
Paste your PostgreSQL connection string from Step 2.

### NEXTAUTH_SECRET
Generate a secure random string:
```bash
openssl rand -base64 32
```
Paste the output.

### NEXTAUTH_URL
For local development:
```
http://localhost:3000
```

For production, use your actual domain:
```
https://your-domain.com
```

### Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For local: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://your-domain.com/api/auth/callback/google`
   - Click "Create"

5. Copy the Client ID and Client Secret to your `.env.local`:
```
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy it to your `.env.local`:
```
OPENAI_API_KEY="sk-..."
```

**Note:** You'll need credits in your OpenAI account. The app uses:
- Whisper API for transcription (~$0.006 per minute)
- GPT-4 Turbo for extraction (~$0.01-0.03 per meeting)

## Step 4: Initialize Database

Run Prisma migrations to create the database tables:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

You should see output confirming the tables were created.

## Step 5: Verify Setup

Check that your `.env.local` has all required variables:

```bash
# Should have 6 variables
cat .env.local
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the Clarity landing page!

## Step 7: Test the Application

1. Click "Get Started" or "Sign Up Now"
2. Sign in with your Google account
3. You should be redirected to the dashboard
4. Try uploading a short audio file (test with a 1-2 minute recording first)

## Troubleshooting

### "Invalid client" error when signing in
- Check that your Google OAuth redirect URI exactly matches
- Make sure you added `http://localhost:3000/api/auth/callback/google`

### Database connection errors
- Verify your DATABASE_URL is correct
- Check that PostgreSQL is running
- Try connecting with a database client (e.g., pgAdmin, TablePlus)

### OpenAI API errors
- Verify your API key is correct
- Check that you have credits in your OpenAI account
- Ensure you have access to Whisper and GPT-4 APIs

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall:
  ```bash
  rm -rf node_modules .next
  npm install
  ```

## Next Steps

- Customize the landing page
- Add your branding/logo
- Configure additional settings
- Deploy to Vercel (see README.md)

## Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Review the Prisma Studio to inspect database: `npx prisma studio`
4. Verify all environment variables are set correctly

## Production Deployment

See the main README.md for deployment instructions.

