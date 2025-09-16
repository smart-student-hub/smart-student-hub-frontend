"use client"

import { useState } from "react"
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
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
  })

  const handleAddAchievement = () => {
    // TODO: Replace with API call -> POST /api/achievements
    console.log("Adding achievement:", newAchievement)
    setIsAddDialogOpen(false)
    setNewAchievement({ title: "", category: "", description: "", date: "" })
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
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Achievement</DialogTitle>
                    <DialogDescription>
                      Record a new activity or achievement for approval.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Achievement Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter achievement title"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newAchievement.category}
                        onValueChange={(value) => setNewAchievement({ ...newAchievement, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="extracurricular">Extracurricular</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="community_service">Community Service</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAchievement.date}
                        onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your achievement in detail"
                        value={newAchievement.description}
                        onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddAchievement}>Submit for Approval</Button>
                    </div>
                  </div>
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
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="community_service">Community Service</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
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