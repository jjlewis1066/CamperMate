"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Send,
  MapPin,
  Route,
  AlertTriangle,
  Lightbulb,
  MapIcon,
  MessageSquare,
  Star,
  Compass,
  Tent,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Sun,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function AiBotPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm your Campwise assistant. How can I help with your camping adventure today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [viewMode, setViewMode] = useState<"chat" | "map">("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Preset query suggestions
  const presetQueries = [
    "Find remote beaches in Northland",
    "Compare Lake Moke vs Twelve Mile Delta",
    "Best campsites for stargazing near Queenstown",
    "Dog-friendly campsites with showers",
    "Recommend a 3-day itinerary around Wanaka",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      let botResponse

      if (input.toLowerCase().includes("remote") && input.toLowerCase().includes("beach")) {
        botResponse = {
          role: "bot",
          content:
            "I found 5 remote beaches in Northland with camping options. The top rated is Maitai Bay on the Karikari Peninsula, which offers beachfront freedom camping with basic facilities.",
          type: "comparison",
          places: [
            { name: "Maitai Bay", rating: 4.8, features: ["Remote", "Beachfront", "Basic facilities"] },
            { name: "Tapotupotu Bay", rating: 4.6, features: ["DOC site", "Near Cape Reinga", "Sheltered"] },
            { name: "Rarawa Beach", rating: 4.5, features: ["White sand", "Good for swimming", "Quiet"] },
          ],
        }
      } else if (input.toLowerCase().includes("compare")) {
        botResponse = {
          role: "bot",
          content: "Here's a comparison between Lake Moke Campsite and Twelve Mile Delta:",
          type: "comparison",
          comparison: {
            categories: ["Cost", "Facilities", "Privacy", "Views", "Access"],
            places: [
              {
                name: "Lake Moke",
                ratings: [5, 2, 4, 5, 3],
                summary: "Free with beautiful lake views, more private but basic facilities",
              },
              {
                name: "Twelve Mile Delta",
                ratings: [3, 4, 2, 4, 5],
                summary: "Paid DOC site with better facilities but less privacy, easy access",
              },
            ],
          },
        }
      } else if (input.toLowerCase().includes("rain") || input.toLowerCase().includes("weather")) {
        botResponse = {
          role: "bot",
          content:
            "The forecast for Queenstown shows rain tomorrow, but clear skies for the next 3 days after that. I'd recommend waiting until Wednesday for the best camping weather!",
          type: "weather",
        }
      } else if (input.toLowerCase().includes("camp") || input.toLowerCase().includes("site")) {
        botResponse = {
          role: "bot",
          content:
            "I found 3 great campsites near Queenstown that match your preferences for lake views and free camping. Lake Moke is the highest rated one!",
          type: "campsite",
        }
      } else if (input.toLowerCase().includes("route") || input.toLowerCase().includes("drive")) {
        botResponse = {
          role: "bot",
          content:
            "The drive from Queenstown to Wanaka takes about 1 hour. There are 2 free campsites along the way where you could stop and enjoy the views!",
          type: "route",
        }
      } else if (input.toLowerCase().includes("itinerary") || input.toLowerCase().includes("day")) {
        botResponse = {
          role: "bot",
          content:
            "I've created a 3-day itinerary around Wanaka for you, focusing on scenic spots and good camping options:",
          type: "itinerary",
          days: [
            {
              day: "Day 1",
              activities: "Explore Wanaka lakefront, hike Mount Iron (1.5 hrs)",
              campsite: "Glendhu Bay Motor Camp",
              notes: "Lakeside camping with mountain views",
            },
            {
              day: "Day 2",
              activities: "Visit Blue Pools Track, explore Makarora",
              campsite: "Cameron Flat Campsite",
              notes: "Free DOC site with river access",
            },
            {
              day: "Day 3",
              activities: "Drive to Lake Hawea, water activities",
              campsite: "Lake Outlet Holiday Park",
              notes: "Facilities include hot showers and kitchen",
            },
          ],
        }
      } else {
        botResponse = {
          role: "bot",
          content:
            "I'd be happy to help with that! Is there anything specific about camping in New Zealand you'd like to know?",
        }
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handlePresetQuery = (query: string) => {
    setInput(query)
    // Optional: automatically send after selecting a preset
    setTimeout(() => {
      setMessages([...messages, { role: "user", content: query }])
      setInput("")
      setIsTyping(true)

      // Simulate bot response (simplified for brevity)
      setTimeout(() => {
        const botResponse = {
          role: "bot",
          content: `I'm processing your query about "${query}". Here's what I found...`,
          type: query.includes("compare")
            ? "comparison"
            : query.includes("itinerary")
              ? "itinerary"
              : query.includes("remote")
                ? "campsite"
                : "general",
        }
        setIsTyping(false)
        setMessages((prev) => [...prev, botResponse])
      }, 1500)
    }, 300)
  }

  // Render comparison card
  const renderComparisonCard = (comparison: any) => {
    if (!comparison) return null

    return (
      <Card className="mt-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
        <CardContent className="p-3">
          <h3 className="text-sm font-medium mb-2">Comparison</h3>
          <div className="space-y-3">
            {comparison.places.map((place: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{place.name}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs ml-1">
                      {place.ratings
                        ? (place.ratings.reduce((a: number, b: number) => a + b, 0) / place.ratings.length).toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
                {place.summary && <p className="text-xs text-gray-600 dark:text-gray-400">{place.summary}</p>}
                {place.features && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {place.features.map((feature: string, i: number) => (
                      <span key={i} className="text-xs bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render itinerary card
  const renderItineraryCard = (days: any[]) => {
    if (!days) return null

    return (
      <Card className="mt-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
        <CardContent className="p-3">
          <h3 className="text-sm font-medium mb-2">Suggested Itinerary</h3>
          <div className="space-y-2">
            {days.map((day, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-teal-600" />
                  <span className="font-medium text-xs">{day.day}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <Compass className="w-3 h-3" />
                  <span>{day.activities}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <Tent className="w-3 h-3" />
                  <span>{day.campsite}</span>
                </div>
              </div>
            ))}
          </div>
          <Button size="sm" className="w-full mt-2 h-7 text-xs bg-teal-600 hover:bg-teal-700 text-white">
            Save Itinerary
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <motion.div
        className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold text-sage-700 dark:text-sage-300">Campwise Assistant</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Map View</span>
          <Switch checked={viewMode === "map"} onCheckedChange={(checked) => setViewMode(checked ? "map" : "chat")} />
        </div>
      </motion.div>

      {viewMode === "chat" ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.role === "user"
                      ? "bg-teal-600 text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <p>{message.content}</p>

                  {message.type === "campsite" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="mt-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                        <CardContent className="p-0">
                          <div className="h-24 relative">
                            <Image
                              src="/images/lake-campsite.jpg"
                              alt="Lake Moke Campsite"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="font-medium text-sm">Lake Moke Campsite</h3>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="w-3 h-3" />
                              <span>12km from Queenstown</span>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                className="mt-2 w-full text-xs h-7 bg-teal-600 hover:bg-teal-700 text-white"
                              >
                                View Details
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {message.type === "route" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="mt-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                        <CardContent className="p-2">
                          <div className="flex items-center gap-2">
                            <Route className="w-5 h-5 text-sunset-600" />
                            <div>
                              <h3 className="font-medium text-sm">Queenstown to Wanaka</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">1 hour drive • 67 km</p>
                            </div>
                          </div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              className="mt-2 w-full text-xs h-7 bg-teal-600 hover:bg-teal-700 text-white"
                            >
                              Show on Map
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {message.type === "weather" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="mt-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <h3 className="font-medium text-sm">Weather Alert</h3>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-1">
                              <Thermometer className="w-3 h-3 text-red-500" />
                              <span className="text-xs">18-24°C</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets className="w-3 h-3 text-blue-500" />
                              <span className="text-xs">80% tomorrow</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Wind className="w-3 h-3 text-gray-500" />
                              <span className="text-xs">15 km/h</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                              <div key={i} className="flex-1 text-center bg-gray-50 dark:bg-gray-800 rounded-md p-1">
                                <div className="text-xs font-medium">{day}</div>
                                <div className="my-1">
                                  {i === 1 ? (
                                    <CloudRain className="w-4 h-4 mx-auto text-blue-500" />
                                  ) : (
                                    <Sun className="w-4 h-4 mx-auto text-amber-500" />
                                  )}
                                </div>
                                <div className="text-xs">{20 + i}°</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {message.type === "comparison" &&
                    renderComparisonCard(message.comparison || { places: message.places })}

                  {message.type === "itinerary" && renderItineraryCard(message.days)}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div className="flex justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="max-w-[80%] rounded-xl p-3 bg-gray-100 dark:bg-gray-800 rounded-tl-none">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <Image src="/images/queenstown-map.jpg" alt="Map view" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-xs text-center">
                <MapIcon className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                <h3 className="font-medium mb-1">Map View Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  See AI recommendations directly on the map as you chat
                </p>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setViewMode("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Return to Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div
        className="p-4 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about camping..."
            className="bg-white dark:bg-gray-800 border-sage-200 dark:border-gray-700 rounded-xl"
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={handleSend}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
              size="icon"
              disabled={isTyping}
            >
              <Send className={`w-5 h-5 ${isTyping ? "opacity-50" : ""}`} />
            </Button>
          </motion.div>
        </div>

        <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((query, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 rounded-full"
                  onClick={() => handlePresetQuery(query)}
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  {query}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Calendar(props: any) {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    </div>
  )
}
