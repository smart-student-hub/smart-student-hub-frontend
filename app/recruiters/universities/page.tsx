"use client";
import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, MapPin, Phone, Mail } from "lucide-react";
import { dummyUniversities, dummyStudents } from "@/lib/mock-data";

export function RecruiterUniversities() {
  // TODO: Replace with API call - GET /api/recruiter/universities
  const universitiesWithStats = dummyUniversities.map(university => {
    const universityStudents = dummyStudents.filter(s => s.college === university.name);
    const availableStudents = universityStudents.filter(s => s.placementStatus === 'ongoing' || s.placementStatus === 'not-started').length;
    const placedStudents = universityStudents.filter(s => s.placementStatus === 'placed').length;
    const avgCGPA = universityStudents.length > 0 
      ? (universityStudents.reduce((sum, s) => sum + s.cgpa, 0) / universityStudents.length).toFixed(2)
      : "0.00";

    return {
      ...university,
      totalStudents: universityStudents.length,
      availableStudents,
      placedStudents,
      avgCGPA: parseFloat(avgCGPA)
    };
  });

  const columns = [
    {
      key: "name",
      title: "University",
      render: (value: any, row: any) => (
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {row.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "totalStudents",
      title: "Students",
      render: (value: any) => (
        <div className="text-center">
          <p className="font-medium">{value}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
      ),
    },
    {
      key: "availableStudents",
      title: "Available",
      render: (value: any) => (
        <div className="text-center">
          <Badge variant="default">{value}</Badge>
          <p className="text-xs text-muted-foreground mt-1">Ready</p>
        </div>
      ),
    },
    {
      key: "placedStudents",
      title: "Placed",
      render: (value: any) => (
        <div className="text-center">
          <Badge variant="secondary">{value}</Badge>
          <p className="text-xs text-muted-foreground mt-1">Recruited</p>
        </div>
      ),
    },
    {
      key: "avgCGPA",
      title: "Avg CGPA",
      render: (value: any) => (
        <Badge variant="outline">
          {value}
        </Badge>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            View Students
          </Button>
          <Button size="sm">
            Contact
          </Button>
        </div>
      ),
    },
  ];

  // Calculate summary stats
  const totalStudents = universitiesWithStats.reduce((sum, uni) => sum + uni.totalStudents, 0);
  const totalAvailable = universitiesWithStats.reduce((sum, uni) => sum + uni.availableStudents, 0);
  const totalPlaced = universitiesWithStats.reduce((sum, uni) => sum + uni.placedStudents, 0);
  const overallAvgCGPA = universitiesWithStats.length > 0
    ? (universitiesWithStats.reduce((sum, uni) => sum + (uni.avgCGPA * uni.totalStudents), 0) / totalStudents).toFixed(2)
    : "0.00";

  return (
    <DashboardLayout role="recruiter" currentPage="Partner Universities">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Universities</p>
                  <p className="text-2xl font-bold">{universitiesWithStats.length}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg CGPA</p>
                  <p className="text-2xl font-bold">{overallAvgCGPA}</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Universities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Universities</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={universitiesWithStats}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default RecruiterUniversities;