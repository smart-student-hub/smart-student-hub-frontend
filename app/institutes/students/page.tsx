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
import { Plus, Search, Filter } from "lucide-react";
import { Student, Faculty } from "@/lib/mock-data";

export function InstituteStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // TODO: Replace with API call -> GET /api/institutes/students
  const students = Student;
  const faculty = Faculty;

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const batchString = `${student.batchYear}-${student.batchYear + 4}`;
    const matchesBatch = filterBatch === "all" || batchString === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "batchYear", title: "Batch", render: (value: any) => `${value}-${value + 4}` },
    { 
      key: "cgpa", 
      title: "CGPA",
      render: (value: any) => <Badge variant={value >= 8.0 ? "default" : "secondary"}>{value}</Badge>
    },
    { 
      key: "hsi", 
      title: "HSI",
      render: (value: any) => <Badge variant={value >= 70 ? "default" : "secondary"}>{value}</Badge>
    },
    { 
      key: "department", 
      title: "Department"
    },
  ];

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call -> POST /api/institutes/students
    console.log("Adding student...");
    setIsAddDialogOpen(false);
  };

  const batches = [...new Set(students.map(s => `${s.batchYear}-${s.batchYear + 4}`))];

  return (
    <DashboardLayout currentPageName="Manage Students">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Students Management</h2>
            <p className="text-text-secondary">Manage student registrations and assignments</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter student name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@email.com" required />
                </div>
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" placeholder="2024001" required />
                </div>
                <div>
                  <Label htmlFor="batch">Batch</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2021-25">2021-25</SelectItem>
                      <SelectItem value="2022-26">2022-26</SelectItem>
                      <SelectItem value="2023-27">2023-27</SelectItem>
                      <SelectItem value="2024-28">2024-28</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="facultyAdvisor">Faculty Advisor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign faculty advisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculty.map(f => (
                        <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Add Student</Button>
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
            <CardTitle className="text-text-primary">Filter Students</CardTitle>
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
                <Label htmlFor="batch-filter">Filter by Batch</Label>
                <Select value={filterBatch} onValueChange={setFilterBatch}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {batches.map(batch => (
                      <SelectItem key={batch} value={batch}>{batch}</SelectItem>
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
              Students List ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={filteredStudents} 
              columns={columns}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}