"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Speech Recognition Types
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition
    }
    webkitSpeechRecognition: {
      new (): SpeechRecognition
    }
  }
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Mic,
  MicOff,
  Square,
} from "lucide-react"
import Image from "next/image"

export default function DiagnosisPage() {
  const [cropImages, setCropImages] = useState<string[]>([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAl70oMuL2YoLSM4f8cx8UfD7MZ4Tx6s4lHz4g6forB71wXqzeJdMVjdAktLmmHzjkRggLb8lK-9VUrZKNwa3eqNmtZ6fRw0GHEciVGLgZd90zwhPwaep1w-sj24vEjBFDS53un7IO8EucxvcTd8ZdzcTxDq_DFuU89u4J4Iovl9FIl3rdvcyCZoOSMx_8NNnqAYVm0uXYU-6dVHQcCfetd8hiVCDdiLTQ0K-1zLUcDBgEQotIMsqQOB0sk1N1ZCWlE6rdtX5JBS4Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuVGZW3lvFtlDKoK3NALUukQOLqX8PTh6DwjVwkIbRoqFfkcOmdZYzTnEx8kj9PMQkLDyFsyyVRKBiVOpGaDiIeRNwvYcQzlesw6t1lte2pC9CzdfOr15HjMPoLp9VWRo7NXn67L-SHkGPCCfaU3cz6RSNUAyEWlAndfBJ1SSj46PlSAKfJcQ_XLPAPrPuOvPobCyFPvEF-NByka87StvDeW6BKx-UCJYsjSgMKwAw607sNjeGKfr9AfKEZH-wJux9iCXa7Z6VDDs",
  ])
  const [cropType, setCropType] = useState("Tomato")
  const [customCropType, setCustomCropType] = useState("")
  const [growthStage, setGrowthStage] = useState("")
  const [customGrowthStage, setCustomGrowthStage] = useState("")
  const [location, setLocation] = useState("Ames, Iowa, USA")
  const [soilCondition, setSoilCondition] = useState("")
  const [customSoilCondition, setCustomSoilCondition] = useState("")
  const [weatherCondition, setWeatherCondition] = useState("")
  const [customWeatherCondition, setCustomWeatherCondition] = useState("")
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState("")
  const [description, setDescription] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

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

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognitionClass) {
        const recognitionInstance = new SpeechRecognitionClass()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        recognitionInstance.lang = "en-US"

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcript = result[0].transcript
            if (result.isFinal) {
              finalTranscript += transcript + " "
            } else {
              interimTranscript += transcript
            }
          }

          setDescription((prev) => {
            const baseText = prev.replace(interimTranscript, "")
            return baseText + finalTranscript + interimTranscript
          })
        }

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error)
          if (event.error === "no-speech" || event.error === "aborted") {
            setIsRecording(false)
          }
        }

        recognitionInstance.onend = () => {
          setIsRecording(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [])

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const startRecording = () => {
    if (recognition) {
      try {
        recognition.start()
        setIsRecording(true)
      } catch (error) {
        console.error("Error starting recording:", error)
      }
    } else {
      alert("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.")
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      setIsRecording(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <main className="flex-grow py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white font-[family-name:var(--font-merriweather)] mb-3 sm:mb-4">
                Comprehensive Multi-Factor Diagnosis
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Upload multi-modal data including crop visuals, soil reports, and environmental context for maximum AI analysis accuracy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Evidence Sources */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-base sm:text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <Upload className="w-5 h-5 text-[#2F855A] flex-shrink-0" />
                      Evidence Sources
                    </CardTitle>
                    <span className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2.5 py-0.5 rounded-full w-fit">
                      Step 1 of 3
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Crop Images */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-[#2F855A] flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">1. Crop Images</span>
                      </div>
                      <span className="text-xs text-gray-500">Visual Disease Detection</span>
                    </div>
                    <div className="p-4 sm:p-6">
                      <label className="flex justify-center px-4 sm:px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:border-[#2F855A] dark:hover:border-[#2F855A] transition-colors cursor-pointer group bg-gray-50/50 dark:bg-gray-800/30">
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
                        <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                          {cropImages.map((image, index) => (
                            <div key={index} className="relative group flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                              <Image
                                src={image}
                                alt={`Crop image ${index + 1}`}
                                width={96}
                                height={96}
                                className="object-cover pointer-events-none group-hover:opacity-75 w-full h-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                              />
                              <button
                                onClick={() => handleImageRemove(index)}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 focus:outline-none transition-colors"
                                type="button"
                                aria-label="Remove image"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Soil Report */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-5 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <Layers className="w-5 h-5 text-[#C05621] flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">2. Soil Report/Photos</span>
                        </div>
                      </div>
                      <label className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px] cursor-pointer group">
                        <div className="rounded-full bg-orange-50 dark:bg-orange-900/20 p-2.5 sm:p-3 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[#C05621]" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Upload PDF or Soil Photo</span>
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-1">Nutrient Analysis</span>
                        <input type="file" accept=".pdf,image/*" className="hidden" />
                      </label>
                    </div>

                    {/* Weather & Sky */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-5 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">3. Weather & Sky</span>
                        </div>
                      </div>
                      <label className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px] cursor-pointer group">
                        <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2.5 sm:p-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Upload Sky Conditions</span>
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-1">Atmospheric Risk</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Crop & Environmental Details */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#2F855A] flex-shrink-0" />
                    Crop & Environmental Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Crop Type */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Crop Type
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Sprout className="w-5 h-5 text-gray-400" />
                        </div>
                        <Select 
                          value={cropType} 
                          onValueChange={(value) => {
                            setCropType(value)
                            if (value !== "Other") setCustomCropType("")
                          }}
                        >
                          <SelectTrigger className="pl-10 w-full h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tomato">Tomato</SelectItem>
                            <SelectItem value="Potato">Potato</SelectItem>
                            <SelectItem value="Corn (Maize)">Corn (Maize)</SelectItem>
                            <SelectItem value="Wheat">Wheat</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                            <SelectItem value="Soybean">Soybean</SelectItem>
                            <SelectItem value="Cotton">Cotton</SelectItem>
                            <SelectItem value="Barley">Barley</SelectItem>
                            <SelectItem value="Oats">Oats</SelectItem>
                            <SelectItem value="Sorghum">Sorghum</SelectItem>
                            <SelectItem value="Pepper">Pepper</SelectItem>
                            <SelectItem value="Cucumber">Cucumber</SelectItem>
                            <SelectItem value="Lettuce">Lettuce</SelectItem>
                            <SelectItem value="Carrot">Carrot</SelectItem>
                            <SelectItem value="Onion">Onion</SelectItem>
                            <SelectItem value="Cabbage">Cabbage</SelectItem>
                            <SelectItem value="Broccoli">Broccoli</SelectItem>
                            <SelectItem value="Cauliflower">Cauliflower</SelectItem>
                            <SelectItem value="Spinach">Spinach</SelectItem>
                            <SelectItem value="Beans">Beans</SelectItem>
                            <SelectItem value="Peas">Peas</SelectItem>
                            <SelectItem value="Sunflower">Sunflower</SelectItem>
                            <SelectItem value="Canola">Canola</SelectItem>
                            <SelectItem value="Sugar Beet">Sugar Beet</SelectItem>
                            <SelectItem value="Other">Other (Specify)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {cropType === "Other" && (
                        <Input
                          placeholder="Enter crop type..."
                          value={customCropType}
                          onChange={(e) => setCustomCropType(e.target.value)}
                          className="mt-2 h-11"
                        />
                      )}
                    </div>

                    {/* Growth Stage */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="growth-stage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Growth Stage
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Select 
                          value={growthStage} 
                          onValueChange={(value) => {
                            setGrowthStage(value)
                            if (value !== "Other") setCustomGrowthStage("")
                          }}
                        >
                          <SelectTrigger className="pl-10 w-full h-11">
                            <SelectValue placeholder="Select growth stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Germination">Germination</SelectItem>
                            <SelectItem value="Seedling">Seedling</SelectItem>
                            <SelectItem value="Vegetative">Vegetative</SelectItem>
                            <SelectItem value="Flowering">Flowering</SelectItem>
                            <SelectItem value="Fruiting">Fruiting</SelectItem>
                            <SelectItem value="Maturation">Maturation</SelectItem>
                            <SelectItem value="Harvest">Harvest</SelectItem>
                            <SelectItem value="Post-Harvest">Post-Harvest</SelectItem>
                            <SelectItem value="Other">Other (Specify)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {growthStage === "Other" && (
                        <Input
                          placeholder="Enter growth stage..."
                          value={customGrowthStage}
                          onChange={(e) => setCustomGrowthStage(e.target.value)}
                          className="mt-2 h-11"
                        />
                      )}
                    </div>

                    {/* Location */}
                    <div className="sm:col-span-6">
                      <Label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Farm Location
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <div className="relative flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                          <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Start typing address or coordinates..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-10 sm:rounded-none sm:rounded-l-md h-11"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLocationDetect}
                          className="sm:-ml-px sm:rounded-none sm:rounded-r-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 h-11"
                        >
                          <Navigation className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Locate Me</span>
                          <span className="sm:hidden">Locate</span>
                        </Button>
                      </div>
                    </div>

                    {/* Soil Condition */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="soil-condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Soil Condition
                      </Label>
                      <Select 
                        value={soilCondition} 
                        onValueChange={(value) => {
                          setSoilCondition(value)
                          if (value !== "Other") setCustomSoilCondition("")
                        }}
                      >
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select soil condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Well-drained">Well-drained</SelectItem>
                          <SelectItem value="Clay">Clay</SelectItem>
                          <SelectItem value="Sandy">Sandy</SelectItem>
                          <SelectItem value="Loamy">Loamy</SelectItem>
                          <SelectItem value="Silty">Silty</SelectItem>
                          <SelectItem value="Waterlogged">Waterlogged</SelectItem>
                          <SelectItem value="Dry">Dry</SelectItem>
                          <SelectItem value="Other">Other (Specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      {soilCondition === "Other" && (
                        <Input
                          placeholder="Enter soil condition..."
                          value={customSoilCondition}
                          onChange={(e) => setCustomSoilCondition(e.target.value)}
                          className="mt-2 h-11"
                        />
                      )}
                    </div>

                    {/* Weather Condition */}
                    <div className="sm:col-span-3">
                      <Label htmlFor="weather-condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recent Weather
                      </Label>
                      <Select 
                        value={weatherCondition} 
                        onValueChange={(value) => {
                          setWeatherCondition(value)
                          if (value !== "Other") setCustomWeatherCondition("")
                        }}
                      >
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select weather condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sunny">Sunny</SelectItem>
                          <SelectItem value="Cloudy">Cloudy</SelectItem>
                          <SelectItem value="Rainy">Rainy</SelectItem>
                          <SelectItem value="Humid">Humid</SelectItem>
                          <SelectItem value="Dry">Dry</SelectItem>
                          <SelectItem value="Windy">Windy</SelectItem>
                          <SelectItem value="Frost">Frost</SelectItem>
                          <SelectItem value="Drought">Drought</SelectItem>
                          <SelectItem value="Other">Other (Specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      {weatherCondition === "Other" && (
                        <Input
                          placeholder="Enter weather condition..."
                          value={customWeatherCondition}
                          onChange={(e) => setCustomWeatherCondition(e.target.value)}
                          className="mt-2 h-11"
                        />
                      )}
                    </div>

                    {/* Description Textarea with Voice Recording */}
                    <div className="sm:col-span-6">
                      <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Description
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-normal">
                          (Optional - Describe symptoms, observations, or concerns)
                        </span>
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe any symptoms, observations, or concerns about your crops. You can type or use the microphone to record your description..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={5}
                          className="w-full px-4 py-3 pr-24 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2F855A] focus:border-[#2F855A] transition-all resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          {isRecording && (
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                              <span className="text-xs font-medium">{formatTime(recordingTime)}</span>
                            </div>
                          )}
                          {isRecording ? (
                            <Button
                              type="button"
                              onClick={stopRecording}
                              className="h-9 w-9 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
                              title="Stop Recording"
                            >
                              <Square className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              onClick={startRecording}
                              disabled={!recognition}
                              className="h-9 w-9 p-0 bg-[#2F855A] hover:bg-[#1B5E20] text-white rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Start Voice Recording"
                            >
                              <Mic className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      {!recognition && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                          Voice recording requires Chrome, Edge, or Safari browser
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Run Analysis Button */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link href="/diagnosis/report" className="w-full sm:w-auto">
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-[#2F855A] hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl shadow-sm transition-all transform hover:scale-105"
                      >
                        <BarChart3 className="w-5 h-5 mr-2" />
                        <span className="hidden sm:inline">Run Comprehensive Analysis</span>
                        <span className="sm:hidden">Run Analysis</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              {/* Agricultural Tips */}
              <Card className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#C05621] flex-shrink-0" />
                    <span className="text-sm sm:text-base">Agricultural Tips: Tomato</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
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
              <Card className="bg-gradient-to-br from-[#2F855A] to-green-800 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-5 sm:p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <h4 className="text-xs sm:text-sm font-medium opacity-90 mb-3">Local Weather Alert</h4>
                <div className="flex items-center gap-3 mb-3">
                  <CloudRain className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                  <div>
                    <p className="text-lg sm:text-xl font-bold">Heavy Rain</p>
                    <p className="text-xs opacity-80">Expected in 2 hours</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
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
