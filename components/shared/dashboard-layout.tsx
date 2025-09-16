"use client"

import type React from "react"

import { Sidebar, type UserRole } from "./sidebar"
import { Topbar } from "./topbar"

interface DashboardLayoutProps {
  role: UserRole
  currentPage: string
  children: React.ReactNode
  showSearch?: boolean
}

export function DashboardLayout({ role, currentPage, children, showSearch = true }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar currentPage={currentPage} showSearch={showSearch} />

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-muted/20">{children}</main>
      </div>
    </div>
  )
}
