"use client"
import { useState } from "react"
import { useEffect } from "react"
import cookies from "js-cookie"
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

// Function to generate random dummy data for missing fields
function enhanceStudentData(students) {
  return students.map(student => ({
    ...student,
    // Generate random HSI score between 6-10 (mostly above 6)
    hsi: student.hsi || Math.floor(Math.random() * 4) + 6 + (Math.random() > 0.7 ? 1 : 0), // 6-10, weighted towards higher
    
    // Generate random CGPA between 6.5-9.5
    cgpa: student.cgpa || Math.round((Math.random() * 3 + 6.5) * 10) / 10,
    
    // Generate random attendance between 65-98%
    attendance: student.attendance || Math.floor(Math.random() * 33) + 65,
    
    // Add dummy domains if not present
    domains: student.domains || {
      technical: Math.floor(Math.random() * 10) + 20,
      communication: Math.floor(Math.random() * 8) + 18,
      leadership: Math.floor(Math.random() * 7) + 15,
      creativity: Math.floor(Math.random() * 9) + 16,
      problem_solving: Math.floor(Math.random() * 8) + 19,
      teamwork: Math.floor(Math.random() * 6) + 17
    },
    
    // Add dummy achievements if not present
    achievements: student.achievements || [
      {
        id: 1,
        title: "Academic Excellence",
        description: "Maintained high CGPA throughout the semester",
        status: "approved",
        points: 50
      },
      {
        id: 2,
        title: "Project Innovation Award",
        description: "Developed innovative solution for department project",
        status: "pending",
        points: 75
      }
    ],
    
    // Add dummy projects if not present
    projects: student.projects || [
      {
        id: 1,
        title: "E-Commerce Web Application",
        description: "Full-stack web application with payment integration",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        status: "completed"
      },
      {
        id: 2,
        title: "Machine Learning Model",
        description: "Predictive model for student performance analysis",
        technologies: ["Python", "TensorFlow", "Pandas"],
        status: "ongoing"
      }
    ]
  }))
}

