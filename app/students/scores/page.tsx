"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { dummyStudents } from "@/lib/mock-data"
import { TrendingUp, Target, Award, ChevronDown, ChevronUp, Info, Trophy, FolderOpen, Code } from "lucide-react"
import { useState } from "react"

export default function StudentScores() {
  // TODO: Replace with API call -> GET /api/students/current/scores
  const currentStudent = dummyStudents[0]
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  // Convert domain scores to max 10 (divide by 4 since original was max 40)
  const domainScores = Object.entries(currentStudent.domains).reduce((acc, [domain, score]) => {
    acc[domain] = Math.round((score / 40) * 10 * 10) / 10; // Round to 1 decimal place
    return acc;
  }, {} as Record<string, number>);

  // Mock project scores (in real app, this would come from API)
  const projectScores = {
    totalScore: 15, // Sum of all project scores
    maxScore: 30,   // Maximum possible project score (3 projects × 10 each)
    averageScore: 7.5, // Average project score
    projectCount: 2 // Number of scored projects
  };

  // Calculate total score including projects
  const totalDomainScore = Object.values(domainScores).reduce((a, b) => a + b, 0);
  const maxDomainScore = 100; // 10 domains × 10 max each
  const totalOverallScore = totalDomainScore + projectScores.totalScore;
  const maxOverallScore= 100;

  // Recalculate HSI to include project scores
  const updatedHSI = 6.7

  const domainData = Object.entries(domainScores).map(([domain, score]) => ({
    domain: domain.replace("_", " ").toUpperCase(),
    score,
    maxScore: 10,
    percentage: (score / 10) * 100,
  }))

  // Add project score to chart data
  const chartData = [
    ...domainData.map((item) => ({
      ...item,
      fill: "#3b82f6"
    })),
    {
      domain: "PROJECTS",
      score: projectScores.averageScore,
      maxScore: 10,
      percentage: (projectScores.averageScore / 10) * 100,
      fill: "#8b5cf6"
    }
  ];

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
    if (score >= 7.5) return "Expert (7.5-10 points)"
    if (score >= 5) return "Intermediate (5-7.4 points)"
    if (score >= 2.5) return "Beginner (2.5-4.9 points)"
    return "Novice (0-2.4 points)"
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
                {totalOverallScore.toFixed(1)}/{maxOverallScore}
              </div>
              <p className="text-xs text-muted-foreground">Domains + Projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(totalOverallScore / 11).toFixed(1)}/10
              </div>
              <p className="text-xs text-muted-foreground">All areas combined</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updated HSI</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{updatedHSI}</div>
              <p className="text-xs text-muted-foreground">Including Project Score</p>
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

        {/* Project Score Overview */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FolderOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-purple-800">Project Portfolio Score</CardTitle>
                <CardDescription>Your project-based achievements and practical skills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">{projectScores.totalScore}/{projectScores.maxScore}</div>
                <p className="text-sm text-muted-foreground">Total Project Score</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{projectScores.averageScore}/10</div>
                <p className="text-sm text-muted-foreground">Average per Project</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
                <div className="text-2xl font-bold text-green-600">{projectScores.projectCount}</div>
                <p className="text-sm text-muted-foreground">Scored Projects</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                <div className="text-2xl font-bold text-amber-600">{Math.round((projectScores.totalScore / projectScores.maxScore) * 100)}%</div>
                <p className="text-sm text-muted-foreground">Portfolio Progress</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="h-4 w-4 text-purple-600" />
                  <h3 className="font-medium text-foreground">PROJECT PORTFOLIO</h3>
                  <Badge className={getScoreBadge((projectScores.averageScore / 10) * 100).className}>
                    {getScoreBadge((projectScores.averageScore / 10) * 100).label}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${getScoreColor((projectScores.averageScore / 10) * 100)}`}>
                    {projectScores.averageScore}/10
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">({Math.round((projectScores.averageScore / 10) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(projectScores.averageScore / 10) * 100} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {getScoreRange(projectScores.averageScore)} - {getScoreBadge((projectScores.averageScore / 10) * 100).description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expanded Chart */}
        <div className="w-full">
          <ChartCard
            title="Domain + Project Distribution"
            description="Your performance across all technical domains and project portfolio"
            data={chartData}
            type="bar"
            dataKey="score"
            xAxisKey="domain"
          />
        </div>

        {/* Detailed Scores - Two Separate Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column Card */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Domains (1-5)</CardTitle>
              <CardDescription>Your performance in core technical areas (Max: 10 points each)</CardDescription>
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
              <CardTitle>Technical Domains (6-10)</CardTitle>
              <CardDescription>Your performance in specialized technical areas (Max: 10 points each)</CardDescription>
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
                  <CardTitle className="text-xl">How Scoring Works</CardTitle>
                  <CardDescription>Understanding the updated scoring system and improvement strategies</CardDescription>
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
                  <div className="grid md:grid-cols-3 gap-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h4 className="font-semibold text-lg text-foreground">Score Ranges</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                          <span className="font-medium text-slate-700">Novice (0-2.4)</span>
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">Beginner</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-amber-100">
                          <span className="font-medium text-amber-700">Beginner (2.5-4.9)</span>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">Learning</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                          <span className="font-medium text-blue-700">Intermediate (5-7.4)</span>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Proficient</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-emerald-100">
                          <span className="font-medium text-emerald-700">Expert (7.5-10)</span>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Master</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h4 className="font-semibold text-lg text-foreground">Domain Improvement</h4>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Complete relevant coursework and certifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Participate in domain-specific competitions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Contribute to open source projects</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Publish research or technical articles</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Complete industry internships</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <h4 className="font-semibold text-lg text-foreground">Project Improvement</h4>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Build end-to-end applications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Focus on code quality and documentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Deploy projects with proper CI/CD</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Use modern tech stacks and practices</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Demonstrate real-world problem solving</span>
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