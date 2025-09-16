"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { dummyStudents } from "@/lib/mock-data"
import { TrendingUp, Target, Award, ChevronDown, ChevronUp, Info, Trophy } from "lucide-react"
import { useState } from "react"

export default function StudentScores() {
  // TODO: Replace with API call -> GET /api/students/current/scores
  const currentStudent = dummyStudents[0]
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const domainData = Object.entries(currentStudent.domains).map(([domain, score]) => ({
    domain: domain.replace("_", " ").toUpperCase(),
    score,
    maxScore: 40,
    percentage: (score / 40) * 100,
  }))

  const barData = domainData.map((item) => ({
    ...item,
    fill: "#3b82f6"
  }))

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return "text-emerald-600"
    if (percentage >= 50) return "text-blue-600"
    if (percentage >= 25) return "text-amber-600"
    return "text-slate-600"
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 75) return { label: "Expert", variant: "default" as const, description: "Master", className: "bg-emerald-100 text-emerald-700 border-emerald-200" }
    if (percentage >= 50) return { label: "Intermediate", variant: "secondary" as const, description: "Proficient", className: "bg-blue-100 text-blue-700 border-blue-200" }
    if (percentage >= 25) return { label: "Beginner", variant: "outline" as const, description: "Learning", className: "bg-amber-100 text-amber-700 border-amber-200" }
    return { label: "Novice", variant: "destructive" as const, description: "Beginner", className: "bg-slate-100 text-slate-700 border-slate-200" }
  }

  const getScoreRange = (score: number) => {
    if (score >= 30) return "Expert (30-40 points)"
    if (score >= 20) return "Intermediate (20-29 points)"
    if (score >= 10) return "Beginner (10-19 points)"
    return "Novice (0-9 points)"
  }

  // Split domains into two columns
  const midPoint = Math.ceil(domainData.length / 2)
  const leftColumnDomains = domainData.slice(0, midPoint)
  const rightColumnDomains = domainData.slice(midPoint)

  return (
    <DashboardLayout role="student" currentPage="Domain Scores">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(currentStudent.domains).reduce((a, b) => a + b, 0)}/400
              </div>
              <p className="text-xs text-muted-foreground">Across all domains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(Object.values(currentStudent.domains).reduce((a, b) => a + b, 0) / 10)}/40
              </div>
              <p className="text-xs text-muted-foreground">Per domain</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HSI Score</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{currentStudent.hsi}</div>
              <p className="text-xs text-muted-foreground">Holistic Student Index</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Domain</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {domainData.reduce((prev, current) => (prev.score > current.score ? prev : current)).domain}
              </div>
              <p className="text-xs text-muted-foreground">Highest scoring area</p>
            </CardContent>
          </Card>
        </div>

        {/* Expanded Chart */}
        <div className="w-full">
          <ChartCard
            title="Domain Distribution"
            description="Your performance across all technical domains"
            data={barData}
            type="bar"
            dataKey="score"
            xAxisKey="domain"
          />
        </div>

  {/* Detailed Scores - Two Separate Cards */}
  <div id="technical-domains" className="grid md:grid-cols-2 gap-6">
          {/* Left Column Card */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Domains </CardTitle>
              <CardDescription>Your performance in core technical areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leftColumnDomains.map((domain) => {
                  const badge = getScoreBadge(domain.percentage)
                  return (
                    <div key={domain.domain} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{domain.domain}</h3>
                          <Badge className={badge.className}>{badge.label}</Badge>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${getScoreColor(domain.percentage)}`}>
                            {domain.score}/{domain.maxScore}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">({Math.round(domain.percentage)}%)</span>
                        </div>
                      </div>
                      <Progress value={domain.percentage} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        {getScoreRange(domain.score)} - {badge.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Right Column Card */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Domains </CardTitle>
              <CardDescription>Your performance in specialized technical areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rightColumnDomains.map((domain) => {
                  const badge = getScoreBadge(domain.percentage)
                  return (
                    <div key={domain.domain} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{domain.domain}</h3>
                          <Badge className={badge.className}>{badge.label}</Badge>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${getScoreColor(domain.percentage)}`}>
                            {domain.score}/{domain.maxScore}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">({Math.round(domain.percentage)}%)</span>
                        </div>
                      </div>
                      <Progress value={domain.percentage} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        {getScoreRange(domain.score)} - {badge.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How Domain Scores Work - Bottom Section */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">How Domain Scores Work</CardTitle>
                  <CardDescription>Understanding the scoring system and improvement strategies</CardDescription>
                </div>
              </div>
              <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {isInfoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {isInfoOpen ? "Hide Details" : "Show Details"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6">
                  <div className="grid md:grid-cols-2 gap-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h4 className="font-semibold text-lg text-foreground">Score Ranges</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                          <span className="font-medium text-slate-700">Novice (0-9 points)</span>
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">Beginner</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-amber-100">
                          <span className="font-medium text-amber-700">Beginner (10-19 points)</span>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">Learning</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                          <span className="font-medium text-blue-700">Intermediate (20-29 points)</span>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Proficient</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-emerald-100">
                          <span className="font-medium text-emerald-700">Expert (30-40 points)</span>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Master</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h4 className="font-semibold text-lg text-foreground">How to Improve</h4>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Complete relevant projects and coursework</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Participate in hackathons and competitions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Contribute to open source projects</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Earn certifications in your domain</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Publish research or technical articles</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Complete internships in relevant fields</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  )
}