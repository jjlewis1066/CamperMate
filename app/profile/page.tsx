"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Award, Trophy, Star, Zap, Edit, Camera, Moon, Sun, HelpCircle, Settings, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userType, setUserType] = useState("Solo Vanlifer")
  const [showEditProfile, setShowEditProfile] = useState(false)
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

  // Achievements data
  const achievements = [
    {
      id: "first-trip",
      name: "First Trip",
      description: "Completed your first camping trip",
      icon: Trophy,
      earned: true,
      date: "May 12, 2023",
    },
    {
      id: "explorer",
      name: "Explorer",
      description: "Visited 5 different regions",
      icon: Compass,
      earned: true,
      date: "July 3, 2023",
    },
    {
      id: "social",
      name: "Social Camper",
      description: "Shared 3 campsite reviews",
      icon: Star,
      earned: true,
      date: "August 15, 2023",
    },
    {
      id: "planner",
      name: "Master Planner",
      description: "Created 5 trip plans",
      icon: Map,
      earned: false,
      progress: 3,
      total: 5,
    },
    {
      id: "offgrid",
      name: "Off-Grid Pro",
      description: "Stayed at 10 remote campsites",
      icon: Zap,
      earned: false,
      progress: 6,
      total: 10,
    },
  ]

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
    toast({
      title: "Profile Updated",
      description: `Your profile type has been updated to ${value}`,
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    toast({
      title: isDarkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: `Switched to ${isDarkMode ? "light" : "dark"} mode`,
    })
  }

  function Compass(props: any) {
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
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`container px-4 pb-20 pt-6 ${isDarkMode ? "dark" : ""}`}>
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-sage-700 dark:text-sage-300">Profile</h1>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full overflow-hidden relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Image src="/images/profile-avatar.jpg" alt="Profile avatar" fill className="object-cover" />
          </motion.div>
          <motion.button
            className="absolute -right-1 -bottom-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Sarah Johnson</h2>
            <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
              <DialogTrigger asChild>
                <motion.button
                  className="text-gray-500 hover:text-teal-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Sarah Johnson" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="sarah@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Camper Type</Label>
                    <Select defaultValue={userType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select camper type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solo Vanlifer">Solo Vanlifer</SelectItem>
                        <SelectItem value="Family Camper">Family Camper</SelectItem>
                        <SelectItem value="Weekend Warrior">Weekend Warrior</SelectItem>
                        <SelectItem value="Full-time Nomad">Full-time Nomad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowEditProfile(false)}>Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 dark:text-gray-400">Van Lifer • Since 2023</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
          <div className="mt-1">
            <Select defaultValue={userType} onValueChange={handleUserTypeChange}>
              <SelectTrigger className="h-7 text-xs w-40">
                <SelectValue placeholder="Select camper type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Solo Vanlifer">Solo Vanlifer</SelectItem>
                <SelectItem value="Family Camper">Family Camper</SelectItem>
                <SelectItem value="Weekend Warrior">Weekend Warrior</SelectItem>
                <SelectItem value="Full-time Nomad">Full-time Nomad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="account" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4 space-y-4">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p>sarah@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Membership</p>
                      <p>Free Plan</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full mt-2">
                        Edit Profile
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Camper Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle Type</p>
                      <p>Van - Mercedes Sprinter</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Preferences</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          Free camping
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          Beach
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          Off-grid
                        </motion.div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full mt-2">
                        Update Preferences
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        <TabsContent value="preferences" className="mt-4 space-y-4">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">App Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get alerts about closures</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Switch defaultChecked />
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Offline Maps</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Auto-download areas</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Switch defaultChecked />
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Distance Units</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Kilometers or miles</p>
                      </div>
                      <div className="text-sm font-medium">KM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">AI Assistant Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">AI Suggestions</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Personalized recommendations</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Switch defaultChecked />
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Help improve the app</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Switch />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        <TabsContent value="achievements" className="mt-4 space-y-4">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Card className="rounded-xl border-sage-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Your Achievements</h3>
                    <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                      3 / 5 Earned
                    </div>
                  </div>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          achievement.earned ? "bg-teal-50 dark:bg-teal-900/20" : "bg-gray-50 dark:bg-gray-800"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned
                              ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          <achievement.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{achievement.name}</h4>
                            {achievement.earned && <Award className="w-4 h-4 text-amber-500" />}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                          {achievement.earned ? (
                            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                              Earned on {achievement.date}
                            </p>
                          ) : (
                            <div className="mt-1">
                              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-teal-500 rounded-full"
                                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {achievement.progress} of {achievement.total} completed
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: 0.8 }}
      >
        <motion.div variants={item} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-400">
            <HelpCircle className="w-5 h-5 mr-2" />
            Help & Support
          </Button>
        </motion.div>
        <motion.div variants={item} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-400">
            <Settings className="w-5 h-5 mr-2" />
            App Settings
          </Button>
        </motion.div>
        <motion.div variants={item} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
