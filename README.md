# Clarity - AI-Powered Meeting Assistant

Clarity is a SaaS application that automatically transcribes online meetings, identifies decisions and action items, and prepares them for syncing to project management tools.

## Features

- **User Authentication**: Google OAuth integration via NextAuth.js
- **Meeting Transcription**: Automatic transcription using OpenAI Whisper API
- **AI-Powered Extraction**: GPT-4 extracts decisions and action items from transcripts
- **Dashboard**: View all processed meetings at a glance
- **Meeting Details**: Full transcript with structured action items and decisions
- **Settings**: Profile management and integration placeholders

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Google Provider
- **AI**: OpenAI (Whisper + GPT-4 Turbo)

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Google OAuth credentials
- OpenAI API key

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: `http://localhost:3000` for development
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `OPENAI_API_KEY`: From OpenAI platform

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/         # Login page
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   └── meetings/      # Meeting processing API
│   │   ├── dashboard/         # Dashboard page
│   │   ├── meeting/[id]/      # Meeting details page
│   │   ├── settings/          # Settings page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard components
│   │   └── meeting/           # Meeting components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   ├── openai.ts          # OpenAI client
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── index.ts           # TypeScript types
└── package.json
```

## Usage

1. **Sign In**: Click "Get Started" and sign in with Google
2. **Upload Meeting**: Click "Upload Meeting" on the dashboard
3. **Select Audio File**: Choose an audio file (.mp3, .m4a, .webm, .wav)
4. **Wait for Processing**: The app will transcribe and analyze the meeting
5. **View Results**: See the transcript, decisions, and action items

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

For production, use a managed PostgreSQL service:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

## Future Enhancements

- Real-time meeting transcription
- Integration with Trello, Asana, Jira, Notion
- Calendar integration (Google Calendar, Outlook)
- Team collaboration features
- Custom meeting templates
- Export to PDF/Word

## License

MIT

