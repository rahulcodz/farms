"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, Share2, Globe } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-8 h-8 text-[#2E7D32]" />
              <span className="font-[family-name:var(--font-merriweather)] font-bold text-2xl text-[#1A2E1A]">AgroAI</span>
            </div>
            <p className="text-[#4B634B] text-sm leading-relaxed mb-8">
              Empowering farmers globally with the next generation of AI-driven precision agriculture. Free, forever.
            </p>
            <div className="flex gap-4">
              <Link 
                href="#" 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#4B634B] hover:text-[#2E7D32] transition-colors shadow-sm"
              >
                <Share2 className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#4B634B] hover:text-[#2E7D32] transition-colors shadow-sm"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h6 className="font-bold text-[#1A2E1A] mb-6">Product</h6>
            <ul className="space-y-4 text-sm text-[#4B634B]">
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  AI Diagnosis
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Expert Network
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Soil Analysis
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#2E7D32] transition-colors">
                  Always Free
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="font-bold text-[#1A2E1A] mb-6">Company</h6>
            <ul className="space-y-4 text-sm text-[#4B634B]">
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="font-bold text-[#1A2E1A] mb-6">Resources</h6>
            <ul className="space-y-4 text-sm text-[#4B634B]">
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Farming Guide
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#2E7D32] transition-colors">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2E7D32] transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h6 className="font-bold text-[#1A2E1A] mb-4">Join our Newsletter</h6>
            <p className="text-[#4B634B] text-sm mb-6">Get seasonal farming tips and AI updates.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] transition-all outline-none"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#4B634B]">
          <p>© {currentYear} AgroAI. Helping farmers grow better. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#2E7D32] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#2E7D32] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}