import { DashboardLayout } from "@/components/shared/dashboard-layout";
import { DashboardCard } from "@/components/shared/dashboardCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Award, 
  Plus, 
  FileText, 
  BarChart3,
  Target,
  Star,
  Zap,
  Trophy,
  BookOpen,
  Users,
  ArrowUpRight,
  Clock,
  FolderOpen
} from "lucide-react";
import { dummyStudents, currentUser } from "@/lib/mock-data";

export default function StudentDashboard() {
  // TODO: Replace with API call -> GET /api/students/current
  const student = dummyStudents.find(s => s.email === currentUser.email);
  
  if (!student) return <div>Student not found</div>;

  const recentActivities = student.achievements.slice(0, 3);
  const topDomains = Object.entries(student.domains)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 9.0) return "from-emerald-500 to-teal-500";
    if (cgpa >= 8.0) return "from-blue-500 to-cyan-500";
    if (cgpa >= 7.0) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "from-emerald-500 to-teal-500";
    if (attendance >= 75) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <DashboardLayout currentPage="Student Dashboard" role="student">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-6 space-y-8">
        
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, {student.name.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-300 text-lg">
                  Ready to conquer your academic journey today?
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-slate-400">Current Semester</p>
                  <p className="text-2xl font-bold">Fall 2024</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </div>

        {/* Key Metrics - Enhanced Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative group">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradeColor(student.cgpa)} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getGradeColor(student.cgpa)} shadow-lg`}>
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +5.2%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-900">{student.cgpa.toFixed(2)}</h3>
                  <p className="text-slate-600 font-medium">CGPA</p>
                  <p className="text-sm text-slate-500">Current semester performance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getAttendanceColor(student.attendance)} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getAttendanceColor(student.attendance)} shadow-lg`}>
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.1%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-900">{student.attendance}%</h3>
                  <p className="text-slate-600 font-medium">Attendance</p>
                  <p className="text-sm text-slate-500">This semester average</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-5 group-hover:opacity-10 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.3%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-900">{student.hsi}</h3>
                  <p className="text-slate-600 font-medium">HSI Score</p>
                  <p className="text-sm text-slate-500">Holistic Student Index</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-5 group-hover:opacity-10 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-0">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-900">{student.achievements.length}</h3>
                  <p className="text-slate-600 font-medium">Achievements</p>
                  <p className="text-sm text-slate-500">Total earned</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Domain Scores - Enhanced */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">Domain Performance</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                    View All <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {topDomains.map(([domain, score], index) => {
                  const percentage = (score / 40) * 100;
                  const getScoreColor = (score: number) => {
                    if (score >= 32) return "from-emerald-500 to-teal-500";
                    if (score >= 24) return "from-blue-500 to-cyan-500";
                    if (score >= 16) return "from-amber-500 to-orange-500";
                    return "from-red-500 to-pink-500";
                  };
                  
                  return (
                    <div key={domain} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getScoreColor(score)}`} />
                          <span className="text-sm font-semibold text-slate-700 capitalize">
                            {domain.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-slate-900">{score}</span>
                          <span className="text-sm text-slate-500">/40</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            percentage >= 80 ? 'bg-emerald-100 text-emerald-700' :
                            percentage >= 60 ? 'bg-blue-100 text-blue-700' :
                            percentage >= 40 ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {percentage.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getScoreColor(score)} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                            style={{ 
                              width: `${percentage}%`,
                              animationDelay: `${index * 200}ms`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements - Enhanced */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">Recent Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No recent achievements</p>
                    <p className="text-slate-400 text-xs">Start adding your accomplishments!</p>
                  </div>
                ) : (
                  recentActivities.map((achievement, index) => (
                    <div 
                      key={achievement.id} 
                      className="flex items-start justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                            {achievement.title}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={achievement.status === 'approved' ? 'default' : 'secondary'}
                        className={`${
                          achievement.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-100 text-amber-700 border-amber-200'
                        } border shadow-sm`}
                      >
                        {achievement.status}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions - Completely Redesigned */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <CardHeader className="relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-900">Quick Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="group relative overflow-hidden p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform shadow-lg">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Add Achievement</h4>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700">Record a new activity or achievement to boost your profile</p>
                </div>
              </div>

              <div className="group relative overflow-hidden p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform shadow-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Update Portfolio</h4>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700">Enhance your digital portfolio with latest projects</p>
                </div>
              </div>

              <div className="group relative overflow-hidden p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50/30 cursor-pointer transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 group-hover:scale-110 transition-transform shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">View Reports</h4>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700">Download detailed progress and performance reports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Quick Stats Row */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-500 to-pink-500 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm font-medium">Study Streak</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-rose-100 text-xs">Days active</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Rank</p>
                  <p className="text-3xl font-bold">#15</p>
                  <p className="text-amber-100 text-xs">In your batch</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm font-medium">Projects</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-cyan-100 text-xs">Completed</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <FolderOpen className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium">Next Goal</p>
                  <p className="text-lg font-bold">9.0 CGPA</p>
                  <p className="text-violet-100 text-xs">This semester</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}