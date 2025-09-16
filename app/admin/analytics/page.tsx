"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { ChartCard } from "@/components/shared/chart-card"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { dummyStudents, dummyUniversities } from "@/lib/mock-data"
import { Users, Target, Activity, BarChart3 } from "lucide-react"

export default function AdminAnalytics() {
  // TODO: Replace with API calls -> GET /api/admin/analytics
  const totalStudents = dummyStudents.length
  const totalUniversities = dummyUniversities.length

  const growthData = [
    { month: "Jan", students: 1200, faculty: 180, universities: 8 },
    { month: "Feb", students: 1350, faculty: 195, universities: 9 },
    { month: "Mar", students: 1480, faculty: 210, universities: 10 },
    { month: "Apr", students: 1620, faculty: 225, universities: 11 },
    { month: "May", students: 1750, faculty: 240, universities: 12 },
    { month: "Jun", students: 1890, faculty: 255, universities: 13 },
  ]

  const engagementData = [
    { week: "Week 1", logins: 2400, activities: 1800, submissions: 450 },
    { week: "Week 2", logins: 2600, activities: 2100, submissions: 520 },
    { week: "Week 3", logins: 2800, activities: 2300, submissions: 580 },
    { week: "Week 4", logins: 3100, activities: 2600, submissions: 640 },
  ]

  const performanceMetrics = [
    { university: "MIT", avgHSI: 85, avgCGPA: 8.7, placements: 92 },
    { university: "Stanford", avgHSI: 82, avgCGPA: 8.5, placements: 89 },
    { university: "Harvard", avgHSI: 88, avgCGPA: 8.9, placements: 94 },
  ]

  const topDomains = [
    { domain: "Artificial Intelligence", students: 450, growth: 15.2 },
    { domain: "Web Development", students: 380, growth: 12.8 },
    { domain: "Data Science", students: 320, growth: 18.5 },
    { domain: "Mobile Development", students: 280, growth: 9.3 },
    { domain: "Cloud Computing", students: 220, growth: 22.1 },
  ]

  const systemMetrics = [
    { metric: "API Response Time", value: "145ms", status: "good", target: "<200ms" },
    { metric: "Database Queries/sec", value: "1,247", status: "good", target: "<2,000" },
    { metric: "Active Sessions", value: "3,456", status: "good", target: "<5,000" },
    { metric: "Error Rate", value: "0.02%", status: "excellent", target: "<0.1%" },
    { metric: "Memory Usage", value: "68%", status: "warning", target: "<80%" },
    { metric: "CPU Usage", value: "45%", status: "good", target: "<70%" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout role="admin" currentPage="Advanced Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Advanced Analytics</h1>
              <p className="text-muted-foreground">Deep insights into platform performance and user engagement</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-accent">98.7%</div>
              <div className="text-sm text-muted-foreground">Platform Health</div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Monthly Active Users"
            value="15,847"
            description="Unique active users"
            icon={Users}
            trend={{ value: 8.2, label: "from last month", isPositive: true }}
          />
          <StatCard
            title="Engagement Rate"
            value="73.5%"
            description="Daily active users"
            icon={Activity}
            trend={{ value: 5.1, label: "improvement", isPositive: true }}
          />
          <StatCard
            title="Completion Rate"
            value="89.2%"
            description="Task completion"
            icon={Target}
            trend={{ value: 3.7, label: "this quarter", isPositive: true }}
          />
          <StatCard
            title="System Uptime"
            value="99.9%"
            description="Service availability"
            icon={BarChart3}
            trend={{ value: 0.1, label: "this month", isPositive: true }}
          />
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Platform Growth"
            description="Monthly growth in students, faculty, and universities"
            data={growthData}
            type="line"
            dataKey="students"
            xAxisKey="month"
          />
          <ChartCard
            title="User Engagement"
            description="Weekly user activity and engagement metrics"
            data={engagementData}
            type="bar"
            dataKey="logins"
            xAxisKey="week"
          />
        </div>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>University Performance Comparison</CardTitle>
              <CardDescription>Key metrics across top performing universities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceMetrics.map((uni) => (
                  <div key={uni.university} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{uni.university}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span>HSI: {uni.avgHSI}</span>
                        <span>CGPA: {uni.avgCGPA}</span>
                        <span>Placements: {uni.placements}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">HSI Score</div>
                        <Progress value={uni.avgHSI} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">CGPA</div>
                        <Progress value={(uni.avgCGPA / 10) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placements</div>
                        <Progress value={uni.placements} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Domains</CardTitle>
              <CardDescription>Most popular technical domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDomains.map((domain, index) => (
                  <div key={domain.domain} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{domain.domain}</div>
                        <div className="text-xs text-muted-foreground">{domain.students} students</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+{domain.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health Metrics
            </CardTitle>
            <CardDescription>Real-time system performance and health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    {getStatusBadge(metric.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold ${getStatusColor(metric.status)}`}>{metric.value}</span>
                    <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
