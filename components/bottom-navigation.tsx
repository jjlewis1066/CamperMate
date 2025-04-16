"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Map, Route, Heart, MessageSquareText, User } from "lucide-react"
import { motion } from "framer-motion"

export function BottomNavigation() {
  const pathname = usePathname()

  // Don't show navigation on onboarding screens
  if (pathname.startsWith("/onboarding")) {
    return null
  }

  const navItems = [
    {
      name: "Map",
      href: "/map",
      icon: Map,
    },
    {
      name: "Plan",
      href: "/plan",
      icon: Route,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Heart,
    },
    {
      name: "AI Bot",
      href: "/ai-bot",
      icon: MessageSquareText,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center relative",
                isActive ? "text-teal-600 dark:text-teal-400" : "text-gray-500 dark:text-gray-400",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navigation-indicator"
                  className="absolute -top-2 w-1/2 h-1 bg-teal-600 dark:bg-teal-400 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <item.icon className="w-6 h-6" />
              </motion.div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
