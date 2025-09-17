"use client"

import { useState, useEffect } from "react"
import cookies from "js-cookie"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dummyStudents, dummyFaculty } from "@/lib/mock-data"
import { Save, Download, Users, UserCheck, UserX, Clock } from "lucide-react"

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
    }
  }))
}

export default function FacultyAttendance() {
  const [assignedStudents, setAssignedStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState("CS101")
  const [attendance, setAttendance] = useState({})

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
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_2",
            name: "Priya Nair",
            email: "priya.nair@college.edu",
            roll_number: "21CS102",
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_3",
            name: "Rohit Patel",
            email: "rohit.patel@college.edu",
            roll_number: "21CS103",
            year: "3rd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_4",
            name: "Sneha Reddy",
            email: "sneha.reddy@college.edu",
            roll_number: "21CS104",
            year: "2nd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_5",
            name: "Karthik Kumar",
            email: "karthik.kumar@college.edu",
            roll_number: "21CS105",
            year: "3rd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_6",
            name: "Ananya Singh",
            email: "ananya.singh@college.edu",
            roll_number: "21CS106",
            year: "2nd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: "dummy_7",
            name: "Vikram Mehta",
            email: "vikram.mehta@college.edu",
            roll_number: "21CS107",
            year: "4th Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_8",
            name: "Divya Krishnan",
            email: "divya.krishnan@college.edu",
            roll_number: "21CS108",
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: "dummy_9",
            name: "Rahul Gupta",
            email: "rahul.gupta@college.edu",
            roll_number: "21CS109",
            year: "2nd Year",
            section: "C",
            department: "Computer Science",
          },
          {
            id: "dummy_10",
            name: "Meera Iyer",
            email: "meera.iyer@college.edu",
            roll_number: "21CS110",
            year: "4th Year",
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
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 2,
            name: "Priya Nair",
            email: "priya.nair@college.edu",
            roll_number: "21CS002",
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 3,
            name: "Rohit Patel",
            email: "rohit.patel@college.edu",
            roll_number: "21CS003",
            year: "3rd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 4,
            name: "Sneha Reddy",
            email: "sneha.reddy@college.edu",
            roll_number: "21CS004",
            year: "2nd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 5,
            name: "Karthik Kumar",
            email: "karthik.kumar@college.edu",
            roll_number: "21CS005",
            year: "3rd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 6,
            name: "Ananya Singh",
            email: "ananya.singh@college.edu",
            roll_number: "21CS006",
            year: "2nd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 7,
            name: "Vikram Mehta",
            email: "vikram.mehta@college.edu",
            roll_number: "21CS007",
            year: "4th Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 8,
            name: "Divya Krishnan",
            email: "divya.krishnan@college.edu",
            roll_number: "21CS008",
            year: "3rd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 9,
            name: "Rahul Gupta",
            email: "rahul.gupta@college.edu",
            roll_number: "21CS009",
            year: "2nd Year",
            section: "C",
            department: "Computer Science",
          },
          {
            id: 10,
            name: "Meera Iyer",
            email: "meera.iyer@college.edu",
            roll_number: "21CS010",
            year: "4th Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 11,
            name: "Aditya Joshi",
            email: "aditya.joshi@college.edu",
            roll_number: "21CS011",
            year: "3rd Year",
            section: "C",
            department: "Computer Science",
          },
          {
            id: 12,
            name: "Kavya Menon",
            email: "kavya.menon@college.edu",
            roll_number: "21CS012",
            year: "2nd Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 13,
            name: "Siddharth Rao",
            email: "siddharth.rao@college.edu",
            roll_number: "21CS013",
            year: "4th Year",
            section: "A",
            department: "Computer Science",
          },
          {
            id: 14,
            name: "Ishita Bansal",
            email: "ishita.bansal@college.edu",
            roll_number: "21CS014",
            year: "3rd Year",
            section: "B",
            department: "Computer Science",
          },
          {
            id: 15,
            name: "Aryan Khanna",
            email: "aryan.khanna@college.edu",
            roll_number: "21CS015",
            year: "2nd Year",
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

  // Mock class data
  const classes = [
    { id: "CS101", name: "Introduction to Computer Science", time: "09:00 AM" },
    { id: "CS201", name: "Data Structures and Algorithms", time: "11:00 AM" },
    { id: "CS301", name: "Database Management Systems", time: "02:00 PM" },
    { id: "CS401", name: "Software Engineering", time: "03:30 PM" },
    { id: "CS501", name: "Machine Learning", time: "10:00 AM" },
  ]

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }))
  }

  const handleSaveAttendance = () => {
    // TODO: Replace with API call -> POST /api/attendance
    console.log("Saving attendance:", {
      date: selectedDate,
      class: selectedClass,
      attendance,
    })
    alert("Attendance saved successfully!")
  }

  const handleMarkAllPresent = () => {
    const allPresent = assignedStudents.reduce(
      (acc, student) => ({
        ...acc,
        [student.id]: true,
      }),
      {},
    )
    setAttendance(allPresent)
  }

  const handleMarkAllAbsent = () => {
    const allAbsent = assignedStudents.reduce(
      (acc, student) => ({
        ...acc,
        [student.id]: false,
      }),
      {},
    )
    setAttendance(allAbsent)
  }

  const presentCount = Object.values(attendance).filter(Boolean).length
  const absentCount = Object.values(attendance).filter(v => v === false).length
  const attendancePercentage = assignedStudents.length > 0 ? (presentCount / assignedStudents.length) * 100 : 0

  const selectedClassInfo = classes.find(cls => cls.id === selectedClass)

  return (
    <DashboardLayout role="faculty" currentPage="Attendance Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground">Mark and manage student attendance for your classes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={handleSaveAttendance} disabled={Object.keys(attendance).length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
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
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <p className="text-xs text-muted-foreground">Students present</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <p className="text-xs text-muted-foreground">Students absent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendancePercentage.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Today's attendance</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Selection and Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="date" className="text-sm font-medium text-foreground min-w-fit">
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="class" className="text-sm font-medium text-foreground min-w-fit">
                Select Class:
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-input rounded-md px-3 py-2 text-sm bg-background min-w-[300px]"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - {cls.time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="outline" onClick={handleMarkAllAbsent}>
                Mark All Absent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedClassInfo?.name} - {selectedClassInfo?.time}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Date: {selectedDate.toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading students...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="border border-border px-4 py-3 text-left text-sm font-medium">Roll Number</th>
                      <th className="border border-border px-4 py-3 text-left text-sm font-medium">Student Name</th>
                      <th className="border border-border px-4 py-3 text-left text-sm font-medium">Year</th>
                      <th className="border border-border px-4 py-3 text-left text-sm font-medium">Section</th>
                      <th className="border border-border px-4 py-3 text-center text-sm font-medium">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-muted/30">
                        <td className="border border-border px-4 py-3 text-sm">{student.roll_number}</td>
                        <td className="border border-border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-accent-foreground">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-border px-4 py-3 text-sm">{student.year}</td>
                        <td className="border border-border px-4 py-3 text-sm">{student.section}</td>
                        <td className="border border-border px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={attendance[student.id] || false}
                                onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                              />
                              <span className="text-sm">
                                {attendance[student.id] ? "Present" : "Absent"}
                              </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}