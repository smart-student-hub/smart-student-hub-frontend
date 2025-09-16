"use client"

import type React from "react"
import cookies from "js-cookie"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {  // <-- added async
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username, // Django uses 'username'
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        const username=data.username; // Assuming the response contains the username
        const role=formData.role; // Use the selected role from the form
        cookies.set("username",username,{expires:1})
        cookies.set("role", role, { expires: 1 }) // Expires in 1 day
        alert(`Welcome ${data.username}`)
        if (formData.role === "faculty") {
          window.location.href = "/faculty/dashboard"
        }
        if (formData.role === "student") {
          window.location.href = "/students/dashboard"
        }
      } else {
        alert("Login failed: invalid credentials or role")
      }
    } catch (err) {
      console.error("Error logging in:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Smart Student Hub</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="hei">HEI Staff</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="Username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="bg-muted/50 border-border focus:bg-background"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-muted/50 border-border focus:bg-background pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!formData.username || !formData.password || !formData.role}
              >
                Sign In
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-accent hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 border-border/30">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-medium">Student:</p>
                <p className="text-muted-foreground">student@demo.com</p>
              </div>
              <div>
                <p className="font-medium">Faculty:</p>
                <p className="text-muted-foreground">faculty@demo.com</p>
              </div>
              <div>
                <p className="font-medium">Admin:</p>
                <p className="text-muted-foreground">admin@demo.com</p>
              </div>
              <div>
                <p className="font-medium">Password:</p>
                <p className="text-muted-foreground">demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
