"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Search, Filter, MapPin, Clock, Star, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

// Mock data for users
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.8,
    reviewCount: 12,
    availability: "Weekends, Evenings",
    bio: "Passionate developer and lifelong learner. Love sharing knowledge!",
    skillsOffered: [
      { name: "JavaScript", level: "Advanced" },
      { name: "React", level: "Intermediate" },
      { name: "Photography", level: "Beginner" },
    ],
    skillsWanted: [
      { name: "Photoshop", priority: "High" },
      { name: "Spanish", priority: "Medium" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.9,
    reviewCount: 18,
    availability: "Weekdays 9am-5pm",
    bio: "Data scientist with a passion for teaching and learning new technologies.",
    skillsOffered: [
      { name: "Python", level: "Expert" },
      { name: "Excel", level: "Advanced" },
      { name: "Machine Learning", level: "Intermediate" },
    ],
    skillsWanted: [
      { name: "React", priority: "High" },
      { name: "Guitar", priority: "Low" },
    ],
  },
  {
    id: 3,
    name: "Carol Davis",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.7,
    reviewCount: 8,
    availability: "Flexible schedule",
    bio: "Creative designer with 10+ years of experience in digital design.",
    skillsOffered: [
      { name: "Photoshop", level: "Expert" },
      { name: "Illustrator", level: "Advanced" },
      { name: "Cooking", level: "Intermediate" },
    ],
    skillsWanted: [
      { name: "JavaScript", priority: "Medium" },
      { name: "Video Editing", priority: "High" },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.6,
    reviewCount: 15,
    availability: "Weekends only",
    bio: "Musician and music teacher with 15 years of experience.",
    skillsOffered: [
      { name: "Guitar", level: "Expert" },
      { name: "Piano", level: "Advanced" },
      { name: "Music Theory", level: "Expert" },
    ],
    skillsWanted: [
      { name: "Photography", priority: "Low" },
      { name: "Spanish", priority: "Medium" },
    ],
  },
  {
    id: 5,
    name: "Emma Brown",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4.9,
    reviewCount: 22,
    availability: "Evenings and weekends",
    bio: "Professional photographer and visual storyteller.",
    skillsOffered: [
      { name: "Photography", level: "Expert" },
      { name: "Lightroom", level: "Advanced" },
      { name: "Marketing", level: "Intermediate" },
    ],
    skillsWanted: [
      { name: "Guitar", priority: "High" },
      { name: "French", priority: "Medium" },
    ],
  },
]

const skillCategories = [
  "All",
  "Programming",
  "Design",
  "Business",
  "Language",
  "Music",
  "Creative",
  "Fitness",
  "Lifestyle",
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [swapMessage, setSwapMessage] = useState("")
  const [selectedSkillOffered, setSelectedSkillOffered] = useState("")
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSearch
  })

  const handleSwapRequest = () => {
    // Handle swap request logic here
    console.log("Swap request:", {
      user: selectedUser?.name,
      skillOffered: selectedSkillOffered,
      skillWanted: selectedSkillWanted,
      message: swapMessage,
    })
    // Reset form
    setSwapMessage("")
    setSelectedSkillOffered("")
    setSelectedSkillWanted("")
    setSelectedUser(null)
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
              <Link href="/profile">
                <Button variant="ghost">My Profile</Button>
              </Link>
              <Link href="/requests">
                <Button variant="ghost">Requests</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600">Find people to learn from and share your knowledge with</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {user.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {user.availability}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {user.rating} ({user.reviewCount} reviews)
                          </div>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedUser(user)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Request Swap
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Request Skill Swap</DialogTitle>
                            <DialogDescription>Send a swap request to {user.name}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div>
                              <Label>I want to learn:</Label>
                              <Select value={selectedSkillWanted} onValueChange={setSelectedSkillWanted}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a skill they offer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {user.skillsOffered.map((skill) => (
                                    <SelectItem key={skill.name} value={skill.name}>
                                      {skill.name} ({skill.level})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>I can teach:</Label>
                              <Select value={selectedSkillOffered} onValueChange={setSelectedSkillOffered}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a skill you offer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {/* This would normally come from the current user's skills */}
                                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                                  <SelectItem value="React">React</SelectItem>
                                  <SelectItem value="Photography">Photography</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Message:</Label>
                              <Textarea
                                placeholder="Introduce yourself and explain what you'd like to learn..."
                                value={swapMessage}
                                onChange={(e) => setSwapMessage(e.target.value)}
                                rows={3}
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1 bg-transparent">
                                Cancel
                              </Button>
                              <Button
                                className="flex-1"
                                onClick={handleSwapRequest}
                                disabled={!selectedSkillWanted || !selectedSkillOffered}
                              >
                                Send Request
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <p className="text-gray-700 mb-4">{user.bio}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">Skills Offered</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skillsOffered.map((skill) => (
                            <Badge key={skill.name} variant="default" className="text-xs">
                              {skill.name} ({skill.level})
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">Skills Wanted</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skillsWanted.map((skill) => (
                            <Badge key={skill.name} variant="outline" className="text-xs">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
