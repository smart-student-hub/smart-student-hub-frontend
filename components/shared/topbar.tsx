"use client"

import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface TopbarProps {
  currentPage: string
  showSearch?: boolean
  className?: string
}

export function Topbar({ currentPage, showSearch = true, className }: TopbarProps) {
  return (
    <header className={`bg-background border-b border-border px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left: Current Page */}
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-medium text-muted-foreground">{currentPage}</h1>
        </div>

        {/* Center: Title */}
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold text-foreground">SAMAGRA</h2>
        </div>

        {/* Right: Search and Actions */}
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-muted/50 border-border focus:bg-background" />
            </div>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="hidden sm:inline text-sm">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
