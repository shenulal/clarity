import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/openai'
import type { MeetingSummary } from '@/types'

/**
 * Transcribes an audio file using OpenAI Whisper API
 */
async function transcribeAudio(file: File): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
    })
    return transcription.text
  } catch (error) {
    console.error('Transcription error:', error)
    throw new Error('Failed to transcribe audio file')
  }
}

/**
 * Extracts action items and decisions from transcript using GPT-4
 */
async function extractActionItems(transcript: string): Promise<MeetingSummary> {
  try {
    const systemPrompt = `You are an expert meeting assistant. Your task is to analyze a meeting transcript and extract key information. You must respond only in a valid JSON object with two keys: 'decisions' and 'action_items'. The 'decisions' key should contain an array of strings, where each string is a clear decision made. The 'action_items' key should contain an array of objects, where each object has 'task' (string) and 'assignee' (string, or null if not mentioned) properties.`

    const userPrompt = `Please analyze the following transcript:\n\n---\n${transcript}\n---`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from GPT-4')
    }

    const parsed = JSON.parse(content) as MeetingSummary

    // Validate the structure
    if (!parsed.decisions || !Array.isArray(parsed.decisions)) {
      parsed.decisions = []
    }
    if (!parsed.action_items || !Array.isArray(parsed.action_items)) {
      parsed.action_items = []
    }

    return parsed
  } catch (error) {
    console.error('Extraction error:', error)
    throw new Error('Failed to extract action items from transcript')
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/mp4', 'audio/webm', 'audio/wav', 'audio/m4a']
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|m4a|webm|wav)$/i)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an audio file.' },
        { status: 400 }
      )
    }

    // Step 1: Transcribe audio
    console.log('Transcribing audio file:', file.name)
    const transcript = await transcribeAudio(file)

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcription resulted in empty text' },
        { status: 400 }
      )
    }

    // Step 2: Extract action items and decisions
    console.log('Extracting action items from transcript')
    const summary = await extractActionItems(transcript)

    // Step 3: Generate title
    const date = new Date()
    const title = `Meeting on ${date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`

    // Step 4: Save to database
    const meeting = await prisma.meeting.create({
      data: {
        title,
        originalFileName: file.name,
        transcript,
        summaryJson: summary as any,
        userId: user.id,
      },
    })

    console.log('Meeting processed successfully:', meeting.id)

    return NextResponse.json({
      success: true,
      meetingId: meeting.id,
      message: 'Meeting processed successfully',
    })
  } catch (error) {
    console.error('Error processing meeting:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process meeting',
      },
      { status: 500 }
    )
  }
}

