import React from "react"
import { Outlet } from "react-router-dom"
import BottomNavigation from "@/components/organisms/BottomNavigation"

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pb-16">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default Layout