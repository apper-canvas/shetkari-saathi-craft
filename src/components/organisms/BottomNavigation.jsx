import React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const navigationItems = [
  {
    path: "/",
    label: "होम",
    icon: "Home"
  },
  {
    path: "/crops",
    label: "पीक",
    icon: "Sprout"
  },
  {
    path: "/livestock",
    label: "जनावरे",
    icon: "Cow"
  },
  {
    path: "/finance",
    label: "आर्थिक",
    icon: "IndianRupee"
  },
  {
    path: "/more",
    label: "आणखी",
    icon: "Menu"
  }
]

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center text-xs font-medium transition-all duration-200",
              "hover:bg-green-50 active:scale-95",
              isActive
                ? "text-primary bg-gradient-to-b from-green-50 to-transparent"
                : "text-gray-600"
            )}
          >
            <ApperIcon
              name={item.icon}
              size={20}
              className="mb-1"
            />
            <span className="devanagari-text font-body text-[10px]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation