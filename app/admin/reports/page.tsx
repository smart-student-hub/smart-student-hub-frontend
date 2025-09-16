"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { dummyUniversities } from "@/lib/mock-data"
import { FileText, Download, TrendingUp, Award, Building2, Filter } from "lucide-react"

export default function AdminReports() {
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [selectedReport, setSelectedReport] = useState("participation")
  const [dateRange, setDateRange] = useState<any>(null)

  // TODO: Replace with API calls -> GET /api/admin/reports
  const participationData = [
    { month: "Jan", participation: 78, placements: 45, research: 23 },
    { month: "Feb", participation: 82, placements: 52, research: 28 },
    { month: "Mar", participation: 85, placements: 61, research: 31 },
    { month: "Apr", participation: 88, placements: 68, research: 35 },
    { month: "May", participation: 91, placements: 75, research: 38 },
    { month: "Jun", participation: 94, placements: 82, research: 42 },
  ]

  const universityPerformance = dummyUniversities.map((uni) => ({
    name: uni.name.split(" ")[0],
    avgHSI: Math.floor(Math.random() * 30) + 60,
    avgCGPA: Math.floor(Math.random() * 200) + 700,
    placements: Math.floor(Math.random() * 100) + 50,
  }))

  const domainDistribution = [
    { domain: "AI/ML", students: 450, percentage: 25 },
    { domain: "Web Dev", students: 380, percentage: 21 },
    { domain: "Data Science", students: 320, percentage: 18 },
    { domain: "Mobile", students: 280, percentage: 16 },
    { domain: "Cloud", students: 220, percentage: 12 },
    { domain: "Others", students: 150, percentage: 8 },
  ]

  const recentReports = [
    {
      id: 1,
      title: "Monthly Participation Report",
      description: "Student engagement and activity metrics for June 2024",
      type: "participation",
      generatedDate: "2024-06-30",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Placement Analytics",
      description: "Comprehensive placement statistics across all universities",
      type: "placement",
      generatedDate: "2024-06-28",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Research Output Summary",
      description: "Research publications and project outcomes",
      type: "research",
      generatedDate: "2024-06-25",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "Community Service Impact",
      description: "Student community engagement and service hours",
      type: "community",
      generatedDate: "2024-06-20",
      status: "processing",
      downloadUrl: "#",
    },
  ]

  const handleGenerateReport = () => {
    // TODO: Replace with API call -> POST /api/admin/reports/generate
    console.log("Generating report:", {
      type: selectedReport,
      university: selectedUniversity,
      dateRange,
    })
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "participation":
        return "bg-blue-100 text-blue-800"
      case "placement":
        return "bg-green-100 text-green-800"
      case "research":
        return "bg-purple-100 text-purple-800"
      case "community":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="admin" currentPage="Reports & Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate comprehensive reports and analyze platform data</p>
          </div>
          <Button onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* Report Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Configuration
            </CardTitle>
            <CardDescription>Configure parameters for report generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="participation">Participation Report</SelectItem>
                    <SelectItem value="placement">Placement Analytics</SelectItem>
                    <SelectItem value="research">Research Output</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University</label>
                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    {dummyUniversities.map((uni) => (
                      <SelectItem key={uni.id} value={uni.id.toString()}>
                        {uni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
              </div>
              <div className="flex items-end">
                <Button onClick={handleGenerateReport} className="w-full">
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Participation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Across all universities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Projects</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Participation Trends"
            description="Monthly participation, placement, and research metrics"
            data={participationData}
            type="line"
            dataKey="participation"
            xAxisKey="month"
          />
          <ChartCard
            title="University Performance"
            description="Average HSI scores by university"
            data={universityPerformance}
            type="bar"
            dataKey="avgHSI"
            xAxisKey="name"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Domain Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Domain Distribution</CardTitle>
              <CardDescription>Student interest and expertise across technical domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainDistribution.map((domain) => (
                  <div key={domain.domain} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-accent rounded-full" />
                      <span className="font-medium">{domain.domain}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${domain.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium w-16">{domain.students} students</span>
                      <span className="text-sm text-muted-foreground w-8">{domain.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Latest generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                      </div>
                      {report.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getReportTypeColor(report.type)}>{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
