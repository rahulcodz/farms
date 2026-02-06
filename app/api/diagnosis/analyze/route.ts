import { NextRequest, NextResponse } from "next/server"

// Helper function to convert File to base64
async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")
  return `data:${file.type};base64,${base64}`
}

// Helper function to extract location components
function parseLocation(location: string): { city?: string; state?: string; country?: string; region?: string } {
  const parts = location.split(',').map(p => p.trim())
  const result: { city?: string; state?: string; country?: string; region?: string } = {}
  
  if (parts.length >= 1) result.city = parts[0]
  if (parts.length >= 2) result.state = parts[1]
  if (parts.length >= 3) result.country = parts[2]
  
  // Determine region based on state/country
  if (result.state) {
    result.region = result.state
  } else if (result.country) {
    result.region = result.country
  }
  
  return result
}

// Helper function to get regional soil characteristics
function getRegionalSoilData(location: string): string {
  const loc = parseLocation(location)
  const region = loc.state || loc.country || location.toLowerCase()
  
  // Common regional soil characteristics database
  const regionalSoilData: Record<string, string> = {
    // US States
    'iowa': 'Iowa soils are predominantly Mollisols (prairie soils) with high organic matter (3-5%), well-drained, pH 6.0-7.5. Common soil types: Clarion-Nicollet-Webster series (loamy), Tama series (silty clay loam). Typical nutrient levels: N 120-180 ppm, P 15-30 ppm, K 150-250 ppm. High cation exchange capacity (CEC) 15-25 meq/100g.',
    'illinois': 'Illinois soils are primarily Mollisols with high fertility, organic matter 3-6%, pH 6.2-7.2. Common types: Drummer silty clay loam, Flanagan silt loam. Typical nutrients: N 100-200 ppm, P 20-40 ppm, K 180-300 ppm. CEC 18-28 meq/100g.',
    'indiana': 'Indiana soils are mostly Alfisols and Mollisols, well-drained, organic matter 2-5%, pH 6.0-7.0. Common: Miami silt loam, Crosby silt loam. Nutrients: N 110-170 ppm, P 18-35 ppm, K 160-280 ppm. CEC 16-24 meq/100g.',
    'ohio': 'Ohio soils are primarily Alfisols, well-drained, organic matter 2-4%, pH 6.2-7.0. Common: Hoytville clay loam, Canfield silt loam. Nutrients: N 100-160 ppm, P 15-30 ppm, K 150-250 ppm. CEC 14-22 meq/100g.',
    'minnesota': 'Minnesota soils are Mollisols with high organic matter (4-8%), pH 6.0-7.5. Common: Barnes loam, Bearden silty clay loam. Nutrients: N 120-200 ppm, P 20-45 ppm, K 200-350 ppm. CEC 20-30 meq/100g.',
    'nebraska': 'Nebraska soils are Mollisols, well-drained, organic matter 2-4%, pH 6.5-7.8. Common: Holdrege silt loam, Sharpsburg silty clay loam. Nutrients: N 90-150 ppm, P 12-25 ppm, K 180-300 ppm. CEC 16-26 meq/100g.',
    'missouri': 'Missouri soils are Alfisols and Mollisols, variable drainage, organic matter 2-5%, pH 5.5-7.0. Common: Mexico silt loam, Putnam silt loam. Nutrients: N 80-140 ppm, P 10-25 ppm, K 120-220 ppm. CEC 12-20 meq/100g.',
    'kansas': 'Kansas soils are Mollisols, well-drained, organic matter 2-4%, pH 6.5-7.5. Common: Harney silt loam, Crete silt loam. Nutrients: N 85-145 ppm, P 12-28 ppm, K 160-280 ppm. CEC 15-25 meq/100g.',
    'wisconsin': 'Wisconsin soils are Alfisols and Mollisols, well-drained, organic matter 3-6%, pH 6.0-7.2. Common: Miami silt loam, Fayette silt loam. Nutrients: N 100-170 ppm, P 15-32 ppm, K 150-270 ppm. CEC 16-24 meq/100g.',
    'michigan': 'Michigan soils are Alfisols, well-drained, organic matter 2-5%, pH 6.0-7.0. Common: Capac loam, Coloma sandy loam. Nutrients: N 90-150 ppm, P 12-28 ppm, K 140-250 ppm. CEC 14-22 meq/100g.',
    
    // Other regions (can be expanded)
    'california': 'California soils vary widely: Central Valley has alluvial soils (pH 7.0-8.5), coastal areas have loamy soils (pH 6.5-7.5). Organic matter 1-3%. Nutrients vary by region.',
    'texas': 'Texas soils are diverse: Blackland Prairie has Vertisols (pH 7.5-8.5), East Texas has Alfisols (pH 5.5-7.0). Organic matter 1-4%.',
    'florida': 'Florida soils are primarily Spodosols and Entisols, sandy, well-drained, pH 5.5-7.5, low organic matter (1-3%).',
    
    // Countries
    'usa': 'US agricultural soils are primarily Mollisols and Alfisols, well-drained, organic matter 2-6%, pH 6.0-7.5. Typical nutrients: N 100-200 ppm, P 15-40 ppm, K 150-300 ppm.',
    'canada': 'Canadian prairie soils are Chernozems (Mollisols), high organic matter (4-8%), pH 6.5-7.5. Eastern Canada has Podzols, acidic (pH 5.0-6.5).',
    'india': 'Indian soils vary: Alluvial soils (pH 6.5-8.5), Black soils (pH 7.5-8.5), Red soils (pH 5.5-7.0). Organic matter 0.5-2%.',
  }
  
  // Try to find matching region (case-insensitive)
  const regionLower = region.toLowerCase()
  for (const [key, value] of Object.entries(regionalSoilData)) {
    if (regionLower.includes(key) || key.includes(regionLower)) {
      return value
    }
  }
  
  // Default regional soil information
  return `Regional soil characteristics for ${location}: Agricultural soils typically have organic matter 2-5%, pH 6.0-7.5, with moderate to high fertility. Common nutrients: N 100-180 ppm, P 15-30 ppm, K 150-250 ppm. Consider local soil testing for specific nutrient levels.`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      )
    }

    // Extract form data
    const cropType = formData.get("cropType") as string
    const customCropType = formData.get("customCropType") as string
    const growthStage = formData.get("growthStage") as string
    const customGrowthStage = formData.get("customGrowthStage") as string
    const location = formData.get("location") as string
    const soilCondition = formData.get("soilCondition") as string
    const customSoilCondition = formData.get("customSoilCondition") as string
    const weatherCondition = formData.get("weatherCondition") as string
    const customWeatherCondition = formData.get("customWeatherCondition") as string
    const description = formData.get("description") as string || ""

    // Get crop images
    const cropImages = formData.getAll("cropImages") as File[]
    const soilReport = formData.get("soilReport") as File | null
    const weatherImage = formData.get("weatherImage") as File | null

    // Convert images to base64 for Gemini
    const imageParts: Array<{ inlineData: { data: string; mimeType: string } }> = []
    
    for (const image of cropImages) {
      if (image && image.size > 0) {
        const base64 = await fileToBase64(image)
        imageParts.push({
          inlineData: {
            data: base64.split(",")[1], // Remove data:image/...;base64, prefix
            mimeType: image.type,
          },
        })
      }
    }

    if (weatherImage && weatherImage.size > 0) {
      const base64 = await fileToBase64(weatherImage)
      imageParts.push({
        inlineData: {
          data: base64.split(",")[1],
          mimeType: weatherImage.type,
        },
      })
    }

    // Build comprehensive prompt for Gemini
    const finalCropType = cropType === "Other" ? customCropType : cropType
    const finalGrowthStage = growthStage === "Other" ? customGrowthStage : growthStage
    const finalSoilCondition = soilCondition === "Other" ? customSoilCondition : soilCondition
    const finalWeatherCondition = weatherCondition === "Other" ? customWeatherCondition : weatherCondition

    // Get regional soil data based on location
    const regionalSoilInfo = getRegionalSoilData(location)
    const locationInfo = parseLocation(location)

    const prompt = `You are an expert AI agronomist with deep knowledge of crop diseases, plant pathology, and agricultural best practices. You MUST provide location-specific analysis and recommendations based strictly on the provided location.

CRITICAL LOCATION REQUIREMENT:
The location "${location}" is the PRIMARY factor for your analysis. ALL recommendations, treatment plans, and environmental assessments MUST be specific to this location. Consider:
- Regional climate patterns and typical weather conditions for this location
- Common diseases and pests in this region
- Local agricultural practices and available products
- Regional soil characteristics (provided below)
- Seasonal timing appropriate for this location

CROP INFORMATION:
- Crop Type: ${finalCropType}
- Growth Stage: ${finalGrowthStage}
- Location: ${location}${locationInfo.city ? ` (City: ${locationInfo.city})` : ''}${locationInfo.state ? ` (State/Region: ${locationInfo.state})` : ''}${locationInfo.country ? ` (Country: ${locationInfo.country})` : ''}
- Soil Condition: ${finalSoilCondition}
- Recent Weather: ${finalWeatherCondition}
${description ? `- Additional Notes: ${description}` : ""}

REGIONAL SOIL CHARACTERISTICS FOR ${location.toUpperCase()}:
${regionalSoilInfo}

IMPORTANT: Use the above regional soil data to inform your recommendations. If the user-provided soil condition differs from regional norms, consider both in your analysis.

TASK:
Analyze the crop images provided and create a detailed diagnosis report in the following JSON format. Be thorough, accurate, and provide actionable recommendations that are SPECIFIC TO THE LOCATION PROVIDED.

REQUIRED JSON FORMAT:
{
  "diagnosis": {
    "diseaseName": "Name of the disease or issue identified",
    "severity": "Low" | "Moderate" | "High" | "Critical",
    "confidence": "percentage as number (0-100)",
    "description": "Detailed description of the disease/issue, its causes, and symptoms visible in the images",
    "scientificName": "Scientific name of pathogen if applicable"
  },
  "environmentalFactors": {
    "humidity": {
      "value": "percentage or description",
      "riskLevel": "LOW" | "MODERATE" | "HIGH",
      "impact": "How this affects the disease"
    },
    "temperature": {
      "value": "temperature range or description",
      "riskLevel": "LOW" | "MODERATE" | "HIGH",
      "impact": "How this affects the disease"
    },
    "overallRisk": "percentage (0-100)"
  },
  "impact": {
    "yieldLoss": "estimated percentage range (e.g., '20-40%')",
    "timeframe": "timeframe for impact (e.g., 'within 7 days')",
    "description": "Detailed explanation of potential impact without intervention"
  },
  "treatmentPlan": {
    "immediate": [
      {
        "title": "Action title",
        "description": "Detailed action description",
        "timeline": "WITHIN 24 HOURS",
        "type": "organic" | "chemical" | "cultural",
        "products": ["Product recommendations if applicable"]
      }
    ],
    "followUp": [
      {
        "title": "Action title",
        "description": "Detailed action description",
        "timeline": "DAY 3-7",
        "type": "organic" | "chemical" | "cultural"
      }
    ],
    "prevention": [
      {
        "title": "Action title",
        "description": "Detailed action description",
        "timeline": "POST-SEASON",
        "type": "organic" | "chemical" | "cultural"
      }
    ]
  },
  "recommendations": {
    "pruning": "Specific pruning recommendations",
    "watering": "Watering schedule and method recommendations",
    "fertilization": "Fertilization recommendations if applicable",
    "monitoring": "What to monitor and how often"
  }
}

CRITICAL REQUIREMENTS:
1. LOCATION-SPECIFIC ANALYSIS (MANDATORY):
   - ALL recommendations MUST be tailored to "${location}"
   - Consider regional climate, typical weather patterns, and seasonal conditions for this location
   - Reference common diseases and pests that occur in this region
   - Recommend products and treatments available/effective in this location
   - Consider local agricultural extension recommendations for this region

2. REGIONAL SOIL CONSIDERATION (MANDATORY):
   - Use the regional soil characteristics provided above as the baseline
   - If user-provided soil condition differs, explain how it affects the diagnosis
   - Adjust treatment recommendations based on regional soil pH, nutrient levels, and soil type
   - Consider common soil issues in this region

3. ENVIRONMENTAL FACTORS:
   - Base humidity and temperature assessments on typical conditions for "${location}"
   - Consider seasonal weather patterns for this location
   - Factor in regional climate risks (drought, flooding, frost, etc.)

4. TREATMENT RECOMMENDATIONS:
   - Recommend products and treatments that are available and effective in "${location}"
   - Consider local regulations and agricultural practices
   - Provide location-specific application timing based on regional growing seasons
   - Include both organic and chemical options when applicable, but prioritize what works best in this region

5. GENERAL REQUIREMENTS:
   - Base your analysis on the actual images provided
   - Be realistic about timelines and expected outcomes
   - If multiple issues are detected, prioritize the most critical
   - Return ONLY valid JSON, no additional text before or after

Now analyze the images and provide the diagnosis report in the exact JSON format specified above, ensuring ALL recommendations are specific to "${location}".`

    // Prepare content parts (text + images)
    const contentParts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> = [
      { text: prompt },
      ...imageParts,
    ]

    // Call Gemini Flash API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: contentParts,
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      return NextResponse.json(
        { error: "Failed to get response from Gemini API", details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract the text from Gemini's response
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I couldn't generate a response. Please try again."

    // Helper function to extract and clean JSON from markdown code blocks
    const extractJSON = (text: string): string | null => {
      // Remove markdown code blocks (```json ... ```)
      let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim()
      
      // Find JSON object start
      const startIndex = cleaned.indexOf("{")
      if (startIndex === -1) return null
      
      // Find the matching closing brace, handling nested objects and arrays
      let braceCount = 0
      let inString = false
      let escapeNext = false
      let jsonEnd = -1
      
      for (let i = startIndex; i < cleaned.length; i++) {
        const char = cleaned[i]
        
        if (escapeNext) {
          escapeNext = false
          continue
        }
        
        if (char === "\\") {
          escapeNext = true
          continue
        }
        
        if (char === '"' && !escapeNext) {
          inString = !inString
          continue
        }
        
        if (!inString) {
          if (char === "{") braceCount++
          if (char === "}") {
            braceCount--
            if (braceCount === 0) {
              jsonEnd = i + 1
              break
            }
          }
        }
      }
      
      if (jsonEnd > startIndex) {
        return cleaned.substring(startIndex, jsonEnd)
      }
      
      return null
    }

    // Helper function to repair incomplete JSON
    const repairJSON = (jsonStr: string): string => {
      let repaired = jsonStr.trim()
      
      // Count open/close braces and brackets
      const openBraces = (repaired.match(/\{/g) || []).length
      const closeBraces = (repaired.match(/\}/g) || []).length
      const openBrackets = (repaired.match(/\[/g) || []).length
      const closeBrackets = (repaired.match(/\]/g) || []).length
      
      // Close unclosed arrays
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        repaired += "]"
      }
      
      // Close unclosed objects
      for (let i = 0; i < openBraces - closeBraces; i++) {
        repaired += "}"
      }
      
      // Remove trailing commas before closing braces/brackets
      repaired = repaired.replace(/,(\s*[}\]])/g, "$1")
      
      return repaired
    }

    // Try to parse JSON from the response
    let analysisResult
    try {
      // First, try to extract JSON from markdown code blocks
      let jsonStr = extractJSON(responseText)
      
      if (!jsonStr) {
        // Fallback: try to find JSON object directly
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          jsonStr = jsonMatch[0]
        } else {
          throw new Error("No JSON found in response")
        }
      }
      
      // Try to parse the JSON
      try {
        analysisResult = JSON.parse(jsonStr)
      } catch (parseError) {
        // If parsing fails, try to repair incomplete JSON
        const repaired = repairJSON(jsonStr)
        try {
          analysisResult = JSON.parse(repaired)
        } catch (repairError) {
          // If repair fails, try to extract partial data
          throw new Error(`JSON parsing failed: ${parseError instanceof Error ? parseError.message : "Unknown error"}`)
        }
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError)
      console.error("Response text:", responseText)
      
      // Try to extract partial data from incomplete JSON
      const extractPartialData = (text: string) => {
        const partial: any = {
          diagnosis: {
            diseaseName: "Analysis Error",
            severity: "Moderate",
            confidence: 50,
            description: "",
            scientificName: "Unknown",
          },
          environmentalFactors: {
            humidity: { value: "Unknown", riskLevel: "MODERATE", impact: "Unable to assess" },
            temperature: { value: "Unknown", riskLevel: "MODERATE", impact: "Unable to assess" },
            overallRisk: 50,
          },
          impact: {
            yieldLoss: "Unknown",
            timeframe: "Unknown",
            description: "Unable to assess impact",
          },
          treatmentPlan: {
            immediate: [],
            followUp: [],
            prevention: [],
          },
          recommendations: {},
        }
        
        // Extract disease name
        const diseaseMatch = text.match(/"diseaseName"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (diseaseMatch) {
          partial.diagnosis.diseaseName = diseaseMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ')
        }
        
        // Extract severity
        const severityMatch = text.match(/"severity"\s*:\s*"([^"]+)"/)
        if (severityMatch) {
          partial.diagnosis.severity = severityMatch[1]
        }
        
        // Extract confidence
        const confidenceMatch = text.match(/"confidence"\s*:\s*(\d+)/)
        if (confidenceMatch) {
          partial.diagnosis.confidence = parseInt(confidenceMatch[1])
        }
        
        // Extract description (handle multi-line)
        const descMatch = text.match(/"description"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (descMatch) {
          partial.diagnosis.description = descMatch[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\/g, '')
            .substring(0, 1000)
        }
        
        // Extract scientific name
        const scientificMatch = text.match(/"scientificName"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (scientificMatch) {
          partial.diagnosis.scientificName = scientificMatch[1].replace(/\\"/g, '"')
        }
        
        // Extract environmental factors
        const humidityMatch = text.match(/"humidity"\s*:\s*\{[^}]*"value"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (humidityMatch) {
          partial.environmentalFactors.humidity.value = humidityMatch[1].replace(/\\"/g, '"')
        }
        
        const tempMatch = text.match(/"temperature"\s*:\s*\{[^}]*"value"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (tempMatch) {
          partial.environmentalFactors.temperature.value = tempMatch[1].replace(/\\"/g, '"')
        }
        
        const riskMatch = text.match(/"overallRisk"\s*:\s*(\d+)/)
        if (riskMatch) {
          partial.environmentalFactors.overallRisk = parseInt(riskMatch[1])
        }
        
        // Extract impact
        const yieldMatch = text.match(/"yieldLoss"\s*:\s*"((?:[^"\\]|\\.)*)"/)
        if (yieldMatch) {
          partial.impact.yieldLoss = yieldMatch[1].replace(/\\"/g, '"')
        }
        
        // Extract treatment plans (try to get at least immediate actions)
        const immediateMatch = text.match(/"immediate"\s*:\s*\[([^\]]*)\]/)
        if (immediateMatch) {
          try {
            // Try to parse the immediate array
            const immediateStr = "[" + immediateMatch[1] + "]"
            const immediateArray = JSON.parse(immediateStr)
            if (Array.isArray(immediateArray)) {
              partial.treatmentPlan.immediate = immediateArray
            }
          } catch (e) {
            // If parsing fails, try to extract individual items
            const itemMatches = immediateMatch[1].match(/\{[^}]*"title"\s*:\s*"([^"]+)"[^}]*\}/g)
            if (itemMatches) {
              partial.treatmentPlan.immediate = itemMatches.slice(0, 3).map((item: string) => {
                const titleMatch = item.match(/"title"\s*:\s*"([^"]+)"/)
                const descMatch = item.match(/"description"\s*:\s*"((?:[^"\\]|\\.)*)"/)
                return {
                  title: titleMatch ? titleMatch[1] : "Treatment Action",
                  description: descMatch ? descMatch[1].replace(/\\"/g, '"').substring(0, 200) : "",
                  timeline: "WITHIN 24 HOURS",
                  type: "cultural",
                }
              })
            }
          }
        }
        
        return partial
      }
      
      // Try to extract partial data
      let partialData = extractPartialData(responseText)
      
      // If we got useful data, use it; otherwise use fallback
      if (partialData.diagnosis.diseaseName !== "Analysis Error" || partialData.diagnosis.description) {
        analysisResult = partialData
      } else {
        // Fallback: create a structured response
        analysisResult = {
          diagnosis: {
            diseaseName: "Analysis Error",
            severity: "Moderate",
            confidence: 50,
            description: "Unable to analyze the provided images. Please ensure the images are clear and show the crop symptoms. Try uploading new images and resubmitting.",
            scientificName: "Unknown",
          },
          environmentalFactors: {
            humidity: { value: "Unknown", riskLevel: "MODERATE", impact: "Unable to assess" },
            temperature: { value: "Unknown", riskLevel: "MODERATE", impact: "Unable to assess" },
            overallRisk: 50,
          },
          impact: {
            yieldLoss: "Unknown",
            timeframe: "Unknown",
            description: "Unable to assess impact",
          },
          treatmentPlan: {
            immediate: [],
            followUp: [],
            prevention: [],
          },
          recommendations: {},
        }
      }
      
      // Fallback: create a structured response from the text
      analysisResult = {
        diagnosis: {
          diseaseName: "Analysis Error",
          severity: "Moderate",
          confidence: 50,
          description: cleanedDescription || "Unable to analyze the provided images. Please ensure the images are clear and show the crop symptoms. Try uploading new images and resubmitting.",
          scientificName: "Unknown",
        },
        environmentalFactors: {
          humidity: {
            value: "Unknown",
            riskLevel: "MODERATE",
            impact: "Unable to assess",
          },
          temperature: {
            value: "Unknown",
            riskLevel: "MODERATE",
            impact: "Unable to assess",
          },
          overallRisk: 50,
        },
        impact: {
          yieldLoss: "Unknown",
          timeframe: "Unknown",
          description: "Unable to assess impact",
        },
        treatmentPlan: {
          immediate: [],
          followUp: [],
          prevention: [],
        },
        recommendations: {
          pruning: "Please consult with an agricultural expert.",
          watering: "Please consult with an agricultural expert.",
          fertilization: "Please consult with an agricultural expert.",
          monitoring: "Please consult with an agricultural expert.",
        },
      }
    }

    // Generate report ID
    const reportId = `AG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`

    // Return comprehensive report
    return NextResponse.json({
      reportId,
      timestamp: new Date().toISOString(),
      cropInfo: {
        cropType: finalCropType,
        growthStage: finalGrowthStage,
        location,
        soilCondition: finalSoilCondition,
        weatherCondition: finalWeatherCondition,
        description,
      },
      analysis: analysisResult,
      imageCount: cropImages.length,
    })
  } catch (error) {
    console.error("Error in diagnosis analysis:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
