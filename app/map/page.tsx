"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  MapPin,
  Droplets,
  Wifi,
  Flame,
  Heart,
  Plus,
  X,
  Check,
  Layers,
  Navigation,
  Zap,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [savedLocations, setSavedLocations] = useState<string[]>([])
  const [zoomLevel, setZoomLevel] = useState(12) // 1-20 scale
  const [showClusters, setShowClusters] = useState(true)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Sample campsite data with more details
  const campsites = [
    {
      id: 1,
      name: "Lake Moke Campsite",
      distance: "12km",
      tag: "Scenic",
      image: "/images/lake-campsite.jpg",
      position: { left: "25%", top: "33%" },
      tags: ["Free", "Water", "Lake", "Pet Friendly"],
      rating: 4.7,
      reviews: 28,
      description: "Beautiful lakeside campsite with mountain views and easy access to hiking trails.",
    },
    {
      id: 2,
      name: "Twelve Mile Delta",
      distance: "5km",
      tag: "Facilities",
      image: "/images/beach-campsite.jpg",
      position: { left: "67%", top: "50%" },
      tags: ["Paid", "Showers", "Toilets", "Beach"],
      rating: 4.5,
      reviews: 42,
      description: "Well-maintained campsite with excellent facilities and beautiful beach views.",
    },
    {
      id: 3,
      name: "Moke Lake DOC Campsite",
      distance: "15km",
      tag: "Peaceful",
      image: "/images/mountain-campsite.jpg",
      position: { left: "40%", top: "60%" },
      tags: ["Paid", "Toilets", "Water", "Mountain"],
      rating: 4.3,
      reviews: 19,
      description: "Quiet and peaceful campsite surrounded by stunning mountain scenery.",
    },
    {
      id: 4,
      name: "Queenstown Lakeview",
      distance: "2km",
      tag: "Popular",
      image: "/images/lake-campsite.jpg",
      position: { left: "55%", top: "40%" },
      tags: ["Paid", "Showers", "Wifi", "Lake"],
      rating: 4.8,
      reviews: 56,
      description: "Premium campsite with excellent facilities and stunning lake views.",
    },
    {
      id: 5,
      name: "Glenorchy Forest Retreat",
      distance: "22km",
      tag: "Remote",
      image: "/images/forest-campsite.jpg",
      position: { left: "15%", top: "70%" },
      tags: ["Free", "Forest", "Pet Friendly"],
      rating: 4.2,
      reviews: 15,
      description: "Secluded forest campsite perfect for those seeking peace and quiet.",
    },
  ]

  // Filter categories
  const filterCategories = [
    {
      name: "Site Type",
      options: ["Free", "Paid", "DOC Sites", "Holiday Parks"],
    },
    {
      name: "Amenities",
      options: ["Toilets", "Showers", "Water", "Kitchen", "Laundry", "Dump Station", "Power Hookups", "Wifi"],
    },
    {
      name: "Features",
      options: ["Pet Friendly", "Family Friendly", "Accessible", "Fire Pits", "BBQ", "Picnic Tables"],
    },
    {
      name: "Environment",
      options: ["Beach", "Forest", "Mountain", "Lake", "River", "Hot Springs", "Scenic View"],
    },
  ]

  // AI-powered smart filter presets
  const smartFilterPresets = [
    {
      name: "Freedom camping near Queenstown",
      filters: ["Free", "Scenic View", "Queenstown Area"],
    },
    {
      name: "Family-friendly with facilities",
      filters: ["Family Friendly", "Toilets", "Showers", "Kitchen"],
    },
    {
      name: "Remote spots with good signal",
      filters: ["Remote", "Wifi", "4G Signal"],
    },
    {
      name: "Pet-friendly beach camping",
      filters: ["Pet Friendly", "Beach", "Water"],
    },
  ]

  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handlePinClick = (location: string) => {
    setSelectedLocation(location)

    // Find the corresponding list item and scroll to it
    if (viewMode === "list") {
      const element = document.getElementById(`campsite-${location.replace(/\s+/g, "-").toLowerCase()}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })

        // Add a highlight effect
        element.classList.add("ring-2", "ring-teal-500")
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-teal-500")
        }, 2000)
      }
    }

    toast({
      title: "Location Selected",
      description: `Viewing details for ${location}`,
    })
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const applySmartFilter = (preset: { name: string; filters: string[] }) => {
    setActiveFilters(preset.filters)
    toast({
      title: "Smart Filter Applied",
      description: `Applied "${preset.name}" filter preset`,
    })
  }

  const clearFilters = () => {
    setActiveFilters([])
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    })
  }

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `${activeFilters.length} filters applied to your search`,
    })
  }

  const toggleSaveLocation = (location: string) => {
    if (savedLocations.includes(location)) {
      setSavedLocations(savedLocations.filter((loc) => loc !== location))
      toast({
        title: "Removed from Favorites",
        description: `${location} has been removed from your favorites`,
      })
    } else {
      setSavedLocations([...savedLocations, location])
      toast({
        title: "Added to Favorites",
        description: `${location} has been added to your favorites`,
      })
    }
  }

  const addToPlan = (location: string) => {
    toast({
      title: "Added to Trip Plan",
      description: `${location} has been added to your trip plan`,
    })
  }

  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(newZoom)
    // In a real app, this would trigger map zoom changes
  }

  const handleRecenterMap = () => {
    toast({
      title: "Location Updated",
      description: "Map centered on your current location",
    })
    // In a real app, this would use geolocation to center the map
  }

  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode)
    toast({
      title: isOfflineMode ? "Online Mode" : "Offline Mode",
      description: isOfflineMode
        ? "Switched to online mode. All features available."
        : "Switched to offline mode. Maps and saved locations available without internet.",
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, this would toggle a class on the body or use a theme context
  }

  // Function to render map pins or clusters based on zoom level
  const renderMapPins = () => {
    if (showClusters && zoomLevel < 10) {
      // Show clusters when zoomed out
      return (
        <>
          <motion.div
            className="absolute left-1/3 top-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              handleZoomChange(12)
              toast({
                title: "Cluster Selected",
                description: "Zooming in to view 3 campsites in this area",
              })
            }}
          >
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <motion.div
              className="w-12 h-12 bg-teal-500 rounded-full absolute top-0 left-0"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/3 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              handleZoomChange(12)
              toast({
                title: "Cluster Selected",
                description: "Zooming in to view 2 campsites in this area",
              })
            }}
          >
            <div className="w-10 h-10 bg-sunset-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <motion.div
              className="w-10 h-10 bg-sunset-500 rounded-full absolute top-0 left-0"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </motion.div>
        </>
      )
    } else {
      // Show individual pins when zoomed in
      return campsites.map((site) => (
        <motion.div
          key={site.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
          style={{ left: site.position.left, top: site.position.top }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 + site.id * 0.1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePinClick(site.name)}
        >
          <div
            className={`w-8 h-8 ${site.tags.includes("Free") ? "bg-teal-500" : "bg-sunset-500"} rounded-full flex items-center justify-center`}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <motion.div
            className={`w-8 h-8 ${site.tags.includes("Free") ? "bg-teal-500" : "bg-sunset-500"} rounded-full absolute top-0 left-0`}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
          {/* Quick action buttons */}
          <div className="absolute -right-10 top-0 flex flex-col gap-1">
            <motion.button
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                savedLocations.includes(site.name)
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                toggleSaveLocation(site.name)
              }}
            >
              <Heart className="w-4 h-4" fill={savedLocations.includes(site.name) ? "white" : "none"} />
            </motion.button>
            <motion.button
              className="w-7 h-7 rounded-full bg-white text-gray-600 border border-gray-300 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                addToPlan(site.name)
              }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))
    }
  }

  return (
    <div className={`pb-16 ${isDarkMode ? "dark" : ""}`}>
      {/* Top search bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              className="pl-10 bg-white dark:bg-gray-800 border-sage-200 dark:border-gray-700 rounded-xl"
              placeholder="Search for campsites..."
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-xl relative ${activeFilters.length > 0 ? "border-teal-500 text-teal-600" : ""}`}
              >
                <Filter className="w-5 h-5" />
                {activeFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-xl max-h-[80vh] overflow-auto">
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  {activeFilters.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-sm">
                      Clear All
                    </Button>
                  )}
                </div>

                {/* AI-powered smart filters */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <h4 className="text-sm font-medium">AI Smart Filters</h4>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {smartFilterPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-teal-50 to-sage-50 border-teal-200 dark:from-teal-900/20 dark:to-sage-900/20 dark:border-teal-800"
                        onClick={() => applySmartFilter(preset)}
                      >
                        <Zap className="w-3 h-3 mr-1 text-teal-600 dark:text-teal-400" />
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Active filters */}
                {activeFilters.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <Badge key={filter} variant="secondary" className="px-3 py-1 gap-1">
                          {filter}
                          <button onClick={() => toggleFilter(filter)} className="ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {filterCategories.map((category) => (
                    <div key={category.name}>
                      <h4 className="text-sm font-medium mb-2">{category.name}</h4>
                      <div className="flex gap-2 flex-wrap">
                        {category.options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            size="sm"
                            className={`rounded-full ${
                              activeFilters.includes(option)
                                ? "bg-teal-50 text-teal-700 border-teal-500 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-600"
                                : ""
                            }`}
                            onClick={() => toggleFilter(option)}
                          >
                            {activeFilters.includes(option) && <Check className="w-3 h-3 mr-1" />}
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Reset
                  </Button>
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="whitespace-nowrap">
                {filter} <X className="w-3 h-3 ml-1" onClick={() => toggleFilter(filter)} />
              </Badge>
            ))}
          </div>
        )}

        <div className="flex mt-2 justify-between">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-1 text-sm ${
                viewMode === "map"
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setViewMode("map")}
            >
              Map
            </button>
            <button
              className={`px-4 py-1 text-sm ${
                viewMode === "list"
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-xl h-8 w-8" onClick={toggleDarkMode}>
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-xl h-8 w-8 ${isOfflineMode ? "bg-teal-50 border-teal-500 text-teal-700" : ""}`}
                    onClick={toggleOfflineMode}
                  >
                    <Wifi className={`w-4 h-4 ${isOfflineMode ? "text-teal-700" : ""}`} />
                    {isOfflineMode && <X className="w-3 h-3 absolute" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isOfflineMode ? "Go online" : "Offline mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>

      {/* Map or List View */}
      <div className={`pt-${activeFilters.length > 0 ? "36" : "28"} px-4`}>
        {viewMode === "map" ? (
          <div className="h-[calc(100vh-180px)] rounded-xl relative overflow-hidden" ref={mapRef}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-ocean-100">
                <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <Image src="/images/queenstown-map.jpg" alt="Map of Queenstown area" fill className="object-cover" />

                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleRecenterMap}
                        >
                          <Navigation className="w-5 h-5 text-gray-700" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Center on my location</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowClusters(!showClusters)}
                        >
                          <Layers className="w-5 h-5 text-gray-700" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showClusters ? "Hide clusters" : "Show clusters"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex flex-col gap-1 bg-white rounded-full shadow-md py-2">
                    <motion.button
                      className="w-10 h-8 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleZoomChange(Math.min(20, zoomLevel + 1))}
                    >
                      <Plus className="w-5 h-5 text-gray-700" />
                    </motion.button>
                    <motion.button
                      className="w-10 h-8 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleZoomChange(Math.max(1, zoomLevel - 1))}
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                </div>

                {/* Map pins or clusters */}
                {renderMapPins()}
              </>
            )}
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {campsites.map((site, index) => (
              <motion.div
                key={site.id}
                id={`campsite-${site.name.replace(/\s+/g, "-").toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePinClick(site.name)}
                className="transition-all duration-300"
              >
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                      </div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{site.name}</h3>
                          <div className="flex items-center gap-1 text-amber-500">
                            <span className="text-xs font-medium">{site.rating}</span>
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-xs text-gray-500">({site.reviews})</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {site.distance} away • {site.tag}
                        </p>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {site.tags.slice(0, 3).map((tag, i) => (
                            <div key={i} className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                              {tag}
                            </div>
                          ))}
                          {site.tags.length > 3 && (
                            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                              +{site.tags.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-2 flex flex-col justify-center gap-2">
                        <motion.button
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            savedLocations.includes(site.name)
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSaveLocation(site.name)
                          }}
                        >
                          <Heart className="w-4 h-4" fill={savedLocations.includes(site.name) ? "white" : "none"} />
                        </motion.button>
                        <motion.button
                          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            addToPlan(site.name)
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Location Card */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="fixed bottom-16 left-0 right-0 p-4"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Card className="rounded-xl border-sage-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedLocation}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">12km away • Scenic</p>
                  </div>
                  <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded-full text-xs font-medium">
                    Free
                  </div>
                </div>

                <div className="h-32 rounded-lg mb-3 relative overflow-hidden">
                  <Image
                    src={selectedLocation.includes("Lake") ? "/images/lake-campsite.jpg" : "/images/beach-campsite.jpg"}
                    alt={selectedLocation}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">AI Summary</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beautiful lakeside campsite with mountain views. Recent visitors report it's not crowded and the
                    access road is in good condition.
                  </p>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>Water</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                    <Wifi className="w-3 h-3 text-green-500" />
                    <span>4G Signal</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                    <Flame className="w-3 h-3 text-sunset-500" />
                    <span>Fire Allowed</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button
                      className={`w-full ${
                        savedLocations.includes(selectedLocation)
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white`}
                      onClick={() => toggleSaveLocation(selectedLocation)}
                    >
                      {savedLocations.includes(selectedLocation) ? (
                        <>
                          <Heart className="w-4 h-4 mr-2" fill="white" /> Saved
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" /> Save
                        </>
                      )}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button variant="outline" className="w-full" onClick={() => addToPlan(selectedLocation)}>
                      <Plus className="w-4 h-4 mr-2" /> Add to Plan
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
