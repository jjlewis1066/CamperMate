"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, MapPin, Route, Folder, Share2, Tag, Plus } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FavoritesPage() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isOfflineAvailable, setIsOfflineAvailable] = useState<string[]>(["Lake Moke Campsite"])
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const { toast } = useToast()

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

  const folders = [
    { id: "all", name: "All Saved Places", count: 5 },
    { id: "south-island", name: "South Island Trip", count: 3 },
    { id: "beaches", name: "Beach Spots", count: 2 },
  ]

  const savedPlaces = [
    {
      name: "Lake Moke Campsite",
      location: "Queenstown, NZ",
      tags: ["Free", "Scenic", "Lake"],
      image: "/images/lake-campsite.jpg",
      folder: "south-island",
    },
    {
      name: "Twelve Mile Delta",
      location: "Queenstown, NZ",
      tags: ["Paid", "Facilities", "DOC Site"],
      image: "/images/beach-campsite.jpg",
      folder: "south-island",
    },
    {
      name: "Moke Lake DOC Campsite",
      location: "Queenstown, NZ",
      tags: ["Paid", "Toilets", "Water"],
      image: "/images/mountain-campsite.jpg",
      folder: "south-island",
    },
    {
      name: "Byron Bay Beach Camp",
      location: "Byron Bay, AU",
      tags: ["Free", "Beach", "Surf"],
      image: "/images/beach-campsite.jpg",
      folder: "beaches",
    },
    {
      name: "Gold Coast Hideaway",
      location: "Gold Coast, AU",
      tags: ["Paid", "Facilities", "Beach"],
      image: "/images/beach-campsite.jpg",
      folder: "beaches",
    },
  ]

  const trips = [
    {
      title: "South Island Adventure",
      description: "Queenstown to Christchurch",
      days: 7,
      image: "/images/south-island.jpg",
    },
    {
      title: "Byron Bay Surf Trip",
      description: "Byron Bay to Gold Coast",
      days: 5,
      image: "/images/byron-bay.jpg",
    },
  ]

  const toggleOfflineAccess = (placeName: string) => {
    if (isOfflineAvailable.includes(placeName)) {
      setIsOfflineAvailable(isOfflineAvailable.filter((name) => name !== placeName))
      toast({
        title: "Offline Access Removed",
        description: `${placeName} will not be available offline`,
      })
    } else {
      setIsOfflineAvailable([...isOfflineAvailable, placeName])
      toast({
        title: "Offline Access Added",
        description: `${placeName} will be available offline`,
      })
    }
  }

  const shareList = () => {
    toast({
      title: "List Shared",
      description: "A shareable link has been copied to your clipboard",
    })
  }

  const createFolder = () => {
    if (newFolderName.trim()) {
      toast({
        title: "Folder Created",
        description: `"${newFolderName}" folder has been created`,
      })
      setNewFolderName("")
      setShowCreateFolder(false)
    }
  }

  const filteredPlaces =
    selectedFolder === "all" || selectedFolder === null
      ? savedPlaces
      : savedPlaces.filter((place) => place.folder === selectedFolder)

  return (
    <div className="container px-4 pb-20 pt-6">
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-sage-700 dark:text-sage-300">Your Favorites</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-500 hover:text-teal-600"
          onClick={shareList}
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </motion.div>

      <Tabs defaultValue="places" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="places">Saved Places</TabsTrigger>
          <TabsTrigger value="trips">Trip Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="places" className="mt-4">
          {/* Folders section */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Folders</h2>
              <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Plus className="w-4 h-4 mr-1" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Folder Name</Label>
                      <Input
                        id="name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="e.g., Beach Favorites"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={createFolder}>Create Folder</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {folders.map((folder) => (
                <motion.div
                  key={folder.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                      selectedFolder === folder.id
                        ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <Folder className="w-4 h-4" />
                    <span className="whitespace-nowrap">{folder.name}</span>
                    <span className="text-xs bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{folder.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {filteredPlaces.map((site, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-medium">{site.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{site.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {site.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tagIndex}
                              className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs"
                              whileHover={{ scale: 1.1 }}
                            >
                              {tag}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 flex flex-col justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {isOfflineAvailable.includes(site.name) ? "Available offline" : "Save offline"}
                          </span>
                          <Switch
                            checked={isOfflineAvailable.includes(site.name)}
                            onCheckedChange={() => toggleOfflineAccess(site.name)}
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="trips" className="mt-4">
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {trips.map((trip, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                <Card className="rounded-xl border-sage-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-medium">{trip.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <Route className="w-3 h-3" />
                          <span>{trip.description}</span>
                        </div>
                        <motion.div
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs inline-block"
                          whileHover={{ scale: 1.1 }}
                        >
                          {trip.days} days
                        </motion.div>
                      </div>
                      <div className="p-3 flex flex-col justify-between items-end">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-500 hover:text-teal-600"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-500 hover:text-teal-600"
                          >
                            <Tag className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="font-medium mb-2">Download for Offline Use</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Save your favorite places for when you're off the grid
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-teal-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {isOfflineAvailable.length} of {savedPlaces.length} places available offline
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Download Selected</Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
