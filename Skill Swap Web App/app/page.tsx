"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users, ArrowRight, Star, MessageSquare } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const featuredSkills = [
  { name: "JavaScript", count: 15, category: "Programming" },
  { name: "Photoshop", count: 12, category: "Design" },
  { name: "Spanish", count: 8, category: "Language" },
  { name: "Guitar", count: 6, category: "Music" },
  { name: "Cooking", count: 10, category: "Lifestyle" },
  { name: "Excel", count: 14, category: "Business" },
]

const recentSwaps = [
  {
    id: 1,
    requester: "Alice Johnson",
    provider: "Bob Smith",
    skill: "React",
    status: "completed",
    rating: 5,
  },
  {
    id: 2,
    requester: "Carol Davis",
    provider: "Emma Brown",
    skill: "Photography",
    status: "in-progress",
    rating: null,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/browse">
                <Button variant="ghost">Browse Skills</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">My Profile</Button>
              </Link>
              <Link href="/requests">
                <Button variant="ghost">Requests</Button>
              </Link>
              <Button>Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Learn New Skills, Share Your Expertise</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with others to exchange knowledge and grow together. Offer what you know, learn what you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for skills like 'JavaScript', 'Guitar', 'Spanish'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">Search</Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Create Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredSkills.map((skill) => (
              <Card key={skill.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">{skill.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{skill.category}</p>
                  <Badge variant="secondary">{skill.count} users</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recent Skill Swaps</h3>
          <div className="space-y-4">
            {recentSwaps.map((swap) => (
              <Card key={swap.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {swap.requester
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          <span className="text-indigo-600">{swap.requester}</span> learned{" "}
                          <span className="font-semibold">{swap.skill}</span> from{" "}
                          <span className="text-indigo-600">{swap.provider}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                          {swap.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{swap.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1,200+</div>
              <div className="text-indigo-200">Skills Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">800+</div>
              <div className="text-indigo-200">Successful Swaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">SkillSwap</h3>
              </div>
              <p className="text-gray-400">Connecting people through skill sharing and collaborative learning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/requests" className="hover:text-white">
                    Manage Requests
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
