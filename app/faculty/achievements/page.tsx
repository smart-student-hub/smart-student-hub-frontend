"use client"

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
  const [pendingAchievements, setPendingAchievements] = useState([
    {
      id: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice.johnson@university.edu",
      title: "Best Project Award",
      category: "academic",
      description: "Won first place in annual project competition with AI-powered study assistant",
      submittedDate: "2024-06-28",
      points: 50,
      evidence: "Certificate and project documentation attached",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      studentEmail: "bob.smith@university.edu",
      title: "Hackathon Winner",
      category: "extracurricular",
      description: "Won regional hackathon with blockchain-based voting solution",
      submittedDate: "2024-06-27",
      points: 40,
      evidence: "Winner certificate and project demo video",
      status: "pending",
    },
    {
      id: 3,
      studentName: "Carol Davis",
      studentEmail: "carol.davis@university.edu",
      title: "Research Publication",
      category: "research",
      description: "Co-authored paper on machine learning applications in healthcare",
      submittedDate: "2024-06-25",
      points: 80,
      evidence: "Published paper link and citation details",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Alice Johnson",
      studentEmail: "alice.johnson@university.edu",
      title: "Community Service",
      category: "community_service",
      description: "Volunteered 40 hours at local coding bootcamp for underprivileged students",
      submittedDate: "2024-06-24",
      points: 25,
      evidence: "Service hours certificate from organization",
      status: "pending",
    },
  ])

  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [reviewComment, setReviewComment] = useState("")

  const handleApprove = (id: number) => {
    // TODO: Replace with API call -> PUT /api/achievements/:id/approve
    setPendingAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
    console.log("Approved achievement:", id, "Comment:", reviewComment)
    setReviewComment("")
  }

  const handleReject = (id: number) => {
    // TODO: Replace with API call -> PUT /api/achievements/:id/reject
    setPendingAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
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
      key: "studentName",
      label: "Student",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.studentEmail}</div>
        </div>
      ),
    },
    {
      key: "title",
      label: "Achievement",
      sortable: true,
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value: string) => <Badge className={getCategoryColor(value)}>{value.replace("_", " ")}</Badge>,
    },
    {
      key: "points",
      label: "Points",
      sortable: true,
      render: (value: number) => <span className="font-medium text-accent">{value}</span>,
    },
    {
      key: "submittedDate",
      label: "Submitted",
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" onClick={() => setSelectedAchievement(row)}>
                Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Review Achievement</DialogTitle>
                <DialogDescription>
                  Carefully review the achievement details and provide your decision
                </DialogDescription>
              </DialogHeader>
              {selectedAchievement && (
                <AchievementReviewDialog
                  achievement={selectedAchievement}
                  reviewComment={reviewComment}
                  setReviewComment={setReviewComment}
                  onApprove={() => handleApprove(selectedAchievement.id)}
                  onReject={() => handleReject(selectedAchievement.id)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
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
            {pendingAchievements.length} Pending Reviews
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
              <div className="text-2xl font-bold text-yellow-600">{pendingAchievements.length}</div>
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
          data={pendingAchievements}
          columns={columns}
          searchable={true}
          filterable={true}
          exportable={true}
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
            Submitted by {achievement.studentName} on {new Date(achievement.submittedDate).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <div className="mt-1">
              <Badge className={getCategoryColor(achievement.category)}>{achievement.category.replace("_", " ")}</Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Points</label>
            <div className="mt-1 text-lg font-bold text-accent">{achievement.points}</div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <p className="mt-1 text-sm text-muted-foreground">{achievement.description}</p>
        </div>

        <div>
          <label className="text-sm font-medium">Evidence</label>
          <p className="mt-1 text-sm text-muted-foreground">{achievement.evidence}</p>
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
