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
} from "lucide-react"

export type UserRole = "admin" | "hei" | "student" | "faculty" | "recruiter"

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
  hei: [
    { title: "Dashboard", href: "/institutes", icon: LayoutDashboard },
    { title: "Students", href: "/institutes/students", icon: Users },
    { title: "Faculty", href: "/institutes/faculty", icon: UserPlus },
    { title: "Analytics", href: "/institutes/analytics", icon: BarChart3 },
    { title: "Reports", href: "/institutes/reports", icon: FileText },
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
    { title: "Reports", href: "/faculty/reports", icon: FileText },
    { title: "Profile", href: "/faculty/profile", icon: User },
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
  hei: "HEI Staff",
  student: "Student",
  faculty: "Faculty",
  recruiter: "Recruiter",
}

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigation = roleNavigation[role] || []

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <GraduationCap className="h-8 w-8 text-sidebar-accent flex-shrink-0" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-sidebar-foreground">Smart Student Hub</h1>
              <p className="text-xs text-sidebar-foreground/70">{roleLabels[role]}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/10"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/10",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="text-sm">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-sidebar-accent/20 text-sidebar-accent text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="h-8 w-8 bg-sidebar-accent rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-sidebar-accent-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">john.doe@university.edu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
