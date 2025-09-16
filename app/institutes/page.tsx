import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, TrendingUp, Award } from "lucide-react";
import { Student, Faculty, dummyStudents, dummyFaculty } from "@/lib/mock-data";

export function InstituteDashboard() {
  // TODO: Replace with API call -> GET /api/institutes/dashboard
  const students = dummyStudents;
  const faculty = dummyFaculty;
  
  // Calculate metrics from actual data
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const avgCGPA = (students.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(2);
  const avgHSI = Math.round(students.reduce((sum, student) => sum + student.hsi, 0) / totalStudents);

  // Calculate batch analytics from actual data
  const batchGroups = students.reduce((acc, student) => {
    const currentYear = new Date().getFullYear();
    const batchStartYear = parseInt(student.batch);
    const batchEndYear = batchStartYear + 4;
    const batchKey = `${batchStartYear}-${batchEndYear}`;
    
    if (!acc[batchKey]) {
      acc[batchKey] = [];
    }
    acc[batchKey].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  const batchAnalytics = Object.entries(batchGroups).map(([batch, batchStudents]) => {
    const avgCGPA = Number((batchStudents.reduce((sum, s) => sum + s.cgpa, 0) / batchStudents.length).toFixed(1));
    const avgHSI = Math.round(batchStudents.reduce((sum, s) => sum + s.hsi, 0) / batchStudents.length);
    const placedStudents = batchStudents.filter(s => s.placementStatus === 'placed').length;
    const placement = Math.round((placedStudents / batchStudents.length) * 100);
    
    // Current batch (2024) should show 0 placement as they're still studying
    const currentYear = new Date().getFullYear();
    const batchYear = parseInt(batch.split('-')[0]);
    const isCurrentBatch = batchYear >= currentYear;
    
    return {
      batch,
      students: batchStudents.length,
      avgCGPA,
      avgHSI,
      placement: isCurrentBatch ? 0 : placement
    };
  }).sort((a, b) => a.batch.localeCompare(b.batch));

  return (
    <DashboardLayout role="hei" currentPage="Institute Dashboard">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Total Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{totalStudents}</div>
              <p className="text-xs text-success">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Faculty Members</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{totalFaculty}</div>
              <p className="text-xs text-text-secondary">Active faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Average CGPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{avgCGPA}</div>
              <p className="text-xs text-success">+0.2 from last semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Average HSI</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{avgHSI}</div>
              <p className="text-xs text-success">+3 from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Batch Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">Batch Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-3 text-text-secondary font-medium">Batch</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Students</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Avg CGPA</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Avg HSI</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Placement %</th>
                  </tr>
                </thead>
                <tbody>
                  {batchAnalytics.map((batch) => (
                    <tr key={batch.batch} className="border-b border-card-border">
                      <td className="p-3 text-text-primary font-medium">{batch.batch}</td>
                      <td className="p-3 text-text-primary">{batch.students}</td>
                      <td className="p-3">
                        <Badge variant={batch.avgCGPA >= 8.0 ? "default" : "secondary"}>
                          {batch.avgCGPA}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={batch.avgHSI >= 70 ? "default" : "secondary"}>
                          {batch.avgHSI}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {batch.placement > 0 ? (
                          <Badge variant={batch.placement >= 80 ? "default" : "secondary"}>
                            {batch.placement}%
                          </Badge>
                        ) : (
                          <span className="text-text-secondary">In Progress</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">New student registration</span>
                  <Badge variant="outline">2 hours ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Faculty assignment updated</span>
                  <Badge variant="outline">1 day ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Batch performance report</span>
                  <Badge variant="outline">3 days ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Faculty approvals pending</span>
                  <Badge variant="destructive">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Student verifications</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Report reviews</span>
                  <Badge variant="destructive">2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
export default InstituteDashboard;