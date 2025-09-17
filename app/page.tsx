import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Building2, UserCheck, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const portals = [
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'University administration',
      icon: Building2,
      color: 'from-purple-100 to-indigo-100 border-purple-300',
      iconColor: 'text-purple-600',
      buttonColor: 'from-purple-500 to-indigo-600',
      href: '/admin'
    },
    {
      id: 'hei',
      title: 'HEI Dashboard',
      description: 'Institution management',
      icon: Users,
      color: 'from-blue-100 to-cyan-100 border-blue-300',
      iconColor: 'text-blue-600',
      buttonColor: 'from-blue-500 to-cyan-600',
      href: '/institutes'
    },
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Personal dashboard',
      icon: GraduationCap,
      color: 'from-emerald-100 to-teal-100 border-emerald-300',
      iconColor: 'text-emerald-600',
      buttonColor: 'from-emerald-500 to-teal-600',
      href: '/students'
    },
    {
      id: 'faculty',
      title: 'Faculty Portal',
      description: 'Student management',
      icon: BookOpen,
      color: 'from-orange-100 to-amber-100 border-orange-300',
      iconColor: 'text-orange-600',
      buttonColor: 'from-orange-500 to-amber-600',
      href: '/faculty'
    },
    {
      id: 'recruiter',
      title: 'Recruiter Portal',
      description: 'Student recruitment',
      icon: UserCheck,
      color: 'from-pink-100 to-rose-100 border-pink-300',
      iconColor: 'text-pink-600',
      buttonColor: 'from-pink-500 to-rose-600',
      href: '/recruiters'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Authentication */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center lg:pr-8 mb-8 lg:mb-0">
          <div className="space-y-6">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl backdrop-blur-sm border border-blue-300">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                Smart Student Hub
              </h1>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                A comprehensive platform connecting universities, faculty, students, and recruiters
              </p>
            </div>

            {/* Authentication Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl w-fit border border-indigo-200">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Get Started</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Login or register to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="/auth/login">
                  <Button className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105">
                    Login
                  </Button>
                </a>
                <a href="/auth/register">
                  <Button 
                    variant="outline" 
                    className="w-full h-10 bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-300"
                  >
                    Register
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Quick Access */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center lg:pl-8 lg:border-l border-gray-300">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                Quick Access
              </h2>
              <p className="text-gray-600 text-sm">Demo Prototype - Direct Portal Access</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {portals.map((portal, index) => {
                const Icon = portal.icon;
                return (
                  <Card 
                    key={portal.id}
                    className={`group cursor-pointer transition-all duration-300 hover:scale-102 bg-gradient-to-r ${portal.color} backdrop-blur-sm border transform hover:shadow-lg`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 bg-white/60 rounded-lg border border-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`h-6 w-6 ${portal.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                              {portal.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-700 transition-colors truncate">
                              {portal.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <a href={portal.href}>
                            <Button className={`bg-gradient-to-r ${portal.buttonColor} hover:opacity-90 text-white text-sm px-4 py-2 transition-all duration-300`}>
                              Access
                            </Button>
                          </a>
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs">
                Select a portal above to explore demo functionality
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}