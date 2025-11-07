import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import Layout from "@/components/organisms/Layout"

// Lazy loaded pages
const Home = lazy(() => import("@/components/pages/Home"))
const Crops = lazy(() => import("@/components/pages/Crops"))
const CropDetails = lazy(() => import("@/components/pages/CropDetails"))
const AddCrop = lazy(() => import("@/components/pages/AddCrop"))
const Livestock = lazy(() => import("@/components/pages/Livestock"))
const LivestockDetails = lazy(() => import("@/components/pages/LivestockDetails"))
const AddLivestock = lazy(() => import("@/components/pages/AddLivestock"))
const More = lazy(() => import("@/components/pages/More"))
const Irrigation = lazy(() => import("@/components/pages/Irrigation"))
const MarketPrices = lazy(() => import("@/components/pages/MarketPrices"))
const GovernmentSchemes = lazy(() => import("@/components/pages/GovernmentSchemes"))
const Settings = lazy(() => import("@/components/pages/Settings"))
const NotFound = lazy(() => import("@/components/pages/NotFound"))

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p className="text-primary font-body devanagari-text">लोड हो रहा है...</p>
    </div>
  </div>
)

// Main routes array
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    )
  },
  {
    path: "crops",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Crops />
      </Suspense>
    )
  },
  {
    path: "crops/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CropDetails />
      </Suspense>
    )
  },
  {
    path: "add-crop",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AddCrop />
      </Suspense>
    )
  },
  {
    path: "livestock",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Livestock />
      </Suspense>
    )
  },
  {
    path: "livestock/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LivestockDetails />
      </Suspense>
    )
  },
  {
    path: "add-livestock",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AddLivestock />
      </Suspense>
    )
  },
  {
  },
  {
    path: "more",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <More />
      </Suspense>
    )
  },
  {
    path: "irrigation",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Irrigation />
      </Suspense>
    )
  },
  {
    path: "market-prices",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MarketPrices />
      </Suspense>
    )
  },
  {
    path: "government-schemes",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GovernmentSchemes />
      </Suspense>
    )
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Settings />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
]

// Routes configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
]

export const router = createBrowserRouter(routes)