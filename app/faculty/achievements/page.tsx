"use client"
import { useEffect } from "react"
import cookies from "js-cookie"
import { useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DataTable } from "@/components/shared/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, X, Clock, Award, MessageSquare } from "lucide-react"

export default function FacultyAchievements() {
  // TODO: Replace with API call -> GET /api/faculty/achievements/pending
  const [achievements, setAchievements] = useState<any[]>([])

  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [reviewComment, setReviewComment] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  const fetchAchievements = async () => {
    setLoading(true)
    try {
      const role = cookies.get("role") // get role from cookie
      const res = await fetch("http://127.0.0.1:8000/api/faculty/achievements/", {
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": role || "",  // send role as a custom header
        },
      })

      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setAchievements(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchAchievements()
}, [])
  const handleApprove = (id: number) => {
    // TODO: Replace with API call -> PUT /api/achievements/:id/approve
    setAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
    console.log("Approved achievement:", id, "Comment:", reviewComment)
    setReviewComment("")
  }

  const handleReject = (id: number) => {
    // TODO: Replace with API call -> PUT /api/achievements/:id/reject
    setAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
    console.log("Rejected achievement:", id, "Comment:", reviewComment)
    setReviewComment("")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "extracurricular":
        return "bg-green-100 text-green-800"
      case "research":
        return "bg-purple-100 text-purple-800"
      case "community_service":
        return "bg-orange-100 text-orange-800"
      case "internship":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const columns = [
  {
    key: "student_name",
    label: "Student",
    render: (value: string, row: any) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.student_id}</div>
      </div>
    ),
  },
  {
    key: "title",
    label: "Achievement",
    render: (value: string) => <span className="font-medium">{value}</span>,
  },
  {
    key: "category",
    label: "Category",
    render: (value: string) => <Badge className={getCategoryColor(value)}>{value}</Badge>,
  },
  {
    key: "certificate_url",
    label: "Certificate",
    render: (value: string) => (
      <a href={value} target="_blank" className="text-blue-600 underline">
        View PDF
      </a>
    ),
  },
  // Add other fields similarly
]



  return (
    <DashboardLayout role="faculty" currentPage="Achievement Reviews">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Achievement Reviews</h1>
            <p className="text-muted-foreground">Review and approve student achievement submissions</p>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {achievements.length} Pending Reviews
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{achievements.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting your review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Achievements reviewed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">9</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Table */}
        <DataTable
        title="Pending Achievement Reviews"
        data={achievements}
        columns={columns}
        searchable
        filterable
        exportable
/>
      </div>
    </DashboardLayout>
  )
}

function AchievementReviewDialog({
  achievement,
  reviewComment,
  setReviewComment,
  onApprove,
  onReject,
}: {
  achievement: any
  reviewComment: string
  setReviewComment: (comment: string) => void
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Achievement Details */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">
            Submitted by {achievement.student_name} on{" "}
            {new Date(achievement.date_awarded).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <div className="mt-1">
              <Badge className={getCategoryColor(achievement.category)}>
                {achievement.category.replace("_", " ")}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Type</label>
            <div className="mt-1 text-lg font-bold text-accent">
              {achievement.achievement_type}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <p className="mt-1 text-sm text-muted-foreground">
            {achievement.description}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Certificate</label>
          <a
            href={achievement.certificate_url}
            target="_blank"
            className="mt-1 text-sm text-blue-600 underline"
          >
            View PDF
          </a>
        </div>
      </div>

      {/* Review Comment */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Review Comment (Optional)
        </label>
        <Textarea
          placeholder="Add any comments or feedback for the student..."
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onReject}
          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <X className="h-4 w-4 mr-2" />
          Reject
        </Button>
        <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve
        </Button>
      </div>
    </div>
  )
}

