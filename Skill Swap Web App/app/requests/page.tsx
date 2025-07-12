"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X, Clock, Star, MessageSquare, Trash2, Users } from "lucide-react"
import Link from "next/link"

// Mock data for swap requests
const incomingRequests = [
  {
    id: 1,
    requester: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4.9,
      location: "San Francisco, CA",
    },
    skillWanted: "JavaScript",
    skillOffered: "Python",
    message:
      "Hi Alice! I would love to learn JavaScript from you. I have 5+ years of Python experience and would be happy to teach you in return.",
    createdAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    id: 2,
    requester: {
      name: "Emma Brown",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4.9,
      location: "Chicago, IL",
    },
    skillWanted: "React",
    skillOffered: "Photography",
    message:
      "Hello! I'm a professional photographer looking to learn React. I'd love to teach you photography techniques in exchange.",
    createdAt: "2024-01-14T15:45:00Z",
    status: "pending",
  },
]

const outgoingRequests = [
  {
    id: 3,
    provider: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4.7,
      location: "Austin, TX",
    },
    skillWanted: "Photoshop",
    skillOffered: "JavaScript",
    message: "Hi Carol! I would love to learn Photoshop from you. I can teach you JavaScript in return.",
    createdAt: "2024-01-13T09:15:00Z",
    status: "pending",
  },
  {
    id: 4,
    provider: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4.6,
      location: "Seattle, WA",
    },
    skillWanted: "Guitar",
    skillOffered: "Photography",
    message: "Hi David! I would like to learn guitar. I can teach you photography in exchange.",
    createdAt: "2024-01-12T14:20:00Z",
    status: "accepted",
  },
]

const completedSwaps = [
  {
    id: 5,
    partner: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4.8,
      location: "Boston, MA",
    },
    skillLearned: "Spanish",
    skillTaught: "React",
    completedAt: "2024-01-10T16:30:00Z",
    myRating: null,
    partnerRating: 5,
  },
]

export default function RequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [rating, setRating] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId)
    // Handle accept logic
  }

  const handleRejectRequest = (requestId: number) => {
    console.log("Rejecting request:", requestId)
    // Handle reject logic
  }

  const handleDeleteRequest = (requestId: number) => {
    console.log("Deleting request:", requestId)
    // Handle delete logic
  }

  const handleSubmitRating = () => {
    console.log("Submitting rating:", { rating, feedback })
    // Handle rating submission
    setRating("")
    setFeedback("")
    setSelectedRequest(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/browse">
                <Button variant="ghost">Browse Skills</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">My Profile</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Requests</h1>
          <p className="text-gray-600">Manage your skill swap requests and completed exchanges</p>
        </div>

        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incoming">Incoming ({incomingRequests.length})</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing ({outgoingRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedSwaps.length})</TabsTrigger>
          </TabsList>

          {/* Incoming Requests */}
          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                  <p className="text-gray-600">When others request to learn from you, they'll appear here</p>
                </CardContent>
              </Card>
            ) : (
              incomingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.requester.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.requester.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{request.requester.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{request.requester.location}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{request.requester.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(request.createdAt)}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            Wants to learn <Badge variant="outline">{request.skillWanted}</Badge> and offers{" "}
                            <Badge variant="default">{request.skillOffered}</Badge>
                          </p>
                          <p className="text-gray-700">{request.message}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Outgoing Requests */}
          <TabsContent value="outgoing" className="space-y-4">
            {outgoingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No outgoing requests</h3>
                  <p className="text-gray-600">
                    <Link href="/browse" className="text-indigo-600 hover:underline">
                      Browse skills
                    </Link>{" "}
                    to find people to learn from
                  </p>
                </CardContent>
              </Card>
            ) : (
              outgoingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.provider.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{request.provider.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{request.provider.location}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{request.provider.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={request.status === "accepted" ? "default" : "secondary"}>
                              {request.status}
                            </Badge>
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(request.createdAt)}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            You want to learn <Badge variant="outline">{request.skillWanted}</Badge> and offered{" "}
                            <Badge variant="default">{request.skillOffered}</Badge>
                          </p>
                          <p className="text-gray-700">{request.message}</p>
                        </div>

                        {request.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => handleDeleteRequest(request.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Cancel Request
                          </Button>
                        )}

                        {request.status === "accepted" && (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="w-3 h-3 mr-1" />
                            Accepted - Contact them to start learning!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Completed Swaps */}
          <TabsContent value="completed" className="space-y-4">
            {completedSwaps.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed swaps yet</h3>
                  <p className="text-gray-600">Your completed skill exchanges will appear here</p>
                </CardContent>
              </Card>
            ) : (
              completedSwaps.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={swap.partner.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {swap.partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{swap.partner.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{swap.partner.location}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{swap.partner.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            Completed {formatDate(swap.completedAt)}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            You learned <Badge variant="outline">{swap.skillLearned}</Badge> and taught{" "}
                            <Badge variant="default">{swap.skillTaught}</Badge>
                          </p>
                          {swap.partnerRating && (
                            <p className="text-sm text-gray-600">
                              They rated you:{" "}
                              {Array.from({ length: swap.partnerRating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 inline fill-yellow-400 text-yellow-400" />
                              ))}
                            </p>
                          )}
                        </div>

                        {!swap.myRating && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedRequest(swap)}>
                                <Star className="w-4 h-4 mr-1" />
                                Rate & Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Rate Your Experience</DialogTitle>
                                <DialogDescription>How was your skill swap with {swap.partner.name}?</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <div>
                                  <Label>Rating</Label>
                                  <Select value={rating} onValueChange={setRating}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                                      <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                                      <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                                      <SelectItem value="2">⭐⭐ Poor</SelectItem>
                                      <SelectItem value="1">⭐ Very Poor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label>Feedback (Optional)</Label>
                                  <Textarea
                                    placeholder="Share your experience..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={3}
                                  />
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    Cancel
                                  </Button>
                                  <Button className="flex-1" onClick={handleSubmitRating} disabled={!rating}>
                                    Submit Rating
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {swap.myRating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Your rating:</span>
                            {Array.from({ length: swap.myRating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
