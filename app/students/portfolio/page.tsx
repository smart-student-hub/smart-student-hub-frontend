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

  const generateResumeHTML = () => {
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentStudent.name} - Resume</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            background: white;
            margin: 0;
            padding: 0;
            font-size: 14px;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 15px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
        }
        
        .name {
            font-size: 32px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 8px;
        }
        
        .title {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 15px;
        }
        
        .contact-info {
            font-size: 14px;
            color: #4b5563;
        }
        
        .contact-row {
            margin-bottom: 5px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .content-grid {
            display: table;
            width: 100%;
        }
        
        .left-column {
            display: table-cell;
            width: 65%;
            vertical-align: top;
            padding-right: 30px;
        }
        
        .right-column {
            display: table-cell;
            width: 35%;
            vertical-align: top;
        }
        
        .about-text {
            text-align: justify;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .education-item {
            margin-bottom: 20px;
        }
        
        .education-degree {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        .education-school {
            color: #6b7280;
            font-size: 15px;
            margin-bottom: 3px;
        }
        
        .education-details {
            font-size: 13px;
            color: #9ca3af;
        }
        
        .project-item {
            margin-bottom: 25px;
            padding-left: 15px;
            border-left: 3px solid #ddd6fe;
        }
        
        .project-title {
            font-weight: bold;
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 8px;
        }
        
        .project-status {
            background: #dcfce7;
            color: #166534;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            margin-left: 10px;
        }
        
        .project-description {
            color: #6b7280;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        
        .project-tech {
            margin-bottom: 8px;
        }
        
        .tech-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            border: 1px solid #d1d5db;
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 3px;
        }
        
        .project-dates {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .achievement-item {
            margin-bottom: 20px;
            display: table;
            width: 100%;
        }
        
        .achievement-icon {
            display: table-cell;
            width: 25px;
            vertical-align: top;
            padding-top: 2px;
        }
        
        .achievement-content {
            display: table-cell;
            vertical-align: top;
            padding-left: 10px;
        }
        
        .achievement-title {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .achievement-description {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 8px;
            line-height: 1.4;
        }
        
        .achievement-meta {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .achievement-category {
            background: #f9fafb;
            padding: 2px 6px;
            border-radius: 3px;
            border: 1px solid #e5e7eb;
            margin-right: 8px;
        }
        
        .skills-list {
            line-height: 1.8;
        }
        
        .skill-item {
            background: #f8fafc;
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            font-size: 13px;
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 8px;
        }
        
        .domain-item {
            margin-bottom: 12px;
            padding: 8px 12px;
            background: #f9fafb;
            border-radius: 5px;
            border: 1px solid #e5e7eb;
            display: table;
            width: 100%;
        }
        
        .domain-name {
            display: table-cell;
            font-weight: 500;
            text-transform: capitalize;
        }
        
        .domain-score {
            display: table-cell;
            text-align: right;
            font-weight: bold;
            color: #2563eb;
        }
        
        .hsi-score {
            text-align: center;
            padding: 20px;
            background: #f0f9ff;
            border-radius: 8px;
            border: 2px solid #0ea5e9;
            margin-bottom: 25px;
        }
        
        .hsi-number {
            font-size: 36px;
            font-weight: bold;
            color: #0284c7;
            margin-bottom: 5px;
        }
        
        .hsi-label {
            color: #0369a1;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Header -->
        <div class="header">
            <div class="name">${currentStudent.name}</div>
            <div class="title">Computer Science Student</div>
            <div class="contact-info">
                <div class="contact-row">📧 ${currentStudent.email} | 📱 ${personalInfo.phone}</div>
                <div class="contact-row">📍 ${personalInfo.location} | 🌐 ${personalInfo.website}</div>
            </div>
        </div>

        <!-- About -->
        <div class="section">
            <div class="section-title">About</div>
            <div class="about-text">
                Passionate computer science student with a strong foundation in machine learning and web development. 
                Experienced in building full-stack applications and contributing to open-source projects. Seeking 
                opportunities to apply technical skills in innovative software development roles.
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="content-grid">
            <div class="left-column">
                <!-- Education -->
                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="education-item">
                        <div class="education-degree">${education.degree}</div>
                        <div class="education-school">${education.institution}</div>
                        <div class="education-details">Class of ${education.graduationYear} • CGPA: ${education.gpa}/10.0</div>
                    </div>
                </div>

                <!-- Projects -->
                <div class="section">
                    <div class="section-title">Projects</div>
                    ${currentStudent.projects.map(project => `
                        <div class="project-item">
                            <div class="project-title">
                                ${project.title}
                                <span class="project-status">${project.status}</span>
                            </div>
                            <div class="project-description">${project.description}</div>
                            <div class="project-tech">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            <div class="project-dates">
                                ${new Date(project.startDate).toLocaleDateString()} - 
                                ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Achievements -->
                <div class="section">
                    <div class="section-title">Achievements</div>
                    ${currentStudent.achievements.map(achievement => `
                        <div class="achievement-item">
                            <div class="achievement-icon">🏆</div>
                            <div class="achievement-content">
                                <div class="achievement-title">${achievement.title}</div>
                                <div class="achievement-description">${achievement.description}</div>
                                <div class="achievement-meta">
                                    <span class="achievement-category">${achievement.category.replace('_', ' ')}</span>
                                    ${new Date(achievement.date).toLocaleDateString()} • ${achievement.points} points
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="right-column">
                <!-- HSI Score -->
                <div class="hsi-score">
                    <div class="hsi-number">${currentStudent.hsi}</div>
                    <div class="hsi-label">Holistic Skill Index</div>
                </div>

                <!-- Technical Skills -->
                <div class="section">
                    <div class="section-title">Technical Skills</div>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>

                <!-- Domain Expertise -->
                <div class="section">
                    <div class="section-title">Domain Expertise</div>
                    ${Object.entries(currentStudent.domains)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 6)
                      .map(([domain, score]) => `
                        <div class="domain-item">
                            <div class="domain-name">${domain.replace('_', ' ')}</div>
                            <div class="domain-score">${score}</div>
                        </div>
                      `).join('')}
                </div>
            </div>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 40px;">
        <button onclick="downloadPDF()" style="background: #2563eb; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 600;">
            📄 Download PDF
        </button>
    </div>

    <script>
        function downloadPDF() {
            const element = document.querySelector('.resume-container');
            const opt = {
                margin: [0.1, 0.3, 0.3, 0.3], // Minimal top margin
                filename: '${currentStudent.name.replace(/\s+/g, '_')}_Resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    y: 0,
                    scrollY: 0
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'letter', 
                    orientation: 'portrait' 
                }
            };

            html2pdf().set(opt).from(element).save();
        }
    </script>
</body>
</html>`;
    return resumeHTML;
  };

  const handleDownloadPDF = () => {
    const resumeHTML = generateResumeHTML();
    
    // Create a new window with the resume and PDF generation capability
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(resumeHTML);
      newWindow.document.close();
    }
  };

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