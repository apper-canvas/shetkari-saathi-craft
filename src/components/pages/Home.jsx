import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import WeatherWidget from "@/components/molecules/WeatherWidget"
import StatsCard from "@/components/molecules/StatsCard"
import TaskCard from "@/components/molecules/TaskCard"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import { weatherService } from "@/services/api/weatherService"
import { taskService } from "@/services/api/taskService"
import { cropService } from "@/services/api/cropService"
import { livestockService } from "@/services/api/livestockService"
import { transactionService } from "@/services/api/transactionService"

const Home = () => {
  const navigate = useNavigate()
  const [weather, setWeather] = useState(null)
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError("")

      const [
        weatherData,
        todayTasks,
        crops,
        livestock,
        thisMonthSummary
      ] = await Promise.all([
        weatherService.getCurrent(),
        taskService.getTodayTasks(),
        cropService.getAll(),
        livestockService.getAll(),
        transactionService.getSummary(new Date().getMonth(), new Date().getFullYear())
      ])

      setWeather(weatherData)
      setTasks(todayTasks)
      
      const activeCrops = crops.filter(crop => crop.stage !== 'कापणी संपली')
      const pendingTasks = todayTasks.filter(task => !task.completed)
      
      setStats({
        totalCrops: activeCrops.length,
        totalAnimals: livestock.length,
        pendingTasks: pendingTasks.length,
        monthlyProfit: thisMonthSummary.profit
      })

    } catch (err) {
      console.error("Error loading dashboard data:", err)
      setError("डेटा लोड करताना समस्या आली आहे")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleTaskComplete = async (taskId) => {
    try {
      await taskService.complete(taskId)
      setTasks(tasks.map(task => 
        task.Id === taskId ? { ...task, completed: true } : task
      ))
      toast.success("कार्य पूर्ण केले!")
    } catch (err) {
      console.error("Error completing task:", err)
      toast.error("कार्य पूर्ण करताना समस्या आली")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadDashboardData} />

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 devanagari-text mb-2">
          शेतकरी साथी
        </h1>
        <p className="text-gray-600 devanagari-text font-body">
          आज, {new Date().toLocaleDateString('mr-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Weather Widget */}
      <div className="mb-6">
        <WeatherWidget weather={weather} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatsCard
          title="सक्रिय पिके"
          value={stats.totalCrops}
          icon="Sprout"
          color="primary"
          onClick={() => navigate('/crops')}
        />
        <StatsCard
          title="एकूण जनावरे"
          value={stats.totalAnimals}
          icon="Cow"
          color="secondary"
          onClick={() => navigate('/livestock')}
        />
        <StatsCard
          title="आजची कामे"
          value={stats.pendingTasks}
          icon="CheckSquare"
          color="info"
          onClick={() => navigate('/tasks')}
        />
        <StatsCard
          title="मासिक नफा"
          value={`₹${stats.monthlyProfit?.toLocaleString() || '0'}`}
          icon="IndianRupee"
          color="success"
          onClick={() => navigate('/finance')}
        />
      </div>

      {/* Today's Tasks */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold devanagari-text">
            आजची कामे
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tasks')}
          >
            सर्व पहा
            <ApperIcon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>

        {tasks.length === 0 ? (
          <Empty
            title="आजची कोणती कामे नाहीत"
            description="तुमच्या आजच्या कामांची यादी येथे दिसेल"
            icon="Calendar"
          />
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                onComplete={handleTaskComplete}
              />
            ))}
            {tasks.length > 3 && (
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => navigate('/tasks')}
              >
                आणखी {tasks.length - 3} कामे पहा
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h2 className="text-lg font-display font-semibold devanagari-text mb-4">
          द्रुत कृती
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="primary"
            className="h-12 flex-col space-y-1"
            onClick={() => navigate('/add-crop')}
          >
            <ApperIcon name="Plus" size={16} />
            <span className="text-xs">नवीन पीक</span>
          </Button>
          <Button
            variant="secondary"
            className="h-12 flex-col space-y-1"
            onClick={() => navigate('/add-livestock')}
          >
            <ApperIcon name="Plus" size={16} />
            <span className="text-xs">नवीन जनावर</span>
          </Button>
          <Button
            variant="accent"
            className="h-12 flex-col space-y-1"
            onClick={() => navigate('/add-transaction')}
          >
            <ApperIcon name="Plus" size={16} />
            <span className="text-xs">व्यवहार नोंद</span>
          </Button>
          <Button
            variant="outline"
            className="h-12 flex-col space-y-1"
            onClick={() => navigate('/market-prices')}
          >
            <ApperIcon name="TrendingUp" size={16} />
            <span className="text-xs">बाजारभाव</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home