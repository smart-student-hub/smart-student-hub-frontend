"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatCard } from "@/components/shared/stat-card"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { dummyStudents, dummyFaculty } from "@/lib/mock-data"
import { Users, CheckCircle, Clock, TrendingUp, Award, Calendar, BookOpen } from "lucide-react"

export default function FacultyDashboard() {
  // TODO: Replace with API call -> GET /api/faculty/current
  const currentFaculty = dummyFaculty[0] // Dr. Sarah Wilson
  const assignedStudents = dummyStudents.filter((student) => currentFaculty.assignedStudents.includes(student.id))

  // Mock data for charts
  const studentProgressData = assignedStudents.map((student) => ({
    name: student.name.split(" ")[0],
    hsi: student.hsi,
    cgpa: student.cgpa * 10, // Scale for better visualization
    attendance: student.attendance,
  }))

  const monthlyAttendanceData = [
    { month: "Jan", average: 85, target: 90 },
    { month: "Feb", average: 88, target: 90 },
    { month: "Mar", average: 87, target: 90 },
    { month: "Apr", average: 91, target: 90 },
    { month: "May", average: 89, target: 90 },
    { month: "Jun", average: 92, target: 90 },
  ]

  const pendingAchievements = [
    {
      id: 1,
      studentName: "Alice Johnson",
      title: "Best Project Award",
      category: "academic",
      submittedDate: "2024-06-28",
      description: "Won first place in annual project competition",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      title: "Hackathon Winner",
      category: "extracurricular",
      submittedDate: "2024-06-27",
      description: "Won regional hackathon with blockchain solution",
    },
    {
      id: 3,
      studentName: "Alice Johnson",
      title: "Research Publication",
      category: "research",
      submittedDate: "2024-06-25",
      description: "Co-authored paper on machine learning applications",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "achievement",
      title: "Achievement Approved",
      description: "Approved Alice Johnson's project award",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "attendance",
      title: "Attendance Updated",
      description: "Updated attendance for CS101 class",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "student",
      title: "Student Meeting",
      description: "Scheduled meeting with Bob Smith",
      timestamp: "1 day ago",
    },
  ]

  const averageHSI = assignedStudents.reduce((sum, student) => sum + student.hsi, 0) / assignedStudents.length
  const averageCGPA = assignedStudents.reduce((sum, student) => sum + student.cgpa, 0) / assignedStudents.length
  const averageAttendance =
    assignedStudents.reduce((sum, student) => sum + student.attendance, 0) / assignedStudents.length

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="h-4 w-4" />
      case "attendance":
        return <Calendar className="h-4 w-4" />
      case "student":
        return <Users className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout role="faculty" currentPage="Faculty Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {currentFaculty.name}!</h1>
              <p className="text-muted-foreground">
                {currentFaculty.department} • {currentFaculty.college}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You have {assignedStudents.length} assigned students and {pendingAchievements.length} pending reviews
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-accent">{Math.round(averageHSI)}</div>
              <div className="text-sm text-muted-foreground">Avg HSI Score</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Assigned Students"
            value={assignedStudents.length}
            description="Under your guidance"
            icon={Users}
            trend={{ value: 2, label: "new this semester", isPositive: true }}
          />
          <StatCard
            title="Pending Reviews"
            value={pendingAchievements.length}
            description="Achievements to approve"
            icon={Clock}
            trend={{ value: 1, label: "since yesterday", isPositive: false }}
          />
          <StatCard
            title="Average CGPA"
            value={averageCGPA.toFixed(1)}
            description="Your students' performance"
            icon={TrendingUp}
            trend={{ value: 4.2, label: "improvement", isPositive: true }}
          />
          <StatCard
            title="Attendance Rate"
            value={`${Math.round(averageAttendance)}%`}
            description="Class attendance"
            icon={Calendar}
            trend={{ value: 2.1, label: "this month", isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Student Performance Overview"
            description="HSI scores of your assigned students"
            data={studentProgressData}
            type="bar"
            dataKey="hsi"
            xAxisKey="name"
          />
          <ChartCard
            title="Monthly Attendance Trends"
            description="Class attendance vs target"
            data={monthlyAttendanceData}
            type="line"
            dataKey="average"
            xAxisKey="month"
          />
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Achievements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Pending Achievement Reviews
                  </CardTitle>
                  <CardDescription>Student achievements awaiting your approval</CardDescription>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  {pendingAchievements.length} Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">by {achievement.studentName}</p>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="capitalize">
                          {achievement.category.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Submitted {new Date(achievement.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Pending Reviews
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions & Recent Activities */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common faculty tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Achievements
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View My Students
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your recent actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-1 bg-accent/10 rounded-full mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Student Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Summary</CardTitle>
            <CardDescription>Overview of your assigned students' progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedStudents.map((student) => (
                <div key={student.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{student.name}</h3>
                    <Badge variant="outline">{student.batch}</Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>HSI Score</span>
                        <span className="font-medium">{student.hsi}/100</span>
                      </div>
                      <Progress value={student.hsi} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CGPA</span>
                        <span className="font-medium">{student.cgpa}/10.0</span>
                      </div>
                      <Progress value={(student.cgpa / 10) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span className="font-medium">{student.attendance}%</span>
                      </div>
                      <Progress value={student.attendance} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <span>{student.achievements.length} achievements</span>
                    <span>{student.projects.length} projects</span>
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
