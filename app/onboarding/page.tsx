"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full h-64 mb-8 rounded-2xl overflow-hidden relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image src="/images/hero-van.jpg" alt="Campervan by a lake" fill className="object-cover" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-3 text-sage-800 dark:text-sage-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Welcome to Campwise
        </motion.h1>

        <motion.p
          className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Your AI-powered companion for exploring Australia & New Zealand in your campervan
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/onboarding/step-1">
            <Button className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="p-6 text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        By continuing, you agree to our Terms of Service & Privacy Policy
      </motion.div>
    </div>
  )
}
