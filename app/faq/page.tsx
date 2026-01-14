"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Rocket,
  Brain,
  Shield,
  Pill,
  HelpCircle,
  MessageCircle,
  Mail,
  Globe,
  Monitor,
  Radio,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  FileCheck,
} from "lucide-react"
import Image from "next/image"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [question, setQuestion] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: File[]) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`)
      } else if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        validFiles.push(file)
      } else {
        invalidFiles.push(`${file.name} (unsupported file type)`)
      }
    })

    if (invalidFiles.length > 0) {
      alert(
        `Some files were not added:\n${invalidFiles.join("\n")}\n\nPlease upload images or videos under 5MB.`
      )
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-[#F0FDF4] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[10%] w-96 h-96 bg-[#2E7D32] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-[#2E7D32] rounded-full blur-[120px]"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="font-[family-name:var(--font-merriweather)] text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How can we help you?
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Search through our frequently asked questions or browse categories to find the answers you need for your
              farm.
            </p>
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Question Submission Form */}
              <Card className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ask Your Question</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    console.log("Question:", question, "Files:", files)
                    // Clean up object URLs
                    files.forEach((file) => {
                      const previewUrl = URL.createObjectURL(file)
                      URL.revokeObjectURL(previewUrl)
                    })
                    // Handle form submission
                    setQuestion("")
                    setFiles([])
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Textarea
                      placeholder="Describe your question or issue in detail..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] transition-all outline-none resize-none text-gray-800 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* File Upload Area */}
                  <div>
                    <label
                      htmlFor="file-upload"
                      className={`block w-full p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                        dragActive
                          ? "border-[#2E7D32] bg-green-50"
                          : "border-gray-300 hover:border-[#2E7D32] hover:bg-gray-50"
                      }`}
                      onDragEnter={(e) => {
                        e.preventDefault()
                        setDragActive(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        setDragActive(false)
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        setDragActive(false)
                        const droppedFiles = Array.from(e.dataTransfer.files)
                        handleFileSelect(droppedFiles)
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleFileSelect(Array.from(e.target.files))
                          }
                        }}
                        className="hidden"
                      />
                      <div className="text-center">
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                            <Upload className="w-6 h-6 text-[#2E7D32]" />
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Drag and drop files here, or{" "}
                          <span className="text-[#2E7D32] hover:underline">browse</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Upload images or videos (max 5MB per file)
                        </p>
                      </div>
                    </label>

                    {/* File Preview */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => {
                          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
                          const isImage = file.type.startsWith("image/")
                          const isVideo = file.type.startsWith("video/")
                          const previewUrl = URL.createObjectURL(file)

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                            >
                              <div className="flex-shrink-0">
                                {isImage ? (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                                    <Image
                                      src={previewUrl}
                                      alt={file.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : isVideo ? (
                                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Video className="w-6 h-6 text-blue-600" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <FileCheck className="w-6 h-6 text-gray-600" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {fileSizeMB} MB {isImage && "• Image"} {isVideo && "• Video"}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newFiles = files.filter((_, i) => i !== index)
                                  setFiles(newFiles)
                                  URL.revokeObjectURL(previewUrl)
                                }}
                                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-xl font-bold transition-all shadow-lg"
                  >
                    Submit Question
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Category Cards */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="#getting-started"
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(46,125,50,0.1)] hover:border-[#2E7D32]/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32] mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Setup your account and run your first diagnosis.</p>
            </Link>

            <Link
              href="#ai-accuracy"
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(46,125,50,0.1)] hover:border-[#2E7D32]/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI & Accuracy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Learn about our technology and how we analyze crops.</p>
            </Link>

            <Link
              href="#privacy"
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(46,125,50,0.1)] hover:border-[#2E7D32]/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Privacy & Data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">How we protect your farm data and personal info.</p>
            </Link>

            <Link
              href="#treatment"
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(46,125,50,0.1)] hover:border-[#2E7D32]/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Pill className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Treatment Plans</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Guidance on following AI-prescribed recovery paths.</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-8 bg-[#2E7D32] rounded-full"></div>
              <h2 className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-gray-900">
                General Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4" defaultValue="item-1">
              <AccordionItem
                value="item-1"
                className="bg-gray-50 rounded-2xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-gray-900 hover:no-underline">
                  How do I upload multiple images?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>
                    To upload multiple images, simply click the "Diagnosis" button and select all relevant photos of the
                    affected crop area. You can drag and drop multiple files at once or select multiple items from your
                    gallery. Providing photos from different angles and distances (close-up and whole-plant) helps our AI
                    deliver a more accurate diagnosis.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-gray-50 rounded-2xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-gray-900 hover:no-underline">
                  Is the AI diagnosis 100% accurate?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>
                    While our AI has an accuracy rate of over 95% across 50+ crop types, it is intended to be a
                    decision-support tool. Environmental factors and photo quality can affect results. We always display
                    a confidence score with every report. For critical industrial decisions, we recommend consulting one
                    of our certified agronomists through the "Expert Chat" feature.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-gray-50 rounded-2xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-gray-900 hover:no-underline">
                  How is my farm data used?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>
                    Your data is used strictly to provide you with insights and to improve our model's accuracy for your
                    specific region. We do not sell your personal farm data to third parties. All location data is
                    anonymized when used for regional disease mapping to help neighboring farmers stay alert about
                    potential outbreaks.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-gray-50 rounded-2xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-gray-900 hover:no-underline">
                  What happens if I don't follow the treatment plan?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>
                    The treatment plans are optimized based on the severity and spread rate of the detected issue.
                    Delaying or ignoring the plan may result in irreversible yield loss or the spread of pathogens to
                    healthy crops. If you find a treatment too expensive or difficult to implement, use the Expert Chat
                    to discuss alternative organic or cost-effective management strategies.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-gray-50 rounded-2xl border-none"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-gray-900 hover:no-underline">
                  Can I use AgroAI without an internet connection?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                  <p>
                    You can capture photos offline using our mobile app. The diagnosis will be processed as soon as your
                    device reconnects to a network. We are currently working on an "Edge" version that will allow offline
                    diagnosis for select common diseases.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#F0FDF4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6">
              <HelpCircle className="w-8 h-8 text-[#2E7D32]" />
            </div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our support team and expert agronomists are here to help you
              around the clock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}