"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Star, MapPin, Clock, Eye, EyeOff, Camera } from "lucide-react"
import Link from "next/link"

const skillCategories = ["Programming", "Design", "Business", "Language", "Music", "Creative", "Fitness", "Lifestyle"]

const availableSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "Photoshop",
  "Illustrator",
  "Figma",
  "Excel",
  "PowerPoint",
  "Guitar",
  "Piano",
  "Spanish",
  "French",
  "Cooking",
  "Photography",
  "Video Editing",
  "Marketing",
  "Writing",
  "Yoga",
  "Personal Training",
]

export default function ProfilePage() {
  const [isPublic, setIsPublic] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    location: "New York, NY",
    availability: "Weekends, Evenings after 6pm",
    bio: "Passionate developer and lifelong learner. Love sharing knowledge and learning new skills!",
  })

  const [skillsOffered, setSkillsOffered] = useState([
    { name: "JavaScript", level: "Advanced" },
    { name: "React", level: "Intermediate" },
    { name: "Photography", level: "Beginner" },
  ])

  const [skillsWanted, setSkillsWanted] = useState([
    { name: "Photoshop", priority: "High" },
    { name: "Spanish", priority: "Medium" },
    { name: "Guitar", priority: "Low" },
  ])

  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")

  const addSkillOffered = () => {
    if (newSkillOffered && !skillsOffered.find((s) => s.name === newSkillOffered)) {
      setSkillsOffered([...skillsOffered, { name: newSkillOffered, level: "Intermediate" }])
      setNewSkillOffered("")
    }
  }

  const addSkillWanted = () => {
    if (newSkillWanted && !skillsWanted.find((s) => s.name === newSkillWanted)) {
      setSkillsWanted([...skillsWanted, { name: newSkillWanted, priority: "Medium" }])
      setNewSkillWanted("")
    }
  }

  const removeSkillOffered = (skillName: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s.name !== skillName))
  }

  const removeSkillWanted = (skillName: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s.name !== skillName))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SS</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/browse">
                <Button variant="ghost">Browse Skills</Button>
              </Link>
              <Link href="/requests">
                <Button variant="ghost">Requests</Button>
              </Link>
              <Button variant="outline">Save Profile</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your profile information and skills</p>
        </div>

        <div className="grid gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  placeholder="City, State/Country"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  placeholder="e.g., Weekends, Evenings after 6pm"
                  value={profileData.availability}
                  onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about yourself and your interests..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Privacy Setting */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {isPublic ? <Eye className="w-5 h-5 text-green-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-gray-500">
                      {isPublic ? "Your profile is public and searchable" : "Your profile is private"}
                    </p>
                  </div>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </CardContent>
          </Card>

          {/* Skills Offered */}
          <Card>
            <CardHeader>
              <CardTitle>Skills I Offer</CardTitle>
              <CardDescription>List the skills you can teach or share with others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newSkillOffered} onValueChange={setNewSkillOffered}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addSkillOffered} disabled={!newSkillOffered}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {skillsOffered.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{skill.name}</Badge>
                      <Select
                        value={skill.level}
                        onValueChange={(value) => {
                          setSkillsOffered(
                            skillsOffered.map((s) => (s.name === skill.name ? { ...s, level: value } : s)),
                          )
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeSkillOffered(skill.name)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Wanted */}
          <Card>
            <CardHeader>
              <CardTitle>Skills I Want to Learn</CardTitle>
              <CardDescription>List the skills you're interested in learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newSkillWanted} onValueChange={setNewSkillWanted}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addSkillWanted} disabled={!newSkillWanted}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {skillsWanted.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{skill.name}</Badge>
                      <Select
                        value={skill.priority}
                        onValueChange={(value) => {
                          setSkillsWanted(
                            skillsWanted.map((s) => (s.name === skill.name ? { ...s, priority: value } : s)),
                          )
                        }}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeSkillWanted(skill.name)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>This is how other users will see your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    {profileData.location && (
                      <p className="text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </p>
                    )}
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" />
                      {profileData.availability}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{profileData.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsOffered.map((skill) => (
                        <Badge key={skill.name} variant="default">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Skills Wanted</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsWanted.map((skill) => (
                        <Badge key={skill.name} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Profile</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
