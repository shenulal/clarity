import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, User, Lightbulb } from 'lucide-react'
import type { MeetingSummary } from '@/types'

interface ActionItemsProps {
  summary: MeetingSummary
}

export function ActionItems({ summary }: ActionItemsProps) {
  return (
    <div className="space-y-6">
      {/* Decisions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Decisions Made
          </CardTitle>
          <CardDescription>
            Key decisions from this meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          {summary.decisions && summary.decisions.length > 0 ? (
            <ul className="space-y-3">
              {summary.decisions.map((decision, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{decision}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No decisions identified</p>
          )}
        </CardContent>
      </Card>

      {/* Action Items Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            Action Items
          </CardTitle>
          <CardDescription>
            Tasks and follow-ups from this meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          {summary.action_items && summary.action_items.length > 0 ? (
            <div className="space-y-4">
              {summary.action_items.map((item, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{item.task}</p>
                    {item.assignee && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Assigned to: {item.assignee}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No action items identified</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

