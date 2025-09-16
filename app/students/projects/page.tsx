"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dummyStudents } from "@/lib/mock-data"
import { Plus, FolderOpen, Calendar, Code, ExternalLink, Edit, Trash2, X } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  status: "ongoing" | "completed" | "planned"
  startDate: string
  endDate?: string
  projectLink?: string
}

export default function StudentProjects() {
  // TODO: Replace with API call -> GET /api/students/current/projects
  const currentStudent = dummyStudents[0]
  const [projects, setProjects] = useState<Project[]>([
    ...currentStudent.projects,
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "ongoing",
      startDate: "2024-03-01",
      projectLink: "https://github.com/example/ecommerce"
    },
    {
      id: 3,
      title: "Mobile Weather App",
      description: "Cross-platform weather application with location services",
      technologies: ["React Native", "TypeScript", "Weather API"],
      status: "planned",
      startDate: "2024-04-15",
      projectLink: "https://github.com/example/weather-app"
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    status: "planned" as const,
    startDate: "",
    endDate: "",
    projectLink: "",
  })
  const [currentTech, setCurrentTech] = useState("")
  const [editCurrentTech, setEditCurrentTech] = useState("")

  const resetNewProject = () => {
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      status: "planned",
      startDate: "",
      endDate: "",
      projectLink: "",
    })
    setCurrentTech("")
  }

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return
    
    // TODO: Replace with API call -> POST /api/projects
    const project: Project = {
      id: Date.now(), // Generate unique ID
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies,
      status: newProject.status,
      startDate: newProject.startDate,
      endDate: newProject.status === "completed" ? newProject.endDate : undefined,
      projectLink: newProject.projectLink || undefined,
    }
    
    setProjects(prev => [...prev, project])
    setIsAddDialogOpen(false)
    resetNewProject()
  }

  const handleEditProject = () => {
    if (!editingProject) return
    
    // TODO: Replace with API call -> PUT /api/projects/:id
    setProjects(prev => prev.map(p => 
      p.id === editingProject.id 
        ? {
            ...editingProject,
            endDate: editingProject.status === "completed" ? editingProject.endDate : undefined
          }
        : p
    ))
    setIsEditDialogOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      // TODO: Replace with API call -> DELETE /api/projects/:id
      setProjects(prev => prev.filter(p => p.id !== id))
    }
  }

  const openEditDialog = (project: Project) => {
    setEditingProject({ ...project })
    setEditCurrentTech("")
    setIsEditDialogOpen(true)
  }

  const addTechnology = (isEdit: boolean = false) => {
    const tech = isEdit ? editCurrentTech : currentTech
    
    if (isEdit && editingProject) {
      if (tech.trim() && !editingProject.technologies.includes(tech.trim())) {
        setEditingProject({
          ...editingProject,
          technologies: [...editingProject.technologies, tech.trim()]
        })
        setEditCurrentTech("")
      }
    } else {
      if (tech.trim() && !newProject.technologies.includes(tech.trim())) {
        setNewProject({
          ...newProject,
          technologies: [...newProject.technologies, tech.trim()]
        })
        setCurrentTech("")
      }
    }
  }

  const removeTechnology = (tech: string, isEdit: boolean = false) => {
    if (isEdit && editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter(t => t !== tech)
      })
    } else {
      setNewProject({
        ...newProject,
        technologies: newProject.technologies.filter(t => t !== tech)
      })
    }
  }

  const handleTechKeyPress = (e: React.KeyboardEvent, isEdit: boolean = false) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnology(isEdit)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "ongoing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "planned":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <DashboardLayout role="student" currentPage="Projects">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
            <p className="text-muted-foreground">Manage and showcase your development projects</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to track your development work.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLink">Project Link (GitHub/Demo)</Label>
                  <Input
                    id="projectLink"
                    placeholder="https://github.com/username/project"
                    value={newProject.projectLink}
                    onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type technology and press Enter"
                        value={currentTech}
                        onChange={(e) => setCurrentTech(e.target.value)}
                        onKeyPress={(e) => handleTechKeyPress(e, false)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addTechnology(false)}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {newProject.technologies.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          {tech}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeTechnology(tech, false)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value: any) => setNewProject({ ...newProject, status: value, endDate: value !== "completed" ? "" : newProject.endDate })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    />
                  </div>
                </div>
                {newProject.status === "completed" && (
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Completion Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject} disabled={!newProject.title || !newProject.description}>
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update your project details.
              </DialogDescription>
            </DialogHeader>
            {editingProject && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Project Title</Label>
                  <Input
                    id="edit-title"
                    placeholder="Enter project title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Describe your project..."
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-projectLink">Project Link (GitHub/Demo)</Label>
                  <Input
                    id="edit-projectLink"
                    placeholder="https://github.com/username/project"
                    value={editingProject.projectLink || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, projectLink: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-technologies">Technologies</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type technology and press Enter"
                        value={editCurrentTech}
                        onChange={(e) => setEditCurrentTech(e.target.value)}
                        onKeyPress={(e) => handleTechKeyPress(e, true)}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addTechnology(true)}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {editingProject.technologies.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          {tech}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeTechnology(tech, true)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingProject.status}
                      onValueChange={(value: any) => setEditingProject({ ...editingProject, status: value, endDate: value !== "completed" ? undefined : editingProject.endDate })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate">Start Date</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={editingProject.startDate}
                      onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                    />
                  </div>
                </div>
                {editingProject.status === "completed" && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-endDate">Completion Date</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={editingProject.endDate || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditProject} disabled={!editingProject.title || !editingProject.description}>
                    Update Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Finished projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Code className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {projects.filter((p) => p.status === "ongoing").length}
              </div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex-1 mr-2">{project.title}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Started: {new Date(project.startDate).toLocaleDateString()}
                  </div>
                  {project.endDate && (
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3" />
                      Completed: {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    {project.projectLink ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        asChild
                      >
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                          <Code className="h-3 w-3 mr-1" />
                          View Code
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1" disabled>
                        <Code className="h-3 w-3 mr-1" />
                        No Link
                      </Button>
                    )}
                    {project.status === "completed" && project.projectLink && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Edit and Delete Buttons */}
                  <div className="flex gap-2">
                    <Button 
  size="sm" 
  variant="secondary" 
  className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
  onClick={() => openEditDialog(project)}
>
  <Edit className="h-3 w-3 mr-1" />
  Edit
</Button>

<Button 
  size="sm" 
  variant="destructive" 
  className="flex-1 bg-red-100 text-red-700 hover:bg-red-200"
  onClick={() => handleDeleteProject(project.id)}
>
  <Trash2 className="h-3 w-3 mr-1" />
  Delete
</Button>

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Start building your portfolio by creating your first project</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}