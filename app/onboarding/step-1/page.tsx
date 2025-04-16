"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function OnboardingStep1() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const camperTypes = [
    {
      name: "Van",
      description: "Campervan or small motorhome",
      icon: "🚐",
    },
    {
      name: "Car + Tent",
      description: "Car camping with a tent setup",
      icon: "🏕️",
    },
    {
      name: "4WD",
      description: "Off-road capable vehicle",
      icon: "🚙",
    },
    {
      name: "Luxury RV",
      description: "Large motorhome or caravan",
      icon: "🚍",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="container max-w-md px-4 py-8">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2 text-sage-800 dark:text-sage-200">What type of camper are you?</h1>
        <p className="text-gray-600 dark:text-gray-400">We'll customize your experience based on your setup</p>
      </motion.div>

      <motion.div className="space-y-3 mb-8" variants={container} initial="hidden" animate="show">
        {camperTypes.map((type) => (
          <motion.div key={type.name} variants={item}>
            <Card
              className={`rounded-xl border-sage-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 cursor-pointer transition-colors ${
                selectedType === type.name ? "border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/20" : ""
              }`}
              onClick={() => setSelectedType(type.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="text-3xl"
                      animate={selectedType === type.name ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {type.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${selectedType === type.name ? "text-teal-500" : "text-gray-400"}`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/onboarding/step-2">
          <Button className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Continue</Button>
        </Link>
      </motion.div>
    </div>
  )
}
