"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { dummyStudents } from "@/lib/mock-data"
import { Download, Edit, GraduationCap, MapPin, Mail, Phone, Award, Code, Calendar, ExternalLink } from "lucide-react"

export default function StudentPortfolio() {
  // TODO: Replace with API call -> GET /api/students/current/portfolio
  const currentStudent = dummyStudents[0]

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    console.log("Downloading portfolio as PDF")
  }

  const personalInfo = {
    phone: "+1 (555) 123-4567",
    location: "Cambridge, MA",
    website: "https://alice-johnson.dev",
    linkedin: "https://linkedin.com/in/alice-johnson",
    github: "https://github.com/alice-johnson",
  }

  const education = {
    degree: "Bachelor of Science in Computer Science",
    institution: currentStudent.college,
    graduationYear: "2024",
    gpa: currentStudent.cgpa,
  }

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "TensorFlow",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Git",
    "Agile",
  ]

  const hobbies = ["Open Source Contributing", "Photography", "Chess", "Hiking", "Reading Tech Blogs"]

  return (
    <DashboardLayout role="student" currentPage="Portfolio">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Portfolio</h1>
            <p className="text-muted-foreground">Your comprehensive academic and professional profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Portfolio
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-foreground">
                    {currentStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentStudent.name}</CardTitle>
                  <CardDescription className="text-lg">Computer Science Student</CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {currentStudent.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {personalInfo.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-accent">{currentStudent.hsi}</div>
                <div className="text-sm text-muted-foreground">HSI Score</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-muted-foreground">
                  Passionate computer science student with a strong foundation in machine learning and web development.
                  Experienced in building full-stack applications and contributing to open-source projects. Seeking
                  opportunities to apply technical skills in innovative software development roles.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Website
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">{education.degree}</h3>
                    <p className="text-muted-foreground">{education.institution}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>Class of {education.graduationYear}</span>
                      <span>•</span>
                      <span>CGPA: {education.gpa}/10.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStudent.projects.map((project) => (
                    <div key={project.id} className="border-l-2 border-accent pl-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge
                          className={
                            project.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()} -
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentStudent.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className="p-1 bg-accent/10 rounded-full mt-1">
                        <Award className="h-3 w-3 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {achievement.category.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs font-medium text-accent">{achievement.points} points</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Domain Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Domain Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(currentStudent.domains)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([domain, score]) => (
                      <div key={domain} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{domain.replace("_", " ")}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${(score / 30) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{score}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Hobbies & Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Hobbies & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hobbies.map((hobby, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {hobby}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
