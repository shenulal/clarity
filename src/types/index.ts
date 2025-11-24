export interface ActionItem {
  task: string
  assignee: string | null
}

export interface MeetingSummary {
  decisions: string[]
  action_items: ActionItem[]
}

export interface Meeting {
  id: string
  title: string
  originalFileName: string
  transcript: string
  summaryJson: MeetingSummary
  createdAt: Date
  updatedAt: Date
  userId: string
}