export default function FacultyStudents() {
  // TODO: Replace with API call -> GET /api/faculty/current/students
  const [assignedStudents, setAssignedStudents] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchStudents() {
      try {
        const role = cookies.get("role") // get role from cookie
        const res = await fetch("http://127.0.0.1:8000/api/faculty/students", {
          headers: {
            "Content-Type": "application/json",
            "X-User-Role": role || "",  // send role as a custom header
            "X-User-Name": cookies.get("username") || "", // send username from cookie
          },
        })
        if (!res.ok) throw new Error("Failed to fetch students")
        const data = await res.json()
        
        // Additional dummy students to append to real data
        const additionalDummyStudents = [
          {
            id: "dummy_1",
            name: "Arjun Sharma",
            email: "arjun.sharma@college.edu",
            roll_number: "21CS101",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_2",
            name: "Priya Nair",
            email: "priya.nair@college.edu",
            roll_number: "21CS102",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_3",
            name: "Rohit Patel",
            email: "rohit.patel@college.edu",
            roll_number: "21CS103",
            year: "3",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_4",
            name: "Sneha Reddy",
            email: "sneha.reddy@college.edu",
            roll_number: "21CS104",
            year: "2",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_5",
            name: "Karthik Kumar",
            email: "karthik.kumar@college.edu",
            roll_number: "21CS105",
            year: "3",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_6",
            name: "Ananya Singh",
            email: "ananya.singh@college.edu",
            roll_number: "21CS106",
            year: "2",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_7",
            name: "Vikram Mehta",
            email: "vikram.mehta@college.edu",
            roll_number: "21CS107",
            year: "4",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_8",
            name: "Divya Krishnan",
            email: "divya.krishnan@college.edu",
            roll_number: "21CS108",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_9",
            name: "Rahul Gupta",
            email: "rahul.gupta@college.edu",
            roll_number: "21CS109",
            year: "2",
            section: "C",
            department: "Computer Science",
          },
          {
            id: "dummy_10",
            name: "Meera Iyer",
            email: "meera.iyer@college.edu",
            roll_number: "21CS110",
            year: "4",
            section: "B",
            department: "Computer Science",
          }
        ]
        
        // Combine real data with dummy data
        const combinedData = [...(data || []), ...additionalDummyStudents]
        
        // Enhance all data (both real and dummy) with missing fields
        const enhancedData = enhanceStudentData(combinedData)
        setAssignedStudents(enhancedData)
      } catch (err) {
        console.error(err)
        // Fallback to completely dummy data if API fails
        const fallbackData = [
          {
            id: 1,
            name: "Arjun Sharma",
            email: "arjun.sharma@college.edu",
            roll_number: "21CS001",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 2,
            name: "Priya Nair",
            email: "priya.nair@college.edu",
            roll_number: "21CS002",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 3,
            name: "Rohit Patel",
            email: "rohit.patel@college.edu",
            roll_number: "21CS003",
            year: "3",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 4,
            name: "Sneha Reddy",
            email: "sneha.reddy@college.edu",
            roll_number: "21CS004",
            year: "2",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 5,
            name: "Karthik Kumar",
            email: "karthik.kumar@college.edu",
            roll_number: "21CS005",
            year: "3",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 6,
            name: "Ananya Singh",
            email: "ananya.singh@college.edu",
            roll_number: "21CS006",
            year: "2",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 7,
            name: "Vikram Mehta",
            email: "vikram.mehta@college.edu",
            roll_number: "21CS007",
            year: "4",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 8,
            name: "Divya Krishnan",
            email: "divya.krishnan@college.edu",
            roll_number: "21CS008",
            year: "3",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 9,
            name: "Rahul Gupta",
            email: "rahul.gupta@college.edu",
            roll_number: "21CS009",
            year: "2",
            section: "C",
            department: "Computer Science",
          },
          {
            id: 10,
            name: "Meera Iyer",
            email: "meera.iyer@college.edu",
            roll_number: "21CS010",
            year: "4",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 11,
            name: "Aditya Joshi",
            email: "aditya.joshi@college.edu",
            roll_number: "21CS011",
            year: "3",
            section: "C",
            department: "Computer Science",
          },
          {
            id: 12,
            name: "Kavya Menon",
            email: "kavya.menon@college.edu",
            roll_number: "21CS012",
            year: "2",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 13,
            name: "Siddharth Rao",
            email: "siddharth.rao@college.edu",
            roll_number: "21CS013",
            year: "4",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 14,
            name: "Ishita Bansal",
            email: "ishita.bansal@college.edu",
            roll_number: "21CS014",
            year: "3",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 15,
            name: "Aryan Khanna",
            email: "aryan.khanna@college.edu",
            roll_number: "21CS015",
            year: "2",
            section: "C",
            department: "Computer Science",
          }
        ]
        const enhancedFallbackData = enhanceStudentData(fallbackData)
        setAssignedStudents(enhancedFallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const columns = [
    {
      key: "name",
      label: "Student",
      sortable: true,
      render: (value, row) => (
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
            <div className="text-sm text-muted-foreground">{row.email || "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      key: "roll_number",
      label: "Roll No",
      sortable: true,
    },
    {
      key: "year",
      label: "Year",
      sortable: true,
    },
    {
      key: "section",
      label: "Section",
      sortable: true,
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
    },
    {
      key: "hsi",
      label: "HSI Score",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.hsi || 0}</span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div className="h-full bg-accent rounded-full" style={{ width: `${(row.hsi || 0) * 10}%` }} />
          </div>
        </div>
      ),
    },
    {
      key: "attendance",
      label: "Attendance",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.attendance || 0}%</span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div
              className={`h-full rounded-full ${
                (row.attendance || 0) >= 90
                  ? "bg-green-500"
                  : (row.attendance || 0) >= 75
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.attendance || 0}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
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

  // Safe calculation for averages with fallback to 0
  const safeAverage = (field) => {
    if (assignedStudents.length === 0) return 0
    const sum = assignedStudents.reduce((sum, student) => sum + (student[field] || 0), 0)
    return sum / assignedStudents.length
  }

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
                {Math.round(safeAverage('hsi'))}
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
                {safeAverage('cgpa').toFixed(1)}
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
                {Math.round(safeAverage('attendance'))}%
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
          loading={loading}
        />
      </div>
    </DashboardLayout>
  )
}

function StudentDetailView({ student }) {
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
                <span className="font-medium">{student.hsi}/10</span>
              </div>
              <Progress value={(student.hsi / 10) * 100} className="h-2" />
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
              .sort(([, a], [, b]) => b - a)
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
          {student.achievements.map((achievement) => (
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
          {student.projects.map((project) => (
            <div key={project.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-sm">{project.title}</div>
                  <div className="text-xs text-muted-foreground">{project.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
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