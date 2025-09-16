"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatCard } from "@/components/shared/stat-card"
import { ChartCard } from "@/components/shared/chart-card"
import { DataTable } from "@/components/shared/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { dummyStudents, dummyUniversities, getAverageHSI, getAverageCGPA } from "@/lib/mock-data"
import { Building2, Users, GraduationCap, TrendingUp, FileText, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  // TODO: Replace with API calls -> GET /api/admin/dashboard
  const totalStudents = dummyStudents.length
  const totalUniversities = dummyUniversities.length
  const averageHSI = getAverageHSI()
  const averageCGPA = getAverageCGPA()

  const universityData = dummyUniversities.map((uni) => ({
    name: uni.name.split(" ")[0], // Shortened for chart
    students: uni.totalStudents,
    faculty: uni.totalFaculty,
  }))

  const monthlyData = [
    { month: "Jan", students: 1200, placements: 45, hsi: 72 },
    { month: "Feb", students: 1350, placements: 52, hsi: 74 },
    { month: "Mar", students: 1480, placements: 61, hsi: 76 },
    { month: "Apr", students: 1620, placements: 68, hsi: 78 },
    { month: "May", students: 1750, placements: 75, hsi: 79 },
    { month: "Jun", students: 1890, placements: 82, hsi: 81 },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "university",
      title: "New University Added",
      description: "Stanford University joined the platform",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "report",
      title: "Monthly Report Generated",
      description: "June 2024 analytics report is ready",
      timestamp: "4 hours ago",
      status: "info",
    },
    {
      id: 3,
      type: "alert",
      title: "System Maintenance",
      description: "Scheduled maintenance completed successfully",
      timestamp: "1 day ago",
      status: "success",
    },
    {
      id: 4,
      type: "user",
      title: "Bulk User Import",
      description: "500 new students imported from MIT",
      timestamp: "2 days ago",
      status: "success",
    },
  ]

  const topUniversities = dummyUniversities
    .sort((a, b) => b.totalStudents - a.totalStudents)
    .slice(0, 5)
    .map((uni, index) => ({
      rank: index + 1,
      name: uni.name,
      location: uni.location,
      students: uni.totalStudents,
      faculty: uni.totalFaculty,
    }))

  const columns = [
    { key: "rank", label: "Rank", sortable: true },
    { key: "name", label: "University", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "students", label: "Students", sortable: true },
    { key: "faculty", label: "Faculty", sortable: true },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "university":
        return <Building2 className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  return (
    <DashboardLayout role="admin" currentPage="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive overview of the Smart Student Hub platform</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button>
                <Building2 className="h-4 w-4 mr-2" />
                Add University
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={totalStudents.toLocaleString()}
            description="Across all universities"
            icon={Users}
            trend={{ value: 12.5, label: "from last month", isPositive: true }}
          />
          <StatCard
            title="Universities"
            value={totalUniversities}
            description="Partner institutions"
            icon={Building2}
            trend={{ value: 8.3, label: "new this quarter", isPositive: true }}
          />
          <StatCard
            title="Average HSI"
            value={averageHSI}
            description="Platform-wide score"
            icon={TrendingUp}
            trend={{ value: 4.2, label: "improvement", isPositive: true }}
          />
          <StatCard
            title="Average CGPA"
            value={averageCGPA}
            description="Academic performance"
            icon={GraduationCap}
            trend={{ value: 2.1, label: "this semester", isPositive: true }}
          />
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest platform activities and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-0 bg-muted/30 rounded-lg">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Key platform metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Logins</span>
                <span className="font-medium">15,632</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reports Generated</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="font-medium">2.4 TB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Calls Today</span>
                <span className="font-medium">45,231</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Universities Table */}
        <DataTable
          title="Top Universities by Student Count"
          data={topUniversities}
          columns={columns}
          searchable={true}
          exportable={true}
        />
      </div>
    </DashboardLayout>
  )
}
