# Clarity Deployment Checklist

Use this checklist to deploy Clarity to production.

## Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] All TypeScript errors resolved
- [ ] Environment variables documented
- [ ] Git repository created and code pushed

### Database Setup
- [ ] Production PostgreSQL database created
- [ ] Database connection string obtained
- [ ] Database is accessible from deployment platform

### API Keys & Credentials
- [ ] OpenAI API key with sufficient credits
- [ ] Google OAuth credentials for production domain
- [ ] NEXTAUTH_SECRET generated (use `openssl rand -base64 32`)

## Vercel Deployment

### 1. Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Vercel Project
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import your Git repository
- [ ] Select the repository

### 3. Configure Build Settings
- [ ] Framework Preset: Next.js (auto-detected)
- [ ] Root Directory: `./` (default)
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)

### 4. Add Environment Variables

Add these in Vercel project settings:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
OPENAI_API_KEY=<your-api-key>
```

- [ ] DATABASE_URL added
- [ ] NEXTAUTH_SECRET added
- [ ] NEXTAUTH_URL added (use your Vercel domain)
- [ ] GOOGLE_CLIENT_ID added
- [ ] GOOGLE_CLIENT_SECRET added
- [ ] OPENAI_API_KEY added

### 5. Update Google OAuth

- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Navigate to your OAuth credentials
- [ ] Add authorized redirect URI:
  ```
  https://your-domain.vercel.app/api/auth/callback/google
  ```
- [ ] Save changes

### 6. Deploy
- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

### 7. Initialize Database
- [ ] Open Vercel project terminal or use local terminal
- [ ] Run migrations:
  ```bash
  npx prisma migrate deploy
  ```
  Or if using Vercel Postgres:
  ```bash
  npx prisma db push
  ```

### 8. Test Production Deployment
- [ ] Visit your deployed URL
- [ ] Landing page loads correctly
- [ ] Click "Get Started"
- [ ] Sign in with Google works
- [ ] Dashboard loads
- [ ] Upload a test meeting (small file first)
- [ ] Meeting processes successfully
- [ ] Meeting details page displays correctly
- [ ] Settings page loads

## Post-Deployment

### Monitoring
- [ ] Set up Vercel Analytics (optional)
- [ ] Monitor OpenAI API usage
- [ ] Monitor database usage
- [ ] Check error logs regularly

### Performance
- [ ] Test with various audio file sizes
- [ ] Verify transcription quality
- [ ] Check extraction accuracy
- [ ] Monitor API response times

### Security
- [ ] Verify all routes are properly protected
- [ ] Test unauthorized access attempts
- [ ] Ensure environment variables are not exposed
- [ ] Review CORS settings if needed

## Custom Domain (Optional)

### 1. Add Domain in Vercel
- [ ] Go to Project Settings > Domains
- [ ] Add your custom domain
- [ ] Follow DNS configuration instructions

### 2. Update Environment Variables
- [ ] Update NEXTAUTH_URL to your custom domain
- [ ] Redeploy to apply changes

### 3. Update Google OAuth
- [ ] Add new redirect URI with custom domain:
  ```
  https://your-custom-domain.com/api/auth/callback/google
  ```

## Database Providers

### Option 1: Vercel Postgres
- [ ] Create Postgres database in Vercel
- [ ] Connection string auto-added to env vars
- [ ] Run `npx prisma db push`

### Option 2: Supabase
- [ ] Create project at [supabase.com](https://supabase.com)
- [ ] Get connection string from Settings > Database
- [ ] Add to Vercel environment variables
- [ ] Run migrations

### Option 3: Railway
- [ ] Create project at [railway.app](https://railway.app)
- [ ] Add PostgreSQL service
- [ ] Copy connection string
- [ ] Add to Vercel environment variables
- [ ] Run migrations

### Option 4: Neon
- [ ] Create project at [neon.tech](https://neon.tech)
- [ ] Get connection string
- [ ] Add to Vercel environment variables
- [ ] Run migrations

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify all dependencies in package.json
- Ensure TypeScript compiles locally: `npm run build`

### Database Connection Errors
- Verify DATABASE_URL is correct
- Check database is accessible from Vercel
- Ensure SSL mode is correct (add `?sslmode=require` if needed)

### Authentication Issues
- Verify Google OAuth redirect URI matches exactly
- Check NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set

### OpenAI API Errors
- Verify API key is correct
- Check you have sufficient credits
- Ensure you have access to required models (Whisper, GPT-4)

## Rollback Plan

If deployment fails:
- [ ] Revert to previous Vercel deployment
- [ ] Check error logs
- [ ] Fix issues locally
- [ ] Test thoroughly
- [ ] Redeploy

## Success Criteria

Deployment is successful when:
- [ ] All pages load without errors
- [ ] Authentication works end-to-end
- [ ] Meeting upload and processing works
- [ ] Data persists correctly
- [ ] No console errors
- [ ] Performance is acceptable

## Maintenance

Regular tasks:
- [ ] Monitor OpenAI API costs
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Review user feedback

## Cost Monitoring

Track these costs:
- [ ] Vercel hosting (free tier or Pro)
- [ ] Database hosting
- [ ] OpenAI API usage
- [ ] Domain registration (if custom domain)

Estimated monthly costs for moderate use:
- Vercel: $0 (Hobby) or $20 (Pro)
- Database: $0-10 (free tiers available)
- OpenAI: $5-50 (depends on usage)
- Domain: $10-15/year

Total: Can start with $0-5/month on free tiers!

