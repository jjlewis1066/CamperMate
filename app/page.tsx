"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Route, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function Home() {
  const { toast } = useToast()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      toast({
        title: "AI Search Results",
        description: "Found 3 scenic free campsites near Queenstown!",
      })
    }, 1500)
  }

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

  return (
    <div className="container px-4 pb-20 pt-6">
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-sage-700 dark:text-sage-300">Campwise</h1>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MapPin className="w-4 h-4 text-ocean-600" />
          </motion.div>
          <span className="text-sm font-medium">Queenstown, NZ</span>
        </div>
      </motion.div>

      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Input
          className="pl-10 bg-white dark:bg-gray-800 border-sage-200 dark:border-gray-700 rounded-xl"
          placeholder="Find a scenic free campsite near Queenstown..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearching ? "text-teal-600 animate-pulse" : "text-gray-400"} w-5 h-5`}
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          className="w-full py-6 mb-8 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center gap-2"
          onClick={handleSearch}
        >
          <Search className={`w-5 h-5 ${isSearching ? "animate-spin" : ""}`} />
          {isSearching ? "Searching..." : "Explore Nearby Camps"}
        </Button>
      </motion.div>

      <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
        <motion.section variants={item}>
          <h2 className="text-lg font-semibold mb-3 text-sage-800 dark:text-sage-200">Free Sites Nearby</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
            {[
              { name: "Lake Moke Campsite", distance: "12km away", tag: "Scenic", image: "/images/lake-campsite.jpg" },
              { name: "Forest Retreat", distance: "18km away", tag: "Peaceful", image: "/images/forest-campsite.jpg" },
              {
                name: "Mountain View",
                distance: "22km away",
                tag: "Panoramic",
                image: "/images/mountain-campsite.jpg",
              },
            ].map((site, i) => (
              <motion.div
                key={i}
                className="min-w-[260px] snap-start"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-32 relative">
                      <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        Free
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {site.distance} • {site.tag}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={item}>
          <h2 className="text-lg font-semibold mb-3 text-sage-800 dark:text-sage-200">Your Saved Spots</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
            {[
              {
                name: "Twelve Mile Delta",
                distance: "5km away",
                tag: "Facilities",
                image: "/images/beach-campsite.jpg",
              },
              {
                name: "Glenorchy Lakeside",
                distance: "28km away",
                tag: "Waterfront",
                image: "/images/lake-campsite.jpg",
              },
            ].map((site, i) => (
              <motion.div
                key={i}
                className="min-w-[260px] snap-start"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-32 relative">
                      <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        Paid
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {site.distance} • {site.tag}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={item}>
          <h2 className="text-lg font-semibold mb-3 text-sage-800 dark:text-sage-200">Start a Trip Plan</h2>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="rounded-xl border-sage-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-sunset-100 flex items-center justify-center"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 5, duration: 1 }}
                  >
                    <Route className="w-5 h-5 text-sunset-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">Create a custom trip</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered route planning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section variants={item}>
          <h2 className="text-lg font-semibold mb-3 text-sage-800 dark:text-sage-200">Closures or Alerts</h2>
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          >
            <Card className="rounded-xl border-sage-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">Road Closure</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Glenorchy Road - Flooding</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  )
}
