"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Globe } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Leaf className="w-8 h-8 text-[#2E7D32]" />
              <span className="font-[family-name:var(--font-merriweather)] font-bold text-2xl text-[#1A2E1A] tracking-tight">AgroAI</span>
            </Link>
            <div className="hidden lg:flex space-x-8">
              <Link 
                href="/diagnosis" 
                className={cn(
                  "text-[#4B634B] hover:text-[#2E7D32] transition-colors font-medium text-sm",
                  pathname === "/diagnosis" && "text-[#2E7D32]"
                )}
              >
                Diagnosis
              </Link>
              <Link 
                href="#" 
                className={cn(
                  "text-[#4B634B] hover:text-[#2E7D32] transition-colors font-medium text-sm",
                  pathname === "/chat" && "text-[#2E7D32]"
                )}
              >
                Expert Chat
              </Link>
              <Link 
                href="#pricing" 
                className={cn(
                  "text-[#4B634B] hover:text-[#2E7D32] transition-colors font-medium text-sm",
                  pathname === "/pricing" && "text-[#2E7D32]"
                )}
              >
                Always Free
              </Link>
              <Link 
                href="#faq" 
                className={cn(
                  "text-[#4B634B] hover:text-[#2E7D32] transition-colors font-medium text-sm",
                  pathname === "/faq" && "text-[#2E7D32]"
                )}
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Select defaultValue="en">
                <SelectTrigger className="appearance-none bg-transparent border-none text-[#4B634B] text-sm font-medium focus:ring-0 cursor-pointer pr-8 pl-6 w-auto">
                  <div className="absolute left-0 pointer-events-none">
                <Globe className="w-4 h-4" />
              </div>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link href="/diagnosis">
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_10px_30px_-5px_rgba(46,125,50,0.2)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}