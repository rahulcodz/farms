"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Leaf,
  Sparkles,
  Droplets,
  Sprout,
  CheckCircle2,
  Heart,
  Users,
  Recycle,
  Globe,
  Share2,
  BarChart3,
  MessageCircle,
  Calculator,
} from "lucide-react"
import Image from "next/image"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A2E1A]">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-[#E8F5E9] overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Leaf className="w-[400px] h-[400px] text-[#2E7D32] select-none" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#1B5E20] font-semibold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Our Commitment to the Planet
              </div>
              <h1 className="font-[family-name:var(--font-merriweather)] text-5xl md:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight">
                Farming for a <br />
                <span className="text-[#2E7D32]">Sustainable Future</span>
              </h1>
              <p className="text-xl text-[#4B634B] mb-8 leading-relaxed">
                AgroAI isn't just about yields; it's about preserving our earth. We leverage AI to minimize
                environmental footprints while maximizing agricultural output.
              </p>
              <div className="flex flex-wrap gap-12">
                <div>
                  <div className="text-3xl font-bold text-[#2E7D32] mb-1">40%</div>
                  <div className="text-sm text-[#4B634B] font-medium uppercase tracking-wider">
                    Chemical Reduction
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0288D1] mb-1">25%</div>
                  <div className="text-sm text-[#4B634B] font-medium uppercase tracking-wider">Water Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#795548] mb-1">15k+</div>
                  <div className="text-sm text-[#4B634B] font-medium uppercase tracking-wider">
                    Acres Regenerated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Column Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Reducing Chemical Waste */}
              <div className="flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-[#2E7D32] mb-8">
                  <BarChart3 className="w-10 h-10" />
                </div>
                <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#1A2E1A] mb-4">
                  Reducing Chemical Waste
                </h3>
                <p className="text-[#4B634B] leading-relaxed mb-6">
                  Our precision diagnosis ensures pesticides and fertilizers are only applied where and when needed,
                  preventing runoff into local ecosystems.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                    Targeted spot-treatment plans
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                    Organic alternative recommendations
                  </li>
                </ul>
              </div>

              {/* Water Conservation */}
              <div className="flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0288D1] mb-8">
                  <Droplets className="w-10 h-10" />
                </div>
                <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#1A2E1A] mb-4">
                  Water Conservation
                </h3>
                <p className="text-[#4B634B] leading-relaxed mb-6">
                  Using real-time precision data, we help farmers optimize irrigation schedules, ensuring every drop of
                  water counts toward crop health.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#0288D1]" />
                    Evapotranspiration monitoring
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#0288D1]" />
                    Soil moisture intelligence
                  </li>
                </ul>
              </div>

              {/* Soil Regeneration */}
              <div className="flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#795548] mb-8">
                  <Sprout className="w-10 h-10" />
                </div>
                <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#1A2E1A] mb-4">
                  Soil Regeneration
                </h3>
                <p className="text-[#4B634B] leading-relaxed mb-6">
                  We promote practices that restore soil biodiversity and carbon sequestration, turning farms into
                  powerful tools against climate change.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#795548]" />
                    Cover crop guidance
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-[#1A2E1A]">
                    <CheckCircle2 className="w-5 h-5 text-[#795548]" />
                    No-till farming insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-[#FDFDFB]" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-[3rem] border-2 border-[#2E7D32] shadow-[0_10px_30px_-5px_rgba(46,125,50,0.2)] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-[#2E7D32]/10 text-[#2E7D32] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Community Sponsored
                </div>
              </div>
              <div className="relative z-10 text-center">
                <h2 className="font-[family-name:var(--font-merriweather)] text-4xl md:text-5xl font-bold text-[#1A2E1A] mb-6">
                  AgroAI is Free for Everyone
                </h2>
                <p className="text-[#4B634B] text-lg mb-12 max-w-2xl mx-auto">
                  Our mission is to democratize precision agriculture. No subscriptions, no hidden fees—just
                  professional agricultural intelligence for every farmer on earth.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <Card className="p-6 rounded-2xl bg-[#FDFDFB] border border-gray-100 flex flex-col items-center">
                    <BarChart3 className="w-10 h-10 text-[#2E7D32] mb-4" />
                    <h4 className="font-bold text-[#1A2E1A] mb-2">Unlimited Diagnosis</h4>
                    <p className="text-sm text-[#4B634B]">Analyze as many crops as you need, whenever you need, with no limits.</p>
                  </Card>
                  <Card className="p-6 rounded-2xl bg-[#FDFDFB] border border-gray-100 flex flex-col items-center">
                    <MessageCircle className="w-10 h-10 text-[#2E7D32] mb-4" />
                    <h4 className="font-bold text-[#1A2E1A] mb-2">Expert Chat</h4>
                    <p className="text-sm text-[#4B634B]">Direct 24/7 access to our AI-powered agronomist for instant advice.</p>
                  </Card>
                  <Card className="p-6 rounded-2xl bg-[#FDFDFB] border border-gray-100 flex flex-col items-center">
                    <Calculator className="w-10 h-10 text-[#2E7D32] mb-4" />
                    <h4 className="font-bold text-[#1A2E1A] mb-2">Cost Estimator</h4>
                    <p className="text-sm text-[#4B634B]">Get precise budget plans and localized pricing for all treatments.</p>
                  </Card>
                </div>
                <Link href="/diagnosis">
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg transform hover:-translate-y-1">
                    Get Started For Free
                  </Button>
                </Link>
                <p className="mt-8 text-sm text-[#4B634B] font-medium">
                  Join over 50,000 farmers worldwide growing sustainably with AgroAI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white" id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold text-[#1A2E1A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#4B634B] text-lg">Quick answers to common questions about our platform and mission.</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4" defaultValue="item-1">
              <AccordionItem
                value="item-1"
                className="bg-[#FDFDFB] rounded-2xl border border-gray-100 hover:border-[#2E7D32]/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-[#1A2E1A]">
                  How accurate is the AI?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-[#4B634B] leading-relaxed">
                  Our AI models are trained on over 50 million labeled agricultural data points and verified by
                  certified agronomists. We maintain a 98.4% accuracy rate for major crop diseases when provided with
                  high-quality images.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-[#FDFDFB] rounded-2xl border border-gray-100 hover:border-[#2E7D32]/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-[#1A2E1A]">
                  What crops are supported?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-[#4B634B] leading-relaxed">
                  AgroAI currently supports over 120 different crops including cereals (corn, wheat, rice), legumes,
                  fruits, vegetables, and specialized cash crops like coffee and cocoa. We are constantly expanding our
                  database.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-[#FDFDFB] rounded-2xl border border-gray-100 hover:border-[#2E7D32]/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-[#1A2E1A]">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-[#4B634B] leading-relaxed">
                  Absolutely. Your data privacy is our priority. All information is encrypted and we do not sell
                  individual farmer data. Aggregated, anonymous data is used only to improve the AI models for the
                  benefit of the global farming community.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-[#FDFDFB] rounded-2xl border border-gray-100 hover:border-[#2E7D32]/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-[#1A2E1A]">
                  How can it be free forever?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-[#4B634B] leading-relaxed">
                  We are supported by a consortium of international agricultural NGOs and philanthropic foundations
                  committed to global food security. Their funding allows us to provide professional tools to every
                  farmer regardless of scale.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Eco-Friendly Farming Practices */}
        <section className="py-24 bg-[#2E7D32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <h2 className="font-[family-name:var(--font-merriweather)] text-4xl font-bold mb-6">
                  Eco-Friendly Farming Practices
                </h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  We don't just solve problems; we build resilience. Our AI recommends nature-based solutions that work
                  with the environment rather than against it.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Crop Diversification</h4>
                      <p className="text-white/70">Intelligent rotation plans to naturally manage pests and improve soil health.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Integrated Pest Management</h4>
                      <p className="text-white/70">
                        Biological controls and early warning systems to reduce chemical dependency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    alt="Sustainable Farming"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgA4-CfNDOUoGzOeTyCdpjo-q5LKbENhJhsGEXZ30y16A7sRIrgTzHpr1UJSHiIgmObCRcm7oOBldw3G0qKCB0FBjHaf4P5oxJPPid21hFraS0-1CIuE6qTb9Y2qzhqyX3mI54FUOFOuOPLuKa9wHAt_QnebyanyjZ3qA7ieq14pHxN3voXe6tKZ-MrI6SYDK6VU_BLl_vMdPRfm5K5gHBomjLJCMg6nHbcH77-8eKXc16yoZpimak4lm_DT-lQTQri3OE62NHj_-J"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4 text-[#2E7D32]">
                    <Sparkles className="w-10 h-10" />
                    <div>
                      <div className="text-2xl font-bold text-[#1A2E1A]">100%</div>
                      <div className="text-xs text-[#4B634B] uppercase font-bold tracking-tighter">
                        Carbon Neutral Platform
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}