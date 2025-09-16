import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Building2, UserCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="h-12 w-12 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Smart Student Hub</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive platform connecting universities, faculty, students, and recruiters in one intelligent
            ecosystem
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Admin Portal</CardTitle>
              <CardDescription>University administration and comprehensive reporting</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/admin">
                <Button className="w-full bg-transparent" variant="outline">
                  Access Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">HEI Dashboard</CardTitle>
              <CardDescription>Higher Education Institution management and analytics</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/institutes">
                <Button className="w-full bg-transparent" variant="outline">
                  Access HEI Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Student Portal</CardTitle>
              <CardDescription>Personal dashboard, achievements, and portfolio management</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/students">
                <Button className="w-full bg-transparent" variant="outline">
                  Access Student Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Faculty Portal</CardTitle>
              <CardDescription>Student management, attendance, and achievement approval</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/faculty">
                <Button className="w-full bg-transparent" variant="outline">
                  Access Faculty Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <UserCheck className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Recruiter Portal</CardTitle>
              <CardDescription>Student discovery and recruitment management</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/recruiters">
                <Button className="w-full bg-transparent" variant="outline">
                  Access Recruiter Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Authentication</CardTitle>
              <CardDescription>Login or register to access your personalized dashboard</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Link href="/auth/login">
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full bg-transparent" variant="outline">
                  Register
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-medium mb-2 text-foreground">Holistic Student Index</h3>
              <p className="text-muted-foreground">Comprehensive scoring system across 10 technical domains</p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-foreground">Real-time Analytics</h3>
              <p className="text-muted-foreground">Live dashboards with participation and placement insights</p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-foreground">Smart Matching</h3>
              <p className="text-muted-foreground">
                AI-powered student-recruiter matching based on skills and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
