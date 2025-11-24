# Clarity - Complete File Structure

This document shows every file in the project and what it does.

## 📁 Root Directory

```
clarity/
├── 📄 START_HERE.md                    # Start here! Quick navigation guide
├── 📄 QUICK_START.md                   # 10-minute setup guide
├── 📄 README.md                        # Main documentation
├── 📄 SETUP.md                         # Detailed setup instructions
├── 📄 PROJECT_SUMMARY.md               # Architecture and technical overview
├── 📄 DEPLOYMENT_CHECKLIST.md          # Production deployment guide
├── 📄 TESTING_GUIDE.md                 # Complete testing guide
├── 📄 FILE_STRUCTURE.md                # This file
│
├── 📄 package.json                     # Dependencies and scripts
├── 📄 tsconfig.json                    # TypeScript configuration
├── 📄 next.config.js                   # Next.js configuration
├── 📄 tailwind.config.ts               # Tailwind CSS configuration
├── 📄 postcss.config.js                # PostCSS configuration
├── 📄 .env.example                     # Environment variables template
├── 📄 .gitignore                       # Git ignore rules
│
├── 📁 prisma/                          # Database
├── 📁 public/                          # Static assets
└── 📁 src/                             # Source code
```

## 📁 prisma/

Database schema and migrations.

```
prisma/
└── 📄 schema.prisma                    # Database schema definition
                                        # - User model
                                        # - Meeting model
                                        # - NextAuth models (Account, Session, etc.)
```

## 📁 public/

Static assets (images, fonts, etc.).

```
public/
└── 📄 .gitkeep                         # Ensures directory is tracked
                                        # Add your logo, favicon here
```

## 📁 src/

All application source code.

```
src/
├── 📄 middleware.ts                    # Route protection middleware
│
├── 📁 app/                             # Next.js App Router pages
├── 📁 components/                      # React components
├── 📁 lib/                             # Utilities and configurations
└── 📁 types/                           # TypeScript type definitions
```

## 📁 src/app/

Next.js pages and API routes.

```
src/app/
├── 📄 layout.tsx                       # Root layout (wraps all pages)
├── 📄 page.tsx                         # Landing page (/)
├── 📄 providers.tsx                    # Client-side providers (NextAuth)
├── 📄 globals.css                      # Global styles and Tailwind
│
├── 📁 (auth)/                          # Auth route group
│   ├── 📄 layout.tsx                   # Auth layout (centered)
│   └── 📁 login/
│       └── 📄 page.tsx                 # Login page (/login)
│
├── 📁 api/                             # API routes
│   ├── 📁 auth/
│   │   └── 📁 [...nextauth]/
│   │       └── 📄 route.ts             # NextAuth API handler
│   └── 📁 meetings/
│       └── 📁 process/
│           └── 📄 route.ts             # Meeting processing API
│
├── 📁 dashboard/
│   └── 📄 page.tsx                     # Dashboard page (/dashboard)
│
├── 📁 meeting/
│   └── 📁 [id]/
│       └── 📄 page.tsx                 # Meeting details (/meeting/[id])
│
└── 📁 settings/
    └── 📄 page.tsx                     # Settings page (/settings)
```

## 📁 src/components/

Reusable React components.

```
src/components/
├── 📄 header.tsx                       # App header with navigation
│
├── 📁 ui/                              # shadcn/ui components
│   ├── 📄 avatar.tsx                   # Avatar component
│   ├── 📄 button.tsx                   # Button component
│   ├── 📄 card.tsx                     # Card component
│   ├── 📄 dropdown-menu.tsx            # Dropdown menu component
│   ├── 📄 label.tsx                    # Label component
│   └── 📄 separator.tsx                # Separator component
│
├── 📁 dashboard/
│   ├── 📄 meeting-list.tsx             # Meeting list display
│   └── 📄 upload-button.tsx            # File upload button
│
└── 📁 meeting/
    └── 📄 action-items.tsx             # Action items and decisions display
```

## 📁 src/lib/

Utility functions and configurations.

