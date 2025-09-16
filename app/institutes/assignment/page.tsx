"use client"
import { useState } from "react";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, UserPlus, UserMinus, RefreshCw, AlertCircle } from "lucide-react";
import { Student, Faculty, dummyStudents, dummyFaculty } from "@/lib/mock-data";

export function StudentFacultyAssignment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  // TODO: Replace with API calls
  // GET /api/institutes/students
  // GET /api/institutes/faculty
  const students = dummyStudents;
  const faculty = dummyFaculty;

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || student.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const unassignedStudents = students.filter(s => !s.facultyAdvisor);
  const assignedStudents = students.filter(s => s.facultyAdvisor);

  const getFacultyById = (id: number) => faculty.find(f => f.id === id);
  const getAvailableFaculty = (department: string) => 
    faculty.filter(f => f.department === department && f.assignedStudents.length < f.maxStudents);

  const handleAssignStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !selectedFaculty) return;

    // TODO: Replace with API call -> PUT /api/institutes/students/:id/assign-faculty
    console.log(`Assigning student ${selectedStudent.id} to faculty ${selectedFaculty}`);
    setIsAssignDialogOpen(false);
    setSelectedStudent(null);
    setSelectedFaculty("");
  };

  const handleUnassignStudent = (studentId: number) => {
    // TODO: Replace with API call -> PUT /api/institutes/students/:id/unassign-faculty
    console.log(`Unassigning student ${studentId} from faculty`);
  };

  const handleReassignStudent = (student: Student) => {
    setSelectedStudent(student);
    setSelectedFaculty("");
    setIsAssignDialogOpen(true);
  };

  const departments = [...new Set(students.map(s => s.department))];

  return (
    <DashboardLayout role = "university"currentPage="Student-Faculty Assignment">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Student-Faculty Assignment</h2>
          <p className="text-text-secondary">Manage student-faculty advisor assignments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{students.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Assigned Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{assignedStudents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Unassigned Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-error">{unassignedStudents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Active Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{faculty.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dept-filter">Department</Label>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">
              Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-3 text-text-secondary font-medium">Student</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Department</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Batch</th>
                    <th className="text-left p-3 text-text-secondary font-medium">CGPA</th>
                    <th className="text-left p-3 text-text-secondary font-medium">HSI</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Faculty Advisor</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const advisor = student.facultyAdvisor ? getFacultyById(student.facultyAdvisor) : null;
                    const availableFaculty = getAvailableFaculty(student.department);
                    
                    return (
                      <tr key={student.id} className="border-b border-card-border">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-text-primary">{student.name}</p>
                            <p className="text-sm text-text-secondary">{student.email}</p>
                          </div>
                        </td>
                        <td className="p-3 text-text-primary">{student.department}</td>
                        <td className="p-3 text-text-primary">{student.batch}</td>
                        <td className="p-3">
                          <Badge variant={student.cgpa >= 8.0 ? "default" : "secondary"}>
                            {student.cgpa}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={student.hsi >= 75 ? "default" : "secondary"}>
                            {student.hsi}
                          </Badge>
                        </td>
                        <td className="p-3">
                          {advisor ? (
                            <div>
                              <p className="text-sm font-medium text-text-primary">{advisor.name}</p>
                              <p className="text-xs text-text-secondary">{advisor.specialization}</p>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-error border-error">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Unassigned
                            </Badge>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {!advisor ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsAssignDialogOpen(true);
                                }}
                                disabled={availableFaculty.length === 0}
                              >
                                <UserPlus className="w-4 h-4 mr-1" />
                                Assign
                              </Button>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReassignStudent(student)}
                                  disabled={availableFaculty.length === 0}
                                >
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Reassign
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUnassignStudent(student.id)}
                                >
                                  <UserMinus className="w-4 h-4 mr-1" />
                                  Unassign
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedStudent?.facultyAdvisor ? 'Reassign' : 'Assign'} Faculty Advisor
              </DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <form onSubmit={handleAssignStudent} className="space-y-4">
                <div>
                  <Label>Student</Label>
                  <div className="p-3 bg-card-background rounded border">
                    <p className="font-medium text-text-primary">{selectedStudent.name}</p>
                    <p className="text-sm text-text-secondary">{selectedStudent.department} - {selectedStudent.batch}</p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="faculty-select">Select Faculty Advisor</Label>
                  <Select value={selectedFaculty} onValueChange={setSelectedFaculty} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose faculty advisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableFaculty(selectedStudent.department).map(facultyMember => (
                        <SelectItem key={facultyMember.id} value={facultyMember.id.toString()}>
                          <div>
                            <p className="font-medium">{facultyMember.name}</p>
                            <p className="text-xs text-text-secondary">
                              {facultyMember.assignedStudents.length}/{facultyMember.maxStudents} students • {facultyMember.specialization}
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getAvailableFaculty(selectedStudent.department).length === 0 && (
                    <p className="text-sm text-error mt-1">
                      No available faculty in {selectedStudent.department} department
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1" disabled={!selectedFaculty}>
                    {selectedStudent.facultyAdvisor ? 'Reassign' : 'Assign'} Faculty
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAssignDialogOpen(false);
                      setSelectedStudent(null);
                      setSelectedFaculty("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Faculty Load Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">Faculty Load Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faculty.map(facultyMember => (
                <div key={facultyMember.id} className="flex items-center justify-between p-3 bg-card-background rounded">
                  <div>
                    <p className="font-medium text-text-primary">{facultyMember.name}</p>
                    <p className="text-sm text-text-secondary">{facultyMember.department} • {facultyMember.specialization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {facultyMember.assignedStudents.length}/{facultyMember.maxStudents} students
                    </p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          facultyMember.assignedStudents.length >= facultyMember.maxStudents 
                            ? 'bg-error' 
                            : facultyMember.assignedStudents.length >= facultyMember.maxStudents * 0.8
                            ? 'bg-warning'
                            : 'bg-success'
                        }`}
                        style={{ 
                          width: `${(facultyMember.assignedStudents.length / facultyMember.maxStudents) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default StudentFacultyAssignment;