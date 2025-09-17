"use client"

import { useState, useEffect } from "react"
import cookies from "js-cookie"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DataTable } from "@/components/shared/data-table"
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
import { Plus, Award, CheckCircle, Clock, X, Filter } from "lucide-react"

export default function StudentActivities() {
  // TODO: Replace with API call -> GET /api/students/current/achievements
  const currentStudent = dummyStudents[0]
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [displayName, setDisplayName] = useState("")
  const [newAchievement, setNewAchievement] = useState({
    category: "",
    title: "",
    description: "",
    organization: "",
    org_level: "",          // college, state, national, international
    competition_stage: "",  // participant, organizer, winner, etc.
    certificate: null as File | null,      // file upload
    date_awarded: "",
    certificate_type: "",   // conference, workshop, course, other
  })

  useEffect(() => {
    const username = cookies.get("username")
    if (username) setDisplayName(username)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    setNewAchievement((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewAchievement((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("category", newAchievement.category)
    formData.append("title", newAchievement.title)
    formData.append("description", newAchievement.description)
    formData.append("organization", newAchievement.organization)
    formData.append("org_level", newAchievement.org_level)
    formData.append("competition_stage", newAchievement.competition_stage)
    formData.append("date_awarded", newAchievement.date_awarded)
    formData.append("achievement_type", newAchievement.certificate_type)

    if (newAchievement.certificate) {
      formData.append("certificate", newAchievement.certificate)
    }
    
    try {
      const res = await fetch("http://localhost:8000/api/student/achievements/", {
        method: "POST",
        headers: {
          "X-user-role": "student",
          "X-user-name": displayName
        },
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to save achievement")
      }

      const saved = await res.json()

      // Update UI instantly - you might want to refresh the data from the server instead
      // currentStudent.achievements.unshift(saved)
      
      setIsAddDialogOpen(false)
      setNewAchievement({ 
        category: "",
        title: "", 
        description: "", 
        organization: "",
        org_level: "",
        competition_stage: "",
        certificate: null,
        date_awarded: "",
        certificate_type: ""
      })
      
      // Optional: Show success message
      alert("Achievement submitted successfully!")
      
    } catch (err) {
      console.error(err)
      alert("Error saving achievement")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const columns = [
    {
      key: "title",
      label: "Achievement",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline" className="capitalize">
          {value.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "points",
      label: "Points",
      sortable: true,
      render: (value: number) => <span className="font-medium text-accent">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
  ]

  // Mock additional achievements for demonstration
  const allAchievements = [
    ...currentStudent.achievements,
    {
      id: 2,
      title: "Hackathon Participation",
      category: "extracurricular",
      description: "Participated in 48-hour coding hackathon",
      date: "2024-02-15",
      status: "pending",
      points: 30,
    },
    {
      id: 3,
      title: "Research Paper",
      category: "research",
      description: "Co-authored paper on machine learning applications",
      date: "2024-01-20",
      status: "approved",
      points: 45,
    },
    {
      id: 4,
      title: "Community Service",
      category: "community_service",
      description: "Volunteered at local coding bootcamp",
      date: "2024-01-10",
      status: "rejected",
      points: 0,
    },
  ]

  const filteredActivities = allAchievements.filter(activity => {
    const matchesCategory = filterCategory === 'all' || activity.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalPoints = allAchievements
    .filter(a => a.status === 'approved')
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <DashboardLayout role="student" currentPage="Activities & Achievements">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allAchievements.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {allAchievements.filter((a) => a.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Verified achievements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {allAchievements.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Under review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {totalPoints}
              </div>
              <p className="text-xs text-muted-foreground">Achievement points</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Activity Management</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Achievement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Achievement</DialogTitle>
                    <DialogDescription>
                      Record a new activity or achievement for approval.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newAchievement.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="arts">Arts</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="extracurricular">Extracurricular</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="community_service">Community Service</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Achievement Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter achievement title"
                        value={newAchievement.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your achievement in detail"
                        value={newAchievement.description}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        placeholder="Organization name"
                        value={newAchievement.organization}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org_level">Organization Level</Label>
                      <Select
                        value={newAchievement.org_level}
                        onValueChange={(value) => handleSelectChange("org_level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="competition_stage">Competition Stage</Label>
                      <Select
                        value={newAchievement.competition_stage}
                        onValueChange={(value) => handleSelectChange("competition_stage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select competition stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participant">Participant</SelectItem>
                          <SelectItem value="organizer">Organizer</SelectItem>
                          <SelectItem value="winner">Winner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificate">Certificate</Label>
                      <Input
                        id="certificate"
                        name="certificate"
                        type="file"
                        onChange={handleChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_awarded">Date Awarded</Label>
                      <Input
                        id="date_awarded"
                        name="date_awarded"
                        type="date"
                        value={newAchievement.date_awarded}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificate_type">Certificate Type</Label>
                      <Select
                        value={newAchievement.certificate_type}
                        onValueChange={(value) => handleSelectChange("certificate_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit for Approval</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="community_service">Community Service</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="extracurricular">Extracurricular</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title=""
              data={filteredActivities}
              columns={columns}
              searchable={false}
              filterable={false}
              exportable={true}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}