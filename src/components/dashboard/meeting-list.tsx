import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { FileText, Calendar } from 'lucide-react'
import type { Meeting } from '@/types'

interface MeetingListProps {
  meetings: Meeting[]
}

export function MeetingList({ meetings }: MeetingListProps) {
  if (meetings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No meetings yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your first meeting recording to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <Link key={meeting.id} href={`/meeting/${meeting.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="line-clamp-1">{meeting.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(meeting.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-2">{meeting.transcript.substring(0, 150)}...</p>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span>
                  {meeting.summaryJson.action_items?.length || 0} action items
                </span>
                <span>
                  {meeting.summaryJson.decisions?.length || 0} decisions
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

