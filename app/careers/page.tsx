"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  Globe,
  Brain,
  Heart,
  Sparkles,
  Radio,
} from "lucide-react"
import Image from "next/image"

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    expertise: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExpertiseChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", linkedin: "", expertise: "" })

    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A2E1A]">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content & Form */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#1B5E20] font-semibold text-sm mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]"></span>
                  </span>
                  We're Growing
                </div>
                <h1 className="font-[family-name:var(--font-merriweather)] text-5xl md:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight">
                  Help Us Shape the <br />
                  <span className="text-[#2E7D32]">Future of Farming</span>
                </h1>
                <p className="text-xl text-[#4B634B] mb-8 leading-relaxed">
                  We're building the world's most advanced AI platform for farmers. Our careers portal is coming soon,
                  but we're always looking for passionate engineers, agronomists, and designers.
                </p>

                {/* Registration Form */}
                <Card className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] max-w-lg">
                  <h2 className="text-xl font-bold mb-6">Register Your Interest</h2>
                  {submitted ? (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                      <p className="text-lg font-semibold text-[#2E7D32]">Thank you for your interest!</p>
                      <p className="text-sm text-[#4B634B] mt-2">We'll notify you when positions open up.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-[#4B634B] mb-1">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all outline-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-[#4B634B] mb-1">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all outline-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin" className="block text-sm font-medium text-[#4B634B] mb-1">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          type="url"
                          placeholder="linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all outline-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expertise" className="block text-sm font-medium text-[#4B634B] mb-1">
                          Area of Expertise
                        </Label>
                        <Select value={formData.expertise} onValueChange={handleExpertiseChange}>
                          <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all outline-none bg-white">
                            <SelectValue placeholder="Select expertise" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="software-engineering">Software Engineering</SelectItem>
                            <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                            <SelectItem value="agronomy">Agronomy</SelectItem>
                            <SelectItem value="product-design">Product & Design</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-1"
                      >
                        Notify Me
                      </Button>
                      <p className="text-[10px] text-center text-[#4B634B] mt-4">
                        By registering, you agree to receive updates about career opportunities at AgroAI.
                      </p>
                    </form>
                  )}
                </Card>
              </div>

              {/* Right Column - Image with Animated Cards */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    alt="Futuristic Farm Illustration"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrttrurBXIRTLt-qUw2YzkwBmgwt6rhz3PXKi1MSFRHIv0dEeRUd4qDtmijLn4u6EyF2Y-MznKls_RgfKQuRafFuZTTXSK7yBx5Ur6cNAtq-dwFeyqJPHQjeSldeDpdjIHPQ-kqVdhwS0rMz6lU89jQ0TlbF92oZSI4J3xY5NHTYof_yLJLLK06ant8MCmmJykmTsUKMKRIysVlVVRDZCur-eurf6V-gNyhUcY9bfqoUKam72dLdcRF4-2wUUWvTyt7TQJ7xOU8Xhm"
                    width={800}
                    height={600}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E7D32]/40 to-transparent"></div>

                  {/* Animated Card 1 */}
                  <div
                    className="absolute top-10 left-10 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-white/50 animate-bounce"
                    style={{ animationDuration: "4s" }}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-[#2E7D32]" />
                      <div>
                        <p className="text-xs text-[#4B634B] font-medium">AI Model</p>
                        <p className="font-bold text-[#1A2E1A]">Optimizing Yields</p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Card 2 */}
                  <div
                    className="absolute bottom-10 right-10 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-white/50 animate-bounce"
                    style={{ animationDuration: "5s", animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-3">
                      <Radio className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="text-xs text-[#4B634B] font-medium">IoT Network</p>
                        <p className="font-bold text-[#1A2E1A]">Global Deployment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2E7D32]/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Build with AgroAI Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold text-[#1A2E1A] mb-4">
                Why Build with AgroAI?
              </h2>
              <p className="text-[#4B634B] text-lg max-w-2xl mx-auto">
                Join a team that's solving the most critical challenges in global food security using cutting-edge
                technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 rounded-3xl border border-gray-100 bg-[#FDFDFB] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-[#2E7D32] mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Impact</h3>
                <p className="text-[#4B634B] leading-relaxed">
                  Work on tools that directly help 50,000+ farmers improve their livelihoods and feed their communities.
                </p>
              </Card>

              <Card className="p-8 rounded-3xl border border-gray-100 bg-[#FDFDFB] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tech-First Culture</h3>
                <p className="text-[#4B634B] leading-relaxed">
                  Solve complex problems using computer vision, predictive modeling, and large-scale data systems.
                </p>
              </Card>

              <Card className="p-8 rounded-3xl border border-gray-100 bg-[#FDFDFB] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mission Driven</h3>
                <p className="text-[#4B634B] leading-relaxed">
                  We are backed by global NGOs to ensure our technology stays free and accessible to those who need it
                  most.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}