```
src/lib/
├── 📄 auth.ts                          # NextAuth configuration
│                                       # - Google OAuth provider
│                                       # - Session callbacks
│                                       # - Prisma adapter
│
├── 📄 prisma.ts                        # Prisma client singleton
│                                       # - Prevents multiple instances
│                                       # - Development logging
│
├── 📄 openai.ts                        # OpenAI client setup
│                                       # - API key configuration
│
└── 📄 utils.ts                         # Utility functions
                                        # - cn() for className merging
                                        # - formatDate() for date formatting
```

## 📁 src/types/

TypeScript type definitions.

```
src/types/
├── 📄 index.ts                         # App-specific types
│                                       # - ActionItem
│                                       # - MeetingSummary
│                                       # - Meeting
│
└── 📄 next-auth.d.ts                   # NextAuth type extensions
                                        # - Adds 'id' to session.user
```

## 🔑 Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript compiler settings |
| `next.config.js` | Next.js configuration (image domains, etc.) |
| `tailwind.config.ts` | Tailwind CSS theme and plugins |
| `.env.example` | Template for environment variables |

### Core Application Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, wraps entire app |
| `src/app/page.tsx` | Landing page (marketing) |
| `src/middleware.ts` | Protects routes, requires auth |
| `src/lib/auth.ts` | Authentication configuration |
| `src/lib/prisma.ts` | Database client |

### API Routes

| File | Purpose |
|------|---------|
| `src/app/api/auth/[...nextauth]/route.ts` | Handles OAuth flow |
| `src/app/api/meetings/process/route.ts` | Processes uploaded meetings |

### Pages

| File | Route | Purpose |
|------|-------|---------|
| `src/app/page.tsx` | `/` | Landing page |
| `src/app/(auth)/login/page.tsx` | `/login` | Login page |
| `src/app/dashboard/page.tsx` | `/dashboard` | User dashboard |
| `src/app/meeting/[id]/page.tsx` | `/meeting/[id]` | Meeting details |
| `src/app/settings/page.tsx` | `/settings` | User settings |

### Components

| File | Used In | Purpose |
|------|---------|---------|
| `header.tsx` | All authenticated pages | Navigation, user menu |
| `meeting-list.tsx` | Dashboard | Display meetings grid |
| `upload-button.tsx` | Dashboard | Upload audio files |
| `action-items.tsx` | Meeting details | Show extracted items |

## 📊 File Count Summary

- **Total Files**: ~35
- **TypeScript/TSX**: ~25
- **Configuration**: ~6
- **Documentation**: ~8
- **CSS**: 1

## 🎨 Styling Architecture

```
Tailwind CSS (utility-first)
    ↓
shadcn/ui components (pre-built, customizable)
    ↓
Custom components (app-specific)
    ↓
Pages (composed from components)
```

## 🔄 Data Flow

```
User uploads file
    ↓
upload-button.tsx (client)
    ↓
/api/meetings/process (server)
    ↓
OpenAI Whisper (transcription)
    ↓
OpenAI GPT-4 (extraction)
    ↓
Prisma → PostgreSQL (storage)
    ↓
Meeting details page (display)
```

## 🛣️ Route Structure

```
/ (public)
    Landing page

/login (public)
    Google OAuth login

/dashboard (protected)
    Meeting list + upload

/meeting/[id] (protected)
    Meeting details

/settings (protected)
    User settings

/api/auth/[...nextauth] (public)
    OAuth callbacks

/api/meetings/process (protected)
    Meeting processing
```

## 📝 Notes

- **Route Groups**: `(auth)` is a route group (doesn't affect URL)
- **Dynamic Routes**: `[id]` creates dynamic segments
- **API Routes**: Files in `app/api/` become API endpoints
- **Server Components**: Default in App Router (no 'use client')
- **Client Components**: Marked with 'use client' directive

## 🔍 Finding Things

**Need to modify...**
- Landing page → `src/app/page.tsx`
- Dashboard → `src/app/dashboard/page.tsx`
- Meeting processing → `src/app/api/meetings/process/route.ts`
- Database schema → `prisma/schema.prisma`
- Styles → `src/app/globals.css` or Tailwind classes
- Auth config → `src/lib/auth.ts`
- Types → `src/types/index.ts`

**Need to add...**
- New page → Create in `src/app/`
- New component → Create in `src/components/`
- New API route → Create in `src/app/api/`
- New utility → Add to `src/lib/`
- New type → Add to `src/types/`

