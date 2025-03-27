"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function HealthAppsPage() {
  const [isAndroid, setIsAndroid] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect platform on client side
    const userAgent = navigator.userAgent || navigator.vendor || ""
    setIsAndroid(/android/i.test(userAgent))
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window))
  }, [])

  const openOmronApp = () => {
    if (isAndroid) {
      // Android intent format for more reliable deep linking
      window.location.href =
        "intent://jp.co.omron.healthcare.omron_connect.ui.SplashScreenActivity#Intent;" +
        "scheme=omronconnect;" +
        "package=jp.co.omron.healthcare.omron_connect;" +
        "S.browser_fallback_url=https://play.google.com/store/apps/details?id=jp.co.omron.healthcare.omron_connect;" +
        "end"
    } else if (isIOS) {
      // iOS URL scheme
      // Try to open the app first
      window.location.href = "omronconnect://"

      // Fallback to App Store after a short delay if app isn't installed
      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/omron-connect/id1003177043"
      }, 500)
    } else {
      // Fallback for other platforms
      window.location.href = "omronconnect://"
    }
  }

  const openHealthTreeApp = () => {
    if (isAndroid) {
      // Android intent format
      window.location.href =
        "intent://com.jks.Spo2MonitorEx.app.GuidePage#Intent;" +
        "scheme=healthtree;" +
        "package=com.jks.Spo2MonitorEx;" +
        "S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.jks.Spo2MonitorEx;" +
        "end"
    } else if (isIOS) {
      // iOS URL scheme with App Store fallback
      window.location.href = "healthtree://"

      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/healthtree/id1526557099"
      }, 500)
    } else {
      window.location.href = "healthtree://"
    }
  }

  const openBeurerApp = () => {
    if (isAndroid) {
      // Android intent format
      window.location.href =
        "intent://com.beurer.healthmanager.ui.activity.FragmentActivity#Intent;" +
        "scheme=beurer;" +
        "package=com.beurer.healthmanager;" +
        "S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.beurer.healthmanager;" +
        "end"
    } else if (isIOS) {
      // iOS URL scheme with App Store fallback
      window.location.href = "beurer://"

      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/beurer-healthmanager/id1057741667"
      }, 500)
    } else {
      window.location.href = "beurer://"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">Health Monitoring Apps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* BP Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">Monitor your BP using the Omron Connect app.</p>
            <Button className="w-full py-3 text-lg" onClick={openOmronApp}>
              BP - Omron Connect app
            </Button>
          </CardContent>
        </Card>

        {/* Oxygen Saturation Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Oxygen Saturation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">Check your oxygen levels with the HealthTree app.</p>
            <Button className="w-full py-3 text-lg" onClick={openHealthTreeApp}>
              OxySat - HealthTree app
            </Button>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Body Temperature</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Track your temperature using the Beurer Health Manager Pro App.
            </p>
            <Button className="w-full py-3 text-lg" onClick={openBeurerApp}>
              Temperature - Beurer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

