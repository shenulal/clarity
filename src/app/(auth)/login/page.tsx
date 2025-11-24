'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Chrome } from 'lucide-react'

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary mb-2">Clarity</CardTitle>
        <CardDescription className="text-base">
          Sign in to access your meeting insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full"
          size="lg"
        >
          <Chrome className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  )
}

