"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Route,
  Calendar,
  MapPin,
  Clock,
  Cloud,
  CloudRain,
  Sun,
  DropletsIcon as DragDropIcon,
  MapIcon,
  List,
  Zap,
  Share2,
} from "lucide-react"
import { motion, Reorder } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

// Mock weather data (simulating OpenWeather API)
const mockWeatherData = [
  {
    location: "Byron Bay",
    forecast: [
      { day: "Mon", temp: 26, condition: "sunny", icon: Sun },
      { day: "Tue", temp: 25, condition: "partly cloudy", icon: Cloud },
      { day: "Wed", temp: 24, condition: "cloudy", icon: Cloud },
      { day: "Thu", temp: 23, condition: "rainy", icon: CloudRain },
      { day: "Fri", temp: 25, condition: "sunny", icon: Sun },
    ],
  },
  {
    location: "Brunswick Heads",
    forecast: [
      { day: "Mon", temp: 25, condition: "sunny", icon: Sun },
      { day: "Tue", temp: 24, condition: "partly cloudy", icon: Cloud },
      { day: "Wed", temp: 23, condition: "rainy", icon: CloudRain },
      { day: "Thu", temp: 24, condition: "cloudy", icon: Cloud },
      { day: "Fri", temp: 26, condition: "sunny", icon: Sun },
    ],
  },
  {
    location: "Gold Coast",
    forecast: [
      { day: "Mon", temp: 27, condition: "sunny", icon: Sun },
      { day: "Tue", temp: 26, condition: "sunny", icon: Sun },
      { day: "Wed", temp: 25, condition: "partly cloudy", icon: Cloud },
      { day: "Thu", temp: 24, condition: "rainy", icon: CloudRain },
      { day: "Fri", temp: 26, condition: "sunny", icon: Sun },
    ],
  },
]

