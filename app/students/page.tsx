import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DashboardCard } from "@/components/shared/dashboardCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Calendar, Award } from "lucide-react";
import { dummyStudents, currentUser } from "@/lib/mock-data";

export default function StudentDashboard() {
  // TODO: Replace with API call -> GET /api/students/current
  const student = dummyStudents.find(s => s.email === currentUser.email);
  
  if (!student) return <div>Student not found</div>;

  const recentActivities = student.achievements.slice(0, 3);
  const topDomains = Object.entries(student.domains)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <DashboardLayout currentPage="Dashboard" role={"student"} children={undefined}>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="CGPA"
            value={student.cgpa.toFixed(2)}
            icon={GraduationCap}
            description="Current semester"
            trend={{ value: 5.2, isPositive: true }}
          />
          <DashboardCard
            title="Attendance"
            value={`${student.attendance}%`}
            icon={Calendar}
            description="This semester"
            trend={{ value: 2.1, isPositive: true }}
          />
          <DashboardCard
            title="HSI Score"
            value={student.hsi}
            icon={TrendingUp}
            description="Holistic Student Index"
            trend={{ value: 8.3, isPositive: true }}
          />
          <DashboardCard
            title="Achievements"
            value={student.achievements.length}
            icon={Award}
            description="Total achievements"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Domain Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Top Domain Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topDomains.map(([domain, score]) => (
                <div key={domain} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize text-text-primary">
                      {domain.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm text-text-secondary">{score}/40</span>
                  </div>
                  <Progress value={(score / 40) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.length === 0 ? (
                <p className="text-text-muted text-sm">No recent achievements</p>
              ) : (
                recentActivities.map((achievement) => (
                  <div key={achievement.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text-primary">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={achievement.status === 'approved' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {achievement.status}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-card-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-medium text-text-primary">Add Achievement</h4>
                <p className="text-sm text-text-muted mt-1">Record a new activity or achievement</p>
              </div>
              <div className="p-4 border border-card-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-medium text-text-primary">Update Portfolio</h4>
                <p className="text-sm text-text-muted mt-1">Enhance your digital portfolio</p>
              </div>
              <div className="p-4 border border-card-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-medium text-text-primary">View Reports</h4>
                <p className="text-sm text-text-muted mt-1">Download progress reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}