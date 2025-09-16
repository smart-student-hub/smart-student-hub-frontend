import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DashboardCard } from "@/components/shared/dashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Star, TrendingUp, Calendar, MapPin } from "lucide-react";
import { dummyStudents, dummyUniversities } from "@/lib/mock-data";

export function RecruiterDashboard() {
  // TODO: Replace with API call - GET /api/recruiter/dashboard
  const totalStudents = dummyStudents.length;
  const placedStudents = dummyStudents.filter(s => s.placementStatus === 'placed').length;
  const availableStudents = dummyStudents.filter(s => s.placementStatus === 'ongoing' || s.placementStatus === 'not-started').length;
  const topPerformers = dummyStudents
    .filter(s => s.placementStatus === 'ongoing' || s.placementStatus === 'not-started')
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 5);

  const recentInterviews = [
    // TODO: Replace with API call - GET /api/recruiter/recent-interviews
    { id: 1, student: "Alice Johnson", position: "Software Engineer", date: "2024-01-15", status: "pending" },
    { id: 2, student: "Bob Smith", position: "Data Analyst", date: "2024-01-14", status: "selected" },
    { id: 3, student: "Carol Brown", position: "Frontend Developer", date: "2024-01-13", status: "rejected" },
  ];

  return (
    <DashboardLayout role = "recruiter" currentPage="Recruiter Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Students"
            value={totalStudents.toString()}
            icon={Users}
            description="Across all universities"
          />
          <DashboardCard
            title="Available Students"
            value={availableStudents.toString()}
            icon={TrendingUp}
            description="Ready for placement"
          />
          <DashboardCard
            title="Placed Students"
            value={placedStudents.toString()}
            icon={Star}
            description="Successfully recruited"
          />
        <DashboardCard
            title="Universities"
            value={dummyUniversities.length.toString()}
            icon={GraduationCap}
            description="Partner institutions"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Top Available Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.department} • {student.batch}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="text-xs text-muted-foreground">{student.college}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">CGPA: {student.cgpa}</Badge>
                      <Button size="sm" className="ml-2">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{interview.student}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                      <p className="text-xs text-muted-foreground">{interview.date}</p>
                    </div>
                    <Badge 
                      variant={
                        interview.status === 'selected' ? 'default' : 
                        interview.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {interview.status}
                    </Badge>
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

export default RecruiterDashboard;