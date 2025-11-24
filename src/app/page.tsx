import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Mic, Zap, Share2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Clarity</div>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Never Miss a Meeting Detail Again
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Clarity automatically transcribes your meetings, extracts action items, and syncs them
          to your project management tools. Save time and stay organized.
        </p>
        <Link href="/login">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Free Trial
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How Clarity Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Mic className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Automatic Transcription</CardTitle>
              <CardDescription>
                Upload your meeting recordings and get accurate transcripts powered by AI
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Smart Extraction</CardTitle>
              <CardDescription>
                AI identifies key decisions and action items automatically from your meetings
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Share2 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Seamless Integration</CardTitle>
              <CardDescription>
                Sync action items to your favorite project management tools (coming soon)
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Teams Love Clarity</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              'Save hours every week on meeting notes',
              'Never lose track of action items',
              'Keep your entire team aligned',
              'Focus on the conversation, not note-taking',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join teams who are already saving time with Clarity
        </p>
        <Link href="/login">
          <Button size="lg" className="text-lg px-8 py-6">
            Sign Up Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Clarity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

