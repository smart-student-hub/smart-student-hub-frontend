"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BookOpen,
  Award,
  FolderOpen,
  User,
  Building2,
  BarChart3,
  UserPlus,
  Search,
  CheckCircle,
  Calendar,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export type UserRole = "admin" | "university" | "student" | "faculty" | "recruiter"

interface SidebarProps {
  role: UserRole
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const roleNavigation: Record<UserRole, NavItem[]> = {
  admin: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Universities", href: "/admin/universities", icon: Building2 },
    { title: "Reports", href: "/admin/reports", icon: FileText },
    { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ],
  university: [
    { title: "Dashboard", href: "/institutes", icon: LayoutDashboard },
    { title: "Students", href: "/institutes/students", icon: Users },
    { title: "Faculty", href: "/institutes/faculty", icon: UserPlus },
    { title: "Assignment", href: "/institutes/assignment", icon: FileText },
    { title: "Analytics", href: "/institutes/analytics", icon: BarChart3 },
    { title: "Settings", href: "/institutes/settings", icon: Settings },
  ],
  student: [
    { title: "Dashboard", href: "/students", icon: LayoutDashboard },
    { title: "Scores", href: "/students/scores", icon: BarChart3 },
    { title: "Activities", href: "/students/activities", icon: Award },
    { title: "Projects", href: "/students/projects", icon: FolderOpen },
    { title: "Portfolio", href: "/students/portfolio", icon: FileText },
    { title: "Profile", href: "/students/profile", icon: User },
  ],
  faculty: [
    { title: "Dashboard", href: "/faculty", icon: LayoutDashboard },
    { title: "My Students", href: "/faculty/students", icon: Users },
    { title: "Approve Achievements", href: "/faculty/achievements", icon: CheckCircle },
    { title: "Attendance", href: "/faculty/attendance", icon: Calendar },
  ],
  recruiter: [
    { title: "Dashboard", href: "/recruiters", icon: LayoutDashboard },
    { title: "Search Students", href: "/recruiters/search", icon: Search },
    { title: "Saved Profiles", href: "/recruiters/saved", icon: BookOpen },
    { title: "Analytics", href: "/recruiters/analytics", icon: BarChart3 },
    { title: "Settings", href: "/recruiters/settings", icon: Settings },
  ],
}

const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  university: "University Staff",
  student: "Student",
  faculty: "Faculty",
  recruiter: "Recruiter",
}

const roleColors: Record<UserRole, string> = {
  admin: "from-purple-600 to-indigo-600",
  university: "from-blue-600 to-cyan-600",
  student: "from-emerald-600 to-teal-600",
  faculty: "from-amber-600 to-orange-600",
  recruiter: "from-rose-600 to-pink-600",
}

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigation = roleNavigation[role] || []

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 ease-in-out backdrop-blur-xl",
        isCollapsed ? "w-20" : "w-72",
        className,
      )}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-transparent to-slate-900/90 pointer-events-none" />
      
      {/* Glass Effect Border */}
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-slate-400/20 to-transparent" />

      {/* Header */}
      <div className="relative flex items-center justify-between p-6 border-b border-slate-700/30">
        <div className={cn("flex items-center gap-4", isCollapsed && "justify-center")}>
          <div className={cn(
            "relative p-2.5 rounded-xl bg-gradient-to-br shadow-lg",
            roleColors[role]
          )}>
            <GraduationCap className="h-7 w-7 text-white drop-shadow-sm" />
            <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-tight">Smart Student Hub</h1>
              <p className="text-sm text-slate-300 font-medium">{roleLabels[role]}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="relative text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative w-full justify-start gap-4 h-12 text-left font-medium transition-all duration-200 group",
                    isCollapsed && "justify-center px-0",
                    isActive 
                      ? "bg-gradient-to-r from-slate-700/50 to-slate-600/30 text-white border-l-4 border-emerald-400 shadow-lg" 
                      : "text-slate-300 hover:text-white hover:bg-slate-700/30 border-l-4 border-transparent hover:border-slate-500/50"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg" 
                      : "group-hover:bg-slate-600/50"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="text-sm truncate">{item.title}</span>
                      {item.badge && (
                        <span className="ml-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Active indicator */}
                  {isActive && !isCollapsed && (
                    <div className="absolute right-2 w-2 h-2 bg-emerald-400 rounded-full shadow-sm animate-pulse" />
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Logout Section */}
      <div className="relative p-4 border-t border-slate-700/30 bg-slate-800/30">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-4 h-12 text-slate-300 hover:text-white hover:bg-red-500/10 border border-slate-600/30 hover:border-red-500/50 transition-all duration-200 group",
            isCollapsed && "justify-center px-0"
          )}
          onClick={() => {
            // TODO: Implement logout functionality
            console.log("Logout clicked")
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg group-hover:bg-red-500/20 transition-all duration-200">
            <LogOut className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}