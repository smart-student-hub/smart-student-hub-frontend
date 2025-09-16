"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Button } from "@/components/ui/button"
import { dummyStudents, dummyFaculty } from "@/lib/mock-data"
import { Save, Download } from "lucide-react"

export default function FacultyAttendance() {
  // TODO: Replace with API call -> GET /api/faculty/current/students
  const currentFaculty = dummyFaculty[0]
  const assignedStudents = dummyStudents.filter((student) =>
    currentFaculty.assignedStudents.includes(student.id),
  )

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("CS101")
  const [attendance, setAttendance] = useState<Record<number, boolean>>({})

  // Mock class data
  const classes = [
    { id: "CS101", name: "Introduction to Computer Science", time: "09:00 AM" },
    { id: "CS201", name: "Data Structures and Algorithms", time: "11:00 AM" },
    { id: "CS301", name: "Database Management Systems", time: "02:00 PM" },
  ]

  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
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
  const absentCount = assignedStudents.length - presentCount
  const attendancePercentage = assignedStudents.length > 0 ? (presentCount / assignedStudents.length) * 100 : 0

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

        {/* Attendance Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label htmlFor="class" className="text-sm font-medium text-foreground">
              Select Class:
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.time}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {assignedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={attendance[student.id] || false}
                      onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm">Present: {presentCount}</p>
              <p className="text-sm">Absent: {absentCount}</p>
              <p className="text-sm">Attendance Percentage: {attendancePercentage.toFixed(2)}%</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleMarkAllPresent}>
                Mark All Present
              </Button>
              <Button variant="outline" onClick={handleMarkAllAbsent}>
                Mark All Absent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
