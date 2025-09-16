"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DataTable } from "@/components/shared/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { dummyUniversities } from "@/lib/mock-data"
import { Plus, Building2, Users, UserCheck, MapPin, Edit, Trash2 } from "lucide-react"

export default function AdminUniversities() {
  // TODO: Replace with API call -> GET /api/admin/universities
  const [universities, setUniversities] = useState(dummyUniversities)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUniversity, setNewUniversity] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
  })

  const handleAddUniversity = () => {
    // TODO: Replace with API call -> POST /api/admin/universities
    const university = {
      id: universities.length + 1,
      name: newUniversity.name,
      location: newUniversity.location,
      totalStudents: 0,
      totalFaculty: 0,
      ...newUniversity,
    }
    setUniversities([...universities, university])
    setIsAddDialogOpen(false)
    setNewUniversity({
      name: "",
      location: "",
      description: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
    })
  }

  const handleDeleteUniversity = (id: number) => {
    // TODO: Replace with API call -> DELETE /api/admin/universities/:id
    setUniversities(universities.filter((uni) => uni.id !== id))
  }

  const columns = [
    {
      key: "name",
      label: "University",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-full">
            <Building2 className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.location}</div>
          </div>
        </div>
      ),
    },
    {
      key: "totalStudents",
      label: "Students",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "totalFaculty",
      label: "Faculty",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <UserCheck className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: () => <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleDeleteUniversity(row.id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout role="admin" currentPage="University Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">University Management</h1>
            <p className="text-muted-foreground">Manage partner universities and their information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add University
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New University</DialogTitle>
                <DialogDescription>Add a new partner university to the platform.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">University Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter university name"
                    value={newUniversity.name}
                    onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State/Country"
                    value={newUniversity.location}
                    onChange={(e) => setNewUniversity({ ...newUniversity, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://university.edu"
                    value={newUniversity.website}
                    onChange={(e) => setNewUniversity({ ...newUniversity, website: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="admin@university.edu"
                      value={newUniversity.contactEmail}
                      onChange={(e) => setNewUniversity({ ...newUniversity, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      placeholder="+1 (555) 123-4567"
                      value={newUniversity.contactPhone}
                      onChange={(e) => setNewUniversity({ ...newUniversity, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the university..."
                    value={newUniversity.description}
                    onChange={(e) => setNewUniversity({ ...newUniversity, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUniversity}>Add University</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Universities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{universities.length}</div>
              <p className="text-xs text-muted-foreground">Partner institutions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {universities.reduce((sum, uni) => sum + uni.totalStudents, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Across all universities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {universities.reduce((sum, uni) => sum + uni.totalFaculty, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Teaching staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Size</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  universities.reduce((sum, uni) => sum + uni.totalStudents, 0) / universities.length,
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Students per university</p>
            </CardContent>
          </Card>
        </div>

        {/* Universities Table */}
        <DataTable
          title="All Universities"
          data={universities}
          columns={columns}
          searchable={true}
          filterable={true}
          exportable={true}
        />
      </div>
    </DashboardLayout>
  )
}