export default function PlanPage() {
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [planView, setPlanView] = useState<"list" | "map">("list")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { toast } = useToast()

  // Trip itinerary with reordering capability
  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      day: "Day 1",
      location: "Byron Bay",
      campsite: "Suffolk Park Beachfront",
      description: "Start at Suffolk Park for easy beach access and surf.",
    },
    {
      id: 2,
      day: "Day 2-3",
      location: "Brunswick Heads",
      campsite: "Brunswick Heads Nature Reserve",
      description: "Great surf breaks and river swimming spots.",
    },
    {
      id: 3,
      day: "Day 4-5",
      location: "Cabarita Beach",
      campsite: "Hastings Point Campground",
      description: "Beautiful headland walks and consistent surf.",
    },
    {
      id: 4,
      day: "Day 6-7",
      location: "Gold Coast",
      campsite: "Tallebudgera Creek",
      description: "End your trip with world-class surf breaks.",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const optimizeRoute = () => {
    setIsOptimizing(true)

    // Simulate AI optimization
    setTimeout(() => {
      // Reorder the itinerary in a more "optimal" way
      const optimizedItinerary = [...itinerary].sort((a, b) => (a.id % 2) - (b.id % 2))
      setItinerary(optimizedItinerary)

      setIsOptimizing(false)
      toast({
        title: "Route Optimized",
        description: "Your trip has been optimized to reduce travel time and distance",
      })
    }, 2000)
  }

  const shareTrip = () => {
    toast({
      title: "Trip Shared",
      description: "A shareable link has been copied to your clipboard",
    })
  }

  useEffect(() => {
    if (showResults) {
      // Simulate fetching weather data
      setTimeout(() => {
        setWeatherData(mockWeatherData)
        setWeatherLoading(false)
        toast({
          title: "Weather forecast updated",
          description: "Latest forecast data has been loaded for your trip",
        })
      }, 1500)
    }
  }, [showResults, toast])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Trip summary statistics
  const tripStats = {
    duration: "7 days",
    distance: "115 km",
    campsites: 4,
    startDate: "May 15, 2025",
    endDate: "May 22, 2025",
  }

  return (
    <div className="container px-4 pb-20 pt-6">
      <motion.h1
        className="text-2xl font-bold mb-6 text-sage-700 dark:text-sage-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trip Planner
      </motion.h1>

      {!showResults ? (
        <>
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Textarea
                  className="min-h-[120px] bg-white dark:bg-gray-800 border-sage-200 dark:border-gray-700 rounded-xl"
                  placeholder="I'm in Byron Bay with 7 days. I want beaches, not too remote, and surf spots."
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Trip Plan...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Create Trip Plan
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>

          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            <motion.h2 className="text-lg font-semibold text-sage-800 dark:text-sage-200" variants={item}>
              Quick Trip Templates
            </motion.h2>

            {[
              {
                title: "7-Day South Island Adventure",
                description: "Queenstown to Christchurch via scenic spots",
                icon: Route,
                image: "/images/south-island.jpg",
              },
              {
                title: "Weekend Surf Escape",
                description: "Byron Bay to Gold Coast surf spots",
                icon: Calendar,
                image: "/images/byron-bay.jpg",
              },
              {
                title: "East Coast Budget Route",
                description: "Sydney to Cairns with free camping",
                icon: Route,
                image: "/images/beach-campsite.jpg",
              },
            ].map((template, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setIsLoading(false)
                    setShowResults(true)
                  }, 1500)
                }}
              >
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 cursor-pointer hover:border-teal-500 dark:hover:border-teal-400 transition-colors overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image
                          src={template.image || "/placeholder.svg"}
                          alt={template.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                            <template.icon className="w-5 h-5 text-ocean-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{template.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-sage-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-sage-800 dark:text-sage-200">Byron Bay Surf Adventure</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-teal-600"
                  onClick={shareTrip}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A 7-day trip with beaches, surf spots, and comfortable camping
              </p>
              <div className="h-48 rounded-lg mb-4 relative overflow-hidden">
                <Image src="/images/byron-bay.jpg" alt="Byron Bay coastline" fill className="object-cover" />
              </div>

              {/* Trip Summary Statistics */}
              <motion.div
                className="mb-4 bg-sage-50 dark:bg-gray-700 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-sage-800 dark:text-sage-200 mb-2">Trip Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="text-sm font-medium">{tripStats.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
                      <p className="text-sm font-medium">{tripStats.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Campsites</p>
                      <p className="text-sm font-medium">{tripStats.campsites}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dates</p>
                      <p className="text-sm font-medium">
                        {tripStats.startDate.split(",")[0]} - {tripStats.endDate.split(",")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Weather Forecast */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-sage-800 dark:text-sage-200">Weather Forecast</h3>
                  {weatherLoading && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  )}
                </div>

                {weatherLoading ? (
                  <div className="bg-sage-50 dark:bg-gray-700 rounded-lg p-3 h-24 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Fetching weather data...</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-sage-50 dark:bg-gray-700 rounded-lg p-3 overflow-x-auto">
                    <div className="flex flex-col gap-3">
                      {weatherData &&
                        weatherData.map((location: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + idx * 0.1 }}
                            className="space-y-1"
                          >
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{location.location}</p>
                            <div className="flex gap-3">
                              {location.forecast.map((day: any, dayIdx: number) => (
                                <motion.div
                                  key={dayIdx}
                                  whileHover={{ y: -3 }}
                                  className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-2 min-w-[50px]"
                                >
                                  <p className="text-xs font-medium">{day.day}</p>
                                  <day.icon className="w-5 h-5 my-1 text-teal-600" />
                                  <p className="text-xs font-bold">{day.temp}°</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-between">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-xl">
                    Download
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Start Trip</Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-sage-800 dark:text-sage-200">Your Itinerary</h3>
                <div className="flex items-center gap-3">
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button
                      className={`p-1 ${
                        planView === "list"
                          ? "bg-teal-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => setPlanView("list")}
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-1 ${
                        planView === "map"
                          ? "bg-teal-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => setPlanView("map")}
                    >
                      <MapIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 flex items-center gap-1"
                    onClick={optimizeRoute}
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3" />
                        Optimize Route
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {planView === "list" ? (
                <Reorder.Group values={itinerary} onReorder={setItinerary} className="space-y-4">
                  {itinerary.map((day, index) => (
                    <Reorder.Item key={day.id} value={day} className="cursor-move">
                      <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <motion.div
                              className="w-10 h-10 rounded-full bg-sunset-100 flex items-center justify-center shrink-0"
                              whileHover={{ rotate: 10 }}
                            >
                              <span className="text-sunset-600 font-medium">{index + 1}</span>
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{day.day}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{day.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{day.campsite}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{day.description}</p>
                            </div>
                            <DragDropIcon className="w-5 h-5 text-gray-400 shrink-0 mt-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <div className="h-[400px] rounded-xl relative overflow-hidden">
                  <Image src="/images/queenstown-map.jpg" alt="Trip route map" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-center text-gray-600 dark:text-gray-300">
                        Interactive route map view coming soon
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sage-800 dark:text-sage-200">Driving Directions</h3>

              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {[
                      {
                        from: "Byron Bay",
                        to: "Brunswick Heads",
                        time: "25 min",
                        distance: "20 km",
                      },
                      {
                        from: "Brunswick Heads",
                        to: "Cabarita Beach",
                        time: "35 min",
                        distance: "40 km",
                      },
                      {
                        from: "Cabarita Beach",
                        to: "Gold Coast",
                        time: "45 min",
                        distance: "55 km",
                      },
                    ].map((route, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: 15 }}
                        >
                          <Route className="w-5 h-5 text-ocean-600" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                {route.from} to {route.to}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{route.time}</span>
                                <span>•</span>
                                <span>{route.distance}</span>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm" className="text-teal-600 dark:text-teal-400">
                                View
                              </Button>
                            </motion.div>
                          </div>
                          {index < 2 && (
                            <div className="ml-5 h-6 border-l border-dashed border-gray-300 dark:border-gray-600"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
