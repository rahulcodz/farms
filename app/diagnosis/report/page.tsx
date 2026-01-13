"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  ArrowLeft,
  Calendar,
  BarChart3,
  Heart,
  Droplets,
  Thermometer,
  Share2,
  Download,
  Bot,
  Send,
  MoreVertical,
  ExternalLink,
  Scissors,
  Sprout,
  Globe,
  TrendingUp,
  Users,
  Monitor,
} from "lucide-react"
import Image from "next/image"

export default function DiagnosisReportPage() {
  const [message, setMessage] = useState("")
  const [filter, setFilter] = useState("all")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle message sending
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/diagnosis"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-[#2E7D32] dark:hover:text-[#2E7D32] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <span className="text-sm text-gray-600 dark:text-gray-400">Report ID: #AG-2023-8842</span>
        </div>

        {/* Main Report Card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D32] opacity-5 dark:opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-full md:w-48 h-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md relative group">
              <Image
                alt="Tomato leaf showing signs of blight"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhu2LjReI2FfXgio8uar0OY7gVLJ18i08HiIKsFjS13tiWsX-HD47Tz0QZ9NSbz-5JhTAd6KuPsUzpbZpj5ASwhXfakNQ0hntiM8FUcuYK0_M2lQ4JfaS6dExth3wvM4LhbCS_97xyr2tZDRgjcM7_4UNTJCNJwkJ12AmFTAyfTC9nZlmO9QDnVht--LwjnA8aGjt6OHLppZW7_U0ZR5-RD1dvGErb174SfDDN9mSepMmLzCQkOalN8Y-NR3F-HtLS8cMOdQY_4hs"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                Source Image
              </span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800">
                  Critical
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Oct 24, 2023
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl text-gray-900 dark:text-white font-bold mb-2">
                Late Blight in Tomatoes
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                A destructive fungal disease caused by <em className="italic">Phytophthora infestans</em>. Rapid spread
                detected on upper foliage. Immediate action required to save the crop yield.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end">
              <div className="text-right mb-1">
                <span className="block text-sm text-gray-600 dark:text-gray-400">AI Confidence</span>
                <span className="text-4xl font-bold text-[#2E7D32]">96%</span>
              </div>
              <button className="text-[#2E7D32] hover:text-[#1B5E20] text-sm font-medium flex items-center mt-2">
                See detailed analysis <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Executive Summary */}
            <Card className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2E7D32]" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#F0FDF4] dark:bg-gray-800/50 rounded-xl p-5 border border-green-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-4">
                      Environmental Risk Factors
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg">
                            <Droplets className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">High Humidity</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Current: 88%</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                          HIGH RISK
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-lg">
                            <Thermometer className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Mild Temperature</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Range: 15°C - 22°C</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                          MODERATE
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-2">
                      Potential Impact
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      Without intervention, yield loss could reach{" "}
                      <span className="font-bold text-red-600 dark:text-red-400">40-60%</span> within 7 days. The
                      pathogen thrives in the current cool, wet conditions typical for this location in October.
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Low Risk</span>
                      <span>Severe Risk (85%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Action Plan */}
            <Card className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#2E7D32]" />
                    Treatment Action Plan
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("all")}
                      className={filter === "all" ? "bg-[#2E7D32] text-white" : ""}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === "organic" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("organic")}
                      className={filter === "organic" ? "bg-[#2E7D32] text-white" : ""}
                    >
                      Organic
                    </Button>
                    <Button
                      variant={filter === "chemical" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("chemical")}
                      className={filter === "chemical" ? "bg-[#2E7D32] text-white" : ""}
                    >
                      Chemical
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 mb-8">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

                  {/* Immediate Action */}
                  <div className="relative pl-10 pb-10">
                    <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-white dark:border-[#1e293b] transform -translate-x-1/2 shadow"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Immediate Action</h3>
                      <span className="text-xs font-semibold uppercase text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                        Within 24 Hours
                      </span>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4 mt-2">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm text-red-500">
                            <Heart className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Apply Fungicide Spray</h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Use a Chlorothalonil or Copper-based fungicide. Ensure full leaf coverage, especially
                            undersides.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <a
                              href="#"
                              className="inline-flex items-center text-xs font-medium text-[#2E7D32] hover:underline"
                            >
                              View Product Recommendations <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Care */}
                  <div className="relative pl-10 pb-10">
                    <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-white dark:border-[#1e293b] transform -translate-x-1/2 shadow"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Follow-up Care</h3>
                      <span className="text-xs font-semibold uppercase text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                        Day 3 - 7
                      </span>
                    </div>
                    <ul className="space-y-3 mt-2">
                      <li className="flex items-start gap-3">
                        <Scissors className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Pruning:</strong> Remove and destroy all infected leaves. Do not compost them.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Watering:</strong> Switch to drip irrigation. Avoid wetting foliage during watering.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Prevention & Recovery */}
                  <div className="relative pl-10">
                    <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-[#2E7D32] border-4 border-white dark:border-[#1e293b] transform -translate-x-1/2 shadow"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Prevention & Recovery</h3>
                      <span className="text-xs font-semibold uppercase text-[#2E7D32] bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                        Post-Season
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Rotate crops next season. Avoid planting tomatoes, potatoes, or eggplants in this soil for at least
                      3 years. Improve soil drainage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Report Actions */}
            <Card className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Report Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-md">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
              </CardContent>
            </Card>

            {/* AI Agronomist Chat */}
            <Card className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700 flex flex-col flex-grow">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-[#2E7D32]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1e293b] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">AI Agronomist</h3>
                    <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold uppercase">
                      Online
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/20 flex-grow" style={{ minHeight: "400px", maxHeight: "calc(100vh - 450px)" }}>
                <div className="flex flex-col items-center py-4">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                    Today
                  </span>
                </div>

                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex-shrink-0 flex items-center justify-center text-[#2E7D32]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      Hello! I've analyzed your Tomato Late Blight report. How can I help you implement the treatment
                      plan?
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">10:42 AM</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 py-2">
                  <button className="text-xs px-3 py-1.5 rounded-full border border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors bg-white dark:bg-gray-800">
                    Where to buy Copper Fungicide?
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-full border border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors bg-white dark:bg-gray-800">
                    Is it safe for organic crops?
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-full border border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-colors bg-white dark:bg-gray-800">
                    Pruning tips
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Ask about this report..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-[#2E7D32] focus:border-[#2E7D32] placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-2 text-[#2E7D32] hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-3">
                  AI can make mistakes. Consider asking a human expert for critical decisions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}