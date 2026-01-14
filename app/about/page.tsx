"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Leaf,
  Lightbulb,
  DollarSign,
  Users,
  Trees,
  Droplets,
  Building2,
  Globe,
  FlaskConical,
  Share2,
} from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A2E1A]">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Diverse farmers in field"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrttrurBXIRTLt-qUw2YzkwBmgwt6rhz3PXKi1MSFRHIv0dEeRUd4qDtmijLn4u6EyF2Y-MznKls_RgfKQuRafFuZTTXSK7yBx5Ur6cNAtq-dwFeyqJPHQjeSldeDpdjIHPQ-kqVdhwS0rMz6lU89jQ0TlbF92oZSI4J3xY5NHTYof_yLJLLK06ant8MCmmJykmTsUKMKRIysVlVVRDZCur-eurf6V-gNyhUcY9bfqoUKam72dLdcRF4-2wUUWvTyt7TQJ7xOU8Xhm"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#1A2E1A]/80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-[family-name:var(--font-merriweather)] text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our Mission: <br />
              Empowering Farmers with AI
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
              Bridging the technology gap to ensure sustainable food security for the global community.
            </p>
          </div>
        </section>

        {/* Bridging the Gap Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-merriweather)] text-4xl font-bold text-[#1A2E1A] mb-8">
                  Bridging the Gap
                </h2>
                <div className="space-y-6 text-[#4B634B] text-lg leading-relaxed">
                  <p>
                    AgroAI began with a simple observation: while industrial agriculture was being transformed by
                    high-tech sensors and AI, small-scale farmers—who produce 80% of the world's food—were being left
                    behind.
                  </p>
                  <p>
                    Founded by a team of agronomists and AI researchers, we set out to build a platform that could
                    provide professional-grade insights through the devices farmers already own. Our journey started in
                    the heart of rural farming communities, listening to the challenges of crop disease and
                    unpredictable climate patterns.
                  </p>
                  <p>
                    Today, AgroAI stands as a beacon of innovation, dedicated to the belief that access to precision
                    agricultural knowledge is a fundamental right, not a luxury.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    alt="Farmers collaborating"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXv7LHCtr6XB6c2GZ7r38EPPKgQPHbvxNjJ8-qMTA8GUukHSIp2jn0IjH0pC5aIt5Fsog9C5h0M72YVLeqSKKqLtSYFA2fxx8xrFlAB2D6hculusnIN3LKujjcWIHdW3cd27kuWzh2VhabporUVpiuuxTPVH6dsCKO5tiyOsawZs5_L6IT_nGdmIV3uKDczMeQy5bGq9y4gvAV_hBCbhob9ziLbQnyNBe-5i0n7JCcDNm4TfYOWeuYTDyoUZOomjvcWK7_u4JGCKY5"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-[#2E7D32] p-8 rounded-2xl shadow-xl text-white max-w-xs hidden md:block">
                  <p className="text-3xl font-bold mb-1">2018</p>
                  <p className="text-sm opacity-90 uppercase tracking-wider font-semibold">The year it all started</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-[#FDFDFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold text-[#1A2E1A] mb-4">
                Our Core Values
              </h2>
              <p className="text-[#4B634B] text-lg max-w-2xl mx-auto">
                The principles that guide every decision we make and every line of code we write.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 text-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E1A] mb-4">Innovation</h3>
                <p className="text-[#4B634B]">
                  Pushing the boundaries of what's possible with computer vision and predictive analytics in the field.
                </p>
              </Card>

              <Card className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E1A] mb-4">Accessibility</h3>
                <p className="text-[#4B634B]">
                  Our platform is free for all farmers. We ensure that economic barriers never stand in the way of
                  healthy crops.
                </p>
              </Card>

              <Card className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2E1A] mb-4">Sustainability</h3>
                <p className="text-[#4B634B]">
                  Promoting practices that protect the earth while increasing yields for future generations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-[#2E7D32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50k+</div>
                <div className="text-white/80 uppercase tracking-widest text-sm font-semibold">Farmers Helped</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">12M+</div>
                <div className="text-white/80 uppercase tracking-widest text-sm font-semibold">Crops Saved</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">120+</div>
                <div className="text-white/80 uppercase tracking-widest text-sm font-semibold">Crop Varieties</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">35</div>
                <div className="text-white/80 uppercase tracking-widest text-sm font-semibold">Countries Reached</div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Experts Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold text-[#1A2E1A] mb-4">
                Meet the Experts
              </h2>
              <p className="text-[#4B634B] text-lg max-w-2xl mx-auto">
                A world-class team of scientists, engineers, and agronomists dedicated to the field.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    alt="Team member"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCH-irTzLsi4JUcKaxJuKj47_6RaCVaQpUW1roP-Tp2Y08xRG71ZdBoxZ8XEbTfSpjStj3JoD-_D9n6KnibbsqbfrLskTZPUOqDLqZBZxhC5UgMCdT1jMc2vLaL7rG0U1kSz0k1wzm5OwfI3yg8l7xn5r8FvkMkEm1WIiB-ZUvAlh_eDm_2_N_RCQ6xyRI4UlXDU7ego3F0pWRFrMFf3-BQqiXiMBfihfloFK8reAkDGQK09eTWwn1_z8ZEiaSnvLMK_EeYaOZqgsw"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1A2E1A]">Dr. Sarah Chen</h4>
                <p className="text-[#2E7D32] font-medium">Head of AI Research</p>
              </div>

              <div className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    alt="Team member"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwHBwBK9pggeGgGw2fy2uLsnSNa4-adUuTJDGhiRVx_wCPwpMiBkwZfC1zErdNaT9rDBkImcuC6rSJtGFzm5Su2dwfBHfPlz4V6VvVkonILXfBId5NedbjSkbcih6AGNDQ--foGBjeVkWRmxXGNOVh3ShAWY-d1Sp9IPMDSsDAr7OpQm937EBg3Js21PcB-i7WajjCir_vOe8aMJSaWm2jIlhWhe_jir1eeksG0y0ezdZAW9uhzSGhKsM5A_oiYZWTy1rbK5yyEbXy"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1A2E1A]">Marcus Thorne</h4>
                <p className="text-[#2E7D32] font-medium">Lead Agronomist</p>
              </div>

              <div className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    alt="Team member"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBj3leT-ds6F4gCuubDsHVuHk6W6APt0lcnEJYhCTHol497vWUlKrbGZwEpriYsTEEDnlpoeG6mE_RhxtJ3FbP7loieD22PReC9kM9ZoaYspuJPKWlX2ffQYtDeq-oCQaConbgS9qU_af7hw6CUMlOpqGUE9roOlxKrCRrcauOmPH6WtNbqP14xWoE4mdk-h_t5r-uhVoZH3g8Kg59X3Wcckskhy6p_2JEd6wXLxtWb88u1sxiA0ckmnX-hJqxhfi_C15Oyi5BUENr"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1A2E1A]">Elena Rodriguez</h4>
                <p className="text-[#2E7D32] font-medium">Community Outreach</p>
              </div>

              <div className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    alt="Team member"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLmeSJ5zJffW01F_IOPMeCNpcySKDAr-Xop2cETbUW5_kvpz_vVWv3fSb0t5VfVtHluzAEh12Mh_OZvCz__iydRXb2_3Et0XuoMpaBKiYMlBBydBXJOmWR3wgCYgIQeSPEtCG0PIT70Fbsn-CjM77PbAfZqBb7QU-SnJXSp8cSNAqC5fzbl1hmCUtyZ0Me_VKV2DudTQ04Vo1XnEHmV-LOJrBO_WD5M3f4cBo7C0TZtna4uAQNw0e1lujWRz4cEW72aT-lmIVvtex7"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1A2E1A]">David Kim</h4>
                <p className="text-[#2E7D32] font-medium">Backend Systems</p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported by Trusted Organizations */}
        <section className="py-24 bg-[#FDFDFB] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-[#4B634B] font-bold uppercase tracking-widest text-xs mb-12">
              Supported by Trusted Organizations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-50 grayscale transition-all hover:opacity-100">
              <div className="flex items-center gap-2">
                <Trees className="w-8 h-8 text-[#2E7D32]" />
                <span className="font-bold text-lg">BioGrowth</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-8 h-8 text-[#2E7D32]" />
                <span className="font-bold text-lg">AquaFarms</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-[#2E7D32]" />
                <span className="font-bold text-lg">GlobalSeed</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-8 h-8 text-[#2E7D32]" />
                <span className="font-bold text-lg">EarthWatch</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-8 h-8 text-[#2E7D32]" />
                <span className="font-bold text-lg">AgroLab</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}