import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'
import { ActionItems } from '@/components/meeting/action-items'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import { Calendar, FileText } from 'lucide-react'
import type { MeetingSummary } from '@/types'

async function getMeeting(id: string, userId: string) {
  const meeting = await prisma.meeting.findFirst({
    where: {
      id,
      userId,
    },
  })
  return meeting
}

export default async function MeetingPage({ params }: { params: { id: string } }) {
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

  const meeting = await getMeeting(params.id, user.id)

  if (!meeting) {
    redirect('/dashboard')
  }

  const summary = meeting.summaryJson as MeetingSummary

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Meeting Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{meeting.title}</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(meeting.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{meeting.originalFileName}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transcript Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Full Transcript</CardTitle>
                <CardDescription>
                  Complete transcription of the meeting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {meeting.transcript}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items and Decisions Section */}
          <div>
            <ActionItems summary={summary} />
          </div>
        </div>
      </main>
    </div>
  )
}

