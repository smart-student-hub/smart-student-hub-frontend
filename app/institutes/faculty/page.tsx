"use client"
import { useState } from "react";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users } from "lucide-react";
import { dummyFaculty, dummyStudents, Faculty, Student } from "@/lib/mock-data";

export function InstituteFaculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  // TODO: Replace with API call -> GET /api/institutes/faculty
  const faculty = dummyFaculty;
  const students = dummyStudents;

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || f.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "department", title: "Department" },
    { key: "university", title: "University" },
    { 
      key: "studentsAssigned", 
      title: "Students Assigned",
      render: (value: any) => <Badge variant="outline">{value?.length || 0}</Badge>
    },
    {
      key: "id",
      title: "Actions",
      render: (value: any, row: any) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setSelectedFaculty(row);
            setIsAssignDialogOpen(true);
          }}
        >
          <Users className="w-4 h-4 mr-1" />
          Assign Students
        </Button>
      )
    },
  ];

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call -> POST /api/institutes/faculty
    console.log("Adding faculty...");
    setIsAddDialogOpen(false);
  };

  const handleAssignStudents = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call -> PUT /api/institutes/faculty/:id/assign-students
    console.log("Assigning students to faculty...");
    setIsAssignDialogOpen(false);
  };

  const departments = [...new Set(faculty.map(f => f.department))];
  const unassignedStudents = students.filter(s => !faculty.some(f => f.assignedStudents?.includes(s.id)));

  return (
    <DashboardLayout role = "hei" currentPage="Manage Faculty">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Faculty Management</h2>
            <p className="text-text-secondary">Manage faculty members and student assignments</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Faculty Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddFaculty} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter faculty name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="faculty@email.com" required />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input id="experience" type="number" placeholder="5" required />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" placeholder="AI/ML, Web Development, etc." />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Add Faculty</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">Filter Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Faculty</Label>
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
                <Label htmlFor="dept-filter">Filter by Department</Label>
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

        {/* Faculty Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">
              Faculty List ({filteredFaculty.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={filteredFaculty} 
              columns={columns}
            />
          </CardContent>
        </Card>

        {/* Assign Students Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Students to {selectedFaculty?.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAssignStudents} className="space-y-4">
              <div>
                <Label>Select Students to Assign</Label>
                <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-2">
                  {unassignedStudents.length > 0 ? (
                    unassignedStudents.map(student => (
                      <div key={student.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={`student-${student.id}`} />
                        <label htmlFor={`student-${student.id}`} className="text-sm">
                          {student.name} ({student.batch}-{student.batch + 4})
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-text-secondary">No unassigned students available</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Assign Students</Button>
                <Button type="button" variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default InstituteFaculty;