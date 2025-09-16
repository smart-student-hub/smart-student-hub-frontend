"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DataTable } from "@/components/shared/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { dummyStudents, dummyFaculty } from "@/lib/mock-data"
import { Users, Eye, MessageCircle, Award, BookOpen, TrendingUp, Calendar } from "lucide-react"

export default function FacultyStudents() {
  // TODO: Replace with API call -> GET /api/faculty/current/students
  const currentFaculty = dummyFaculty[0]
  const assignedStudents = dummyStudents.filter((student) => currentFaculty.assignedStudents.includes(student.id))

  const columns = [
    {
      key: "name",
      label: "Student",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">
              {value
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "batch",
      label: "Batch",
      sortable: true,
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "hsi",
      label: "HSI Score",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div className="h-full bg-accent rounded-full" style={{ width: `${value}%` }} />
          </div>
        </div>
      ),
    },
    {
      key: "cgpa",
      label: "CGPA",
      sortable: true,
      render: (value: number) => <span className="font-medium">{value}/10.0</span>,
    },
    {
      key: "attendance",
      label: "Attendance",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}%</span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div
              className={`h-full rounded-full ${value >= 90 ? "bg-green-500" : value >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "achievements",
      label: "Achievements",
      render: (value: any[]) => <span className="font-medium">{value.length}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{row.name} - Student Details</DialogTitle>
                <DialogDescription>Comprehensive view of student performance and activities</DialogDescription>
              </DialogHeader>
              <StudentDetailView student={row} />
            </DialogContent>
          </Dialog>
          <Button size="sm" variant="outline">
            <MessageCircle className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout role="faculty" currentPage="My Students">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Students</h1>
            <p className="text-muted-foreground">Manage and monitor your assigned students' progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedStudents.length}</div>
              <p className="text-xs text-muted-foreground">Under your guidance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average HSI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(assignedStudents.reduce((sum, student) => sum + student.hsi, 0) / assignedStudents.length)}
              </div>
              <p className="text-xs text-muted-foreground">Holistic Student Index</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(assignedStudents.reduce((sum, student) => sum + student.cgpa, 0) / assignedStudents.length).toFixed(
                  1,
                )}
              </div>
              <p className="text-xs text-muted-foreground">Academic performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  assignedStudents.reduce((sum, student) => sum + student.attendance, 0) / assignedStudents.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">Class attendance</p>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <DataTable
          title="Assigned Students"
          data={assignedStudents}
          columns={columns}
          searchable={true}
          filterable={true}
          exportable={true}
        />
      </div>
    </DashboardLayout>
  )
}

function StudentDetailView({ student }: { student: any }) {
  return (
    <div className="space-y-6">
      {/* Student Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Academic Performance</h3>
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
        </div>

        <div>
          <h3 className="font-medium mb-2">Domain Expertise</h3>
          <div className="space-y-2">
            {Object.entries(student.domains)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 5)
              .map(([domain, score]) => (
                <div key={domain} className="flex items-center justify-between text-sm">
                  <span className="capitalize">{domain.replace("_", " ")}</span>
                  <span className="font-medium">{score}/30</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-medium mb-3">Recent Achievements</h3>
        <div className="space-y-2">
          {student.achievements.map((achievement: any) => (
            <div key={achievement.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium text-sm">{achievement.title}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              <div className="text-right">
                <Badge
                  className={
                    achievement.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : achievement.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {achievement.status}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">{achievement.points} points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h3 className="font-medium mb-3">Projects</h3>
        <div className="space-y-2">
          {student.projects.map((project: any) => (
            <div key={project.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-sm">{project.title}</div>
                  <div className="text-xs text-muted-foreground">{project.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge
                  className={
                    project.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : project.status === "ongoing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
