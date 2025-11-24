import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'
import { MeetingList } from '@/components/dashboard/meeting-list'
import { UploadButton } from '@/components/dashboard/upload-button'
import type { Meeting, MeetingSummary } from '@/types'

async function getMeetings(userId: string): Promise<Meeting[]> {
  const meetings = await prisma.meeting.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return meetings.map(meeting => ({
    ...meeting,
    summaryJson: meeting.summaryJson as MeetingSummary
  }))
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect('/login')
  }

  const meetings = await getMeetings(user.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Meetings</h1>
            <p className="text-muted-foreground">
              View and manage your processed meeting recordings
            </p>
          </div>
          <UploadButton />
        </div>
        <MeetingList meetings={meetings} />
      </main>
    </div>
  )
}

