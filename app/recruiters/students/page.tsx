"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";
import { dummyStudents } from "@/lib/mock-data";

export function SearchStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("not-started");

  // TODO: Replace with API call - GET /api/recruiter/students/search
  const filteredStudents = dummyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === "all" || student.department === courseFilter;
    const matchesBatch = batchFilter === "all" || student.batch.toString() === batchFilter;
    const matchesStatus = statusFilter === "all" || student.placementStatus === statusFilter;
    
    return matchesSearch && matchesCourse && matchesBatch && matchesStatus;
  });

  const courses = [...new Set(dummyStudents.map(s => s.department))];
  const batches = [...new Set(dummyStudents.map(s => s.batch.toString()))];

  const columns = [
    {
      key: "name",
      title: "Student",
      render: (value: any, row: any) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "department",
      title: "Course & Institute",
      render: (value: any, row: any) => (
        <div>
          <p className="font-medium">{row.department}</p>
          <p className="text-sm text-muted-foreground">{row.university}</p>
        </div>
      ),
    },
    {
      key: "batchYear",
      title: "Batch",
    },
    {
      key: "cgpa",
      title: "CGPA",
      render: (value: any) => (
        <Badge variant="secondary">
          {value}
        </Badge>
      ),
    },
    {
      key: "placementStatus",
      title: "Status",
      render: (value: any) => (
        <Badge 
          variant={value === 'ongoing' || value === 'not-started' ? 'default' : 'secondary'}
        >
          {value === 'not-started' ? 'available' : value}
        </Badge>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm">
            Contact
          </Button>
        </div>
      ),
    },
  ];

  const handleExport = () => {
    // TODO: Implement export functionality - POST /api/recruiter/students/export
    console.log("Exporting student data...");
  };

  return (
    <DashboardLayout role="recruiter" currentPage="Search Students">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Student Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by name, course, or institute..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not-started">Available</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredStudents.length} students
              </p>
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={filteredStudents}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default SearchStudents;