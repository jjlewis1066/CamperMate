import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

export default function OnboardingStep2() {
  return (
    <div className="container max-w-md px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-sage-800 dark:text-sage-200">Where are you starting from?</h1>
        <p className="text-gray-600 dark:text-gray-400">We'll find great camping spots near you</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <Input
            className="pl-10 py-6 bg-white dark:bg-gray-800 border-sage-200 dark:border-gray-700 rounded-xl"
            placeholder="Search for a location..."
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <Button
          variant="outline"
          className="w-full py-6 text-lg border-sage-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Use Current Location
        </Button>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">Popular Starting Points</h3>
          <div className="space-y-2">
            {["Auckland, NZ", "Sydney, AU", "Queenstown, NZ", "Melbourne, AU"].map((location) => (
              <div
                key={location}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link href="/onboarding/step-3">
        <Button className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Continue</Button>
      </Link>
    </div>
  )
}
