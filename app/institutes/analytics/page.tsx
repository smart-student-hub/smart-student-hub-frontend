import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, Award, Download, BarChart3 } from "lucide-react";
import { dummyStudents, Student } from "@/lib/mock-data";

export function InstituteAnalytics() {
  // TODO: Replace with API call -> GET /api/institutes/analytics
  const students = dummyStudents;

  // Calculate analytics from actual data
  const analyticsData = {
    totalStudents: students.length,
    avgCGPA: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2),
    avgHSI: Math.round(students.reduce((sum, s) => sum + s.hsi, 0) / students.length),
    placementRate: Math.round((students.filter(s => s.placementStatus === 'placed').length / students.length) * 100),
    topPerformers: students.filter(s => s.cgpa >= 8.5 && s.hsi >= 75).length,
  };

  // Calculate department-wise data from actual data
  const departmentGroups = students.reduce((acc, student) => {
    if (!acc[student.department]) {
      acc[student.department] = [];
    }
    acc[student.department].push(student);
    return acc;
  }, {} as Record<string, typeof students>);

  const departmentWiseData = Object.entries(departmentGroups).map(([department, deptStudents]) => {
    const avgCGPA = Number((deptStudents.reduce((sum, s) => sum + s.cgpa, 0) / deptStudents.length).toFixed(1));
    const avgHSI = Math.round(deptStudents.reduce((sum, s) => sum + s.hsi, 0) / deptStudents.length);
    const placements = deptStudents.filter(s => s.placementStatus === 'placed').length;
    
    return {
      department,
      students: deptStudents.length,
      avgCGPA,
      avgHSI,
      placements
    };
  });

  // Calculate performance metrics from actual data
  const academicExcellence = students.filter(s => s.cgpa >= 8.5).length;
  const highHSI = students.filter(s => s.hsi >= 75).length;
  const researchPublications = students.filter(s => s.achievements.some(a => a.category === 'research')).length;
  const internshipCompletion = students.filter(s => s.achievements.some(a => a.category === 'internship')).length;

  const performanceMetrics = [
    { 
      metric: "Academic Excellence (CGPA ≥ 8.5)", 
      count: academicExcellence, 
      percentage: Math.round((academicExcellence / students.length) * 100) 
    },
    { 
      metric: "High HSI Score (≥ 75)", 
      count: highHSI, 
      percentage: Math.round((highHSI / students.length) * 100) 
    },
    { 
      metric: "Research Publications", 
      count: researchPublications, 
      percentage: Math.round((researchPublications / students.length) * 100) 
    },
    { 
      metric: "Internship Completion", 
      count: internshipCompletion, 
      percentage: Math.round((internshipCompletion / students.length) * 100) 
    },
  ];

  // Mock monthly trends (would typically come from time-series data)
  const monthlyTrends = [
    { month: "Jan", newStudents: 5, placements: 8, avgHSI: 68 },
    { month: "Feb", newStudents: 3, placements: 12, avgHSI: 70 },
    { month: "Mar", newStudents: 7, placements: 15, avgHSI: 72 },
    { month: "Apr", newStudents: 4, placements: 18, avgHSI: 74 },
    { month: "May", newStudents: 6, placements: 22, avgHSI: 76 },
    { month: "Jun", newStudents: 8, placements: 25, avgHSI: 78 },
  ];

  return (
    <DashboardLayout role="hei" currentPage="Institute Analytics">
      <div className="space-y-6">
        {/* Header with Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Analytics Dashboard</h2>
            <p className="text-text-secondary">Comprehensive performance analytics and insights</p>
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="current-sem">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-sem">Current Semester</SelectItem>
                <SelectItem value="last-sem">Last Semester</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Total Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{analyticsData.totalStudents}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2% vs last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Average CGPA</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{analyticsData.avgCGPA}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.15 vs last semester
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Average HSI</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{analyticsData.avgHSI}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3.2% improvement
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Placement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{analyticsData.placementRate}%</div>
              <div className="flex items-center text-xs text-error">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2.1% vs last year
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Top Performers</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{analyticsData.topPerformers}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% growth
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-text-primary">Department-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left p-3 text-text-secondary font-medium">Department</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Students</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Avg CGPA</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Avg HSI</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Placements</th>
                    <th className="text-left p-3 text-text-secondary font-medium">Placement %</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentWiseData.map((dept) => (
                    <tr key={dept.department} className="border-b border-card-border">
                      <td className="p-3 text-text-primary font-medium">{dept.department}</td>
                      <td className="p-3 text-text-primary">{dept.students}</td>
                      <td className="p-3">
                        <Badge variant={dept.avgCGPA >= 8.0 ? "default" : "secondary"}>
                          {dept.avgCGPA}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={dept.avgHSI >= 70 ? "default" : "secondary"}>
                          {dept.avgHSI}
                        </Badge>
                      </td>
                      <td className="p-3 text-text-primary">{dept.placements}</td>
                      <td className="p-3">
                        <Badge variant={Math.round((dept.placements / dept.students) * 100) >= 80 ? "default" : "secondary"}>
                          {Math.round((dept.placements / dept.students) * 100)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-primary">{metric.metric}</p>
                      <p className="text-xs text-text-secondary">{metric.count} students</p>
                    </div>
                    <Badge variant={metric.percentage >= 50 ? "default" : "secondary"}>
                      {metric.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyTrends.map((trend) => (
                  <div key={trend.month} className="flex items-center justify-between p-2 rounded bg-card-background">
                    <span className="text-sm font-medium text-text-primary">{trend.month}</span>
                    <div className="flex gap-3 text-xs">
                      <span className="text-text-secondary">
                        New: <span className="text-primary font-medium">{trend.newStudents}</span>
                      </span>
                      <span className="text-text-secondary">
                        Placed: <span className="text-success font-medium">{trend.placements}</span>
                      </span>
                      <span className="text-text-secondary">
                        HSI: <span className="text-secondary font-medium">{trend.avgHSI}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InstituteAnalytics;