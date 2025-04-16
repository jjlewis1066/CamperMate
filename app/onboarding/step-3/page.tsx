import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingStep3() {
  const preferences = [
    {
      name: "Free camping",
      icon: "🏕️",
    },
    {
      name: "Paid campgrounds",
      icon: "💰",
    },
    {
      name: "Off-grid",
      icon: "🔋",
    },
    {
      name: "Beach",
      icon: "🏖️",
    },
    {
      name: "Forest",
      icon: "🌲",
    },
    {
      name: "Mountain views",
      icon: "⛰️",
    },
    {
      name: "Near towns",
      icon: "🏘️",
    },
    {
      name: "Remote",
      icon: "🧭",
    },
  ]

  return (
    <div className="container max-w-md px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-sage-800 dark:text-sage-200">What kind of places are you into?</h1>
        <p className="text-gray-600 dark:text-gray-400">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {preferences.map((pref) => (
          <Card
            key={pref.name}
            className="rounded-xl border-sage-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 cursor-pointer transition-colors"
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-2xl">{pref.icon}</div>
              <div className="font-medium text-sm">{pref.name}</div>
              <div className="ml-auto w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                {/* <Check className="w-3 h-3 text-white" /> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/">
        <Button className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
          Finish Setup
        </Button>
      </Link>
    </div>
  )
}
