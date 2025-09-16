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
  const [achievements, setAchievements] = useState(currentStudent.achievements)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newAchievement, setNewAchievement] = useState<{
    title: string;
    category: string;
    description: string;
    organization: string;
    organizationLevel: string;
    competitionStage: string;
    certificate: File | undefined;
    dateAwarded: string;
    certificateType: string;
  }>({
    title: "",
    category: "",
    description: "",
    organization: "",
    organizationLevel: "",
    competitionStage: "",
    certificate: undefined,
    dateAwarded: "",
    certificateType: "",
  });

  const handleAddAchievement = () => {
    // Add new achievement to state
    const achievementToAdd = {
      id: Date.now(),
      title: newAchievement.title,
      category: newAchievement.category,
      description: newAchievement.description,
      organization: newAchievement.organization,
      organizationLevel: newAchievement.organizationLevel,
      competitionStage: newAchievement.competitionStage,
      certificate: newAchievement.certificate,
      date: newAchievement.dateAwarded,
      certificateType: newAchievement.certificateType,
      status: "pending",
      points: 0,
    }
    setAchievements(prev => [...prev, achievementToAdd])
    setIsAddDialogOpen(false)
    setNewAchievement({
      title: "",
      category: "",
      description: "",
      organization: "",
      organizationLevel: "",
      competitionStage: "",
      certificate: undefined,
      dateAwarded: "",
      certificateType: "",
    })
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

  // Use state for achievements
  const allAchievements = achievements

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
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Achievement</DialogTitle>
                    <DialogDescription>
                      Record a new activity or achievement for approval.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        id="category"
                        value={newAchievement.category}
                        onValueChange={(value: string) => setNewAchievement({ ...newAchievement, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter achievement title"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                      />
                    </div>
                    {/* Organization */}
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        placeholder="Enter organization name"
                        value={newAchievement.organization}
                        onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                      />
                    </div>
                    {/* Organization Level */}
                    <div className="space-y-2">
                      <Label htmlFor="organizationLevel">Organization Level</Label>
                      <Select
                        id="organizationLevel"
                        value={newAchievement.organizationLevel}
                        onValueChange={(value: string) => setNewAchievement({ ...newAchievement, organizationLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Competition Stage */}
                    <div className="space-y-2">
                      <Label htmlFor="competitionStage">Competition Stage</Label>
                      <Select
                        id="competitionStage"
                        value={newAchievement.competitionStage}
                        onValueChange={(value: string) => setNewAchievement({ ...newAchievement, competitionStage: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participant">Participant</SelectItem>
                          <SelectItem value="organizer">Organizer</SelectItem>
                          <SelectItem value="winner">Winner</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Certificate Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="certificate">Certificate</Label>
                      <Input
                        id="certificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setNewAchievement({ ...newAchievement, certificate: e.target.files?.[0] })}
                      />
                    </div>
                    {/* Certificate Type */}
                    <div className="space-y-2">
                      <Label htmlFor="certificateType">Certificate Type</Label>
                      <Select
                        id="certificateType"
                        value={newAchievement.certificateType}
                        onValueChange={(value: string) => setNewAchievement({ ...newAchievement, certificateType: value })}
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
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newAchievement.category}
                        onValueChange={(value: string) => setNewAchievement({ ...newAchievement, category: value })}
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
                        value={newAchievement.dateAwarded}
                        onChange={(e) => setNewAchievement({ ...newAchievement, dateAwarded: e.target.value })}
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