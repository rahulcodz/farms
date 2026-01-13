"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  Upload,
  Image as ImageIcon,
  Layers,
  Cloud,
  X,
  MapPin,
  Navigation,
  Sprout,
  Clock,
  Lightbulb,
  Scissors,
  Thermometer,
  Droplets,
  CloudRain,
  BarChart3,
} from "lucide-react"
import Image from "next/image"

export default function DiagnosisPage() {
  const [cropImages, setCropImages] = useState<string[]>([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAl70oMuL2YoLSM4f8cx8UfD7MZ4Tx6s4lHz4g6forB71wXqzeJdMVjdAktLmmHzjkRggLb8lK-9VUrZKNwa3eqNmtZ6fRw0GHEciVGLgZd90zwhPwaep1w-sj24vEjBFDS53un7IO8EucxvcTd8ZdzcTxDq_DFuU89u4J4Iovl9FIl3rdvcyCZoOSMx_8NNnqAYVm0uXYU-6dVHQcCfetd8hiVCDdiLTQ0K-1zLUcDBgEQotIMsqQOB0sk1N1ZCWlE6rdtX5JBS4Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuVGZW3lvFtlDKoK3NALUukQOLqX8PTh6DwjVwkIbRoqFfkcOmdZYzTnEx8kj9PMQkLDyFsyyVRKBiVOpGaDiIeRNwvYcQzlesw6t1lte2pC9CzdfOr15HjMPoLp9VWRo7NXn67L-SHkGPCCfaU3cz6RSNUAyEWlAndfBJ1SSj46PlSAKfJcQ_XLPAPrPuOvPobCyFPvEF-NByka87StvDeW6BKx-UCJYsjSgMKwAw607sNjeGKfr9AfKEZH-wJux9iCXa7Z6VDDs",
  ])
  const [cropType, setCropType] = useState("Tomato")
  const [growthStage, setGrowthStage] = useState("")
  const [location, setLocation] = useState("Ames, Iowa, USA")

  const handleImageRemove = (index: number) => {
    setCropImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload these files and get URLs back
      // For now, we'll just simulate by keeping the existing images
      console.log("Files selected:", files)
    }
  }

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          console.log("Location detected:", position.coords)
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold leading-7 text-gray-900 dark:text-white font-[family-name:var(--font-merriweather)] sm:text-4xl sm:truncate">
                Comprehensive Multi-Factor Diagnosis
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Upload multi-modal data including crop visuals, soil reports, and environmental context for maximum AI analysis accuracy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Evidence Sources */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <Upload className="w-5 h-5 text-[#2F855A]" />
                      Evidence Sources
                    </CardTitle>
                    <span className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2.5 py-0.5 rounded-full">
                      Step 1 of 3
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Crop Images */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-[#2F855A]" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">1. Crop Images</span>
                      </div>
                      <span className="text-xs text-gray-500">Visual Disease Detection</span>
                    </div>
                    <div className="p-4">
                      <label className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:border-[#2F855A] dark:hover:border-[#2F855A] transition-colors cursor-pointer group bg-gray-50/50 dark:bg-gray-800/30">
                        <div className="space-y-2 text-center">
                          <ImageIcon className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#2F855A] transition-colors" />
                          <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                            <span className="font-medium text-[#2F855A] hover:text-green-600 cursor-pointer">
                              Upload visual evidence
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">JPG, PNG up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {cropImages.length > 0 && (
                        <div className="mt-4 flex gap-4 overflow-x-auto pb-1">
                          {cropImages.map((image, index) => (
                            <div key={index} className="relative group flex-shrink-0 w-24 h-24">
                              <Image
                                src={image}
                                alt={`Crop image ${index + 1}`}
                                width={96}
                                height={96}
                                className="object-cover pointer-events-none group-hover:opacity-75 w-24 h-24 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                              />
                              <button
                                onClick={() => handleImageRemove(index)}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 focus:outline-none"
                                type="button"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Soil and Weather Uploads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Soil Report */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Layers className="w-5 h-5 text-[#C05621]" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">2. Soil Report/Photos</span>
                        </div>
                      </div>
                      <label className="p-4 flex flex-col items-center justify-center text-center h-28 cursor-pointer group">
                        <div className="rounded-full bg-orange-50 dark:bg-orange-900/20 p-2 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-[#C05621]" />
                        </div>
                        <span className="text-xs text-gray-500 mt-2 font-medium">Upload PDF or Soil Photo</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">Nutrient Analysis</span>
                        <input type="file" accept=".pdf,image/*" className="hidden" />
                      </label>
                    </div>

                    {/* Weather & Sky */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">3. Weather & Sky</span>
                        </div>
                      </div>
                      <label className="p-4 flex flex-col items-center justify-center text-center h-28 cursor-pointer group">
                        <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-xs text-gray-500 mt-2 font-medium">Upload Sky Conditions</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">Atmospheric Risk</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Crop & Environmental Details */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#2F855A]" />
                    Crop & Environmental Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Crop Type */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Crop Type
                      </Label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Sprout className="w-5 h-5 text-gray-400" />
                        </div>
                        <Select value={cropType} onValueChange={setCropType}>
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Corn (Maize)">Corn (Maize)</SelectItem>
                            <SelectItem value="Wheat">Wheat</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                            <SelectItem value="Soybean">Soybean</SelectItem>
                            <SelectItem value="Tomato">Tomato</SelectItem>
                            <SelectItem value="Potato">Potato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Growth Stage */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="growth-stage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Growth Stage
                      </Label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Select value={growthStage} onValueChange={setGrowthStage}>
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select growth stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Seedling">Seedling</SelectItem>
                            <SelectItem value="Vegetative">Vegetative</SelectItem>
                            <SelectItem value="Flowering">Flowering</SelectItem>
                            <SelectItem value="Fruiting">Fruiting</SelectItem>
                            <SelectItem value="Maturation">Maturation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="sm:col-span-6">
                      <Label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Farm Location
                      </Label>
                      <div className="flex rounded-md shadow-sm">
                        <div className="relative flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                          <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Start typing address or coordinates..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="rounded-none rounded-l-md pl-10"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLocationDetect}
                          className="-ml-px rounded-none rounded-r-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Locate Me
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Run Analysis Button */}
                  <div className="flex justify-end pt-4">
                    <Link href="/diagnosis/report">
                      <Button
                        type="button"
                        className="bg-[#2F855A] hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-sm transition-all transform hover:scale-105"
                      >
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Run Comprehensive Analysis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Agricultural Tips */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#C05621]" />
                    Agricultural Tips: Tomato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800/30 hover:shadow-md transition-all cursor-default group">
                    <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm group-hover:bg-[#2F855A] transition-colors">
                      <Scissors className="w-5 h-5 text-[#2F855A] group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Proper Tomato Pruning</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                        Remove suckers from leaf axils to direct energy toward fruit and improve airflow.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800/30 hover:shadow-md transition-all cursor-default group">
                    <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm group-hover:bg-[#C05621] transition-colors">
                      <Thermometer className="w-5 h-5 text-[#C05621] group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Optimal Soil Temperature</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                        Tomatoes thrive in soil between 21-29°C. Use organic mulch to help regulate root temperature.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-all cursor-default group">
                    <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm group-hover:bg-blue-500 transition-colors">
                      <Droplets className="w-5 h-5 text-blue-500 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Consistent Watering</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                        Maintain even moisture to prevent blossom end rot and fruit cracking during fruit set.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alert */}
              <Card className="bg-gradient-to-br from-[#2F855A] to-green-800 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <h4 className="text-sm font-medium opacity-90 mb-2">Local Weather Alert</h4>
                <div className="flex items-center">
                  <CloudRain className="w-10 h-10 mr-3" />
                  <div>
                    <p className="text-xl font-bold">Heavy Rain</p>
                    <p className="text-xs opacity-80">Expected in 2 hours</p>
                  </div>
                </div>
                <p className="mt-3 text-xs opacity-90 leading-relaxed">
                  High humidity following rain increases risk of fungal infections. Check drainage.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
