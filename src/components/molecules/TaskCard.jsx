import React from "react"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const TaskCard = ({ task, onComplete, onEdit }) => {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'error'
      case 'medium': return 'warning' 
      case 'low': return 'info'
      default: return 'secondary'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'उच्च'
      case 'medium': return 'मध्यम'
      case 'low': return 'कमी'
      default: return priority
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'crop': return 'Sprout'
      case 'livestock': return 'Cow'
      case 'irrigation': return 'Droplets'
      case 'general': return 'CheckSquare'
      default: return 'Circle'
    }
  }

  return (
    <Card className={`p-4 ${task.completed ? 'opacity-70 bg-gray-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            task.completed 
              ? 'bg-success text-white' 
              : 'bg-gradient-to-br from-green-100 to-green-200 text-primary'
          }`}>
            <ApperIcon 
              name={task.completed ? 'Check' : getCategoryIcon(task.category)} 
              size={18} 
            />
          </div>
          <div className="flex-1">
            <h4 className={`font-medium devanagari-text font-body ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h4>
            {task.description && (
              <p className={`text-sm mt-1 devanagari-text font-body ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <Badge variant={getPriorityVariant(task.priority)}>
          {getPriorityLabel(task.priority)}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <ApperIcon name="Calendar" size={14} className="mr-1" />
            <span className="devanagari-text font-body">
              {format(new Date(task.dueDate), 'dd/MM/yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Clock" size={14} className="mr-1" />
            <span className="devanagari-text font-body">
              {format(new Date(task.dueDate), 'HH:mm')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!task.completed && onComplete && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onComplete(task.Id)}
            >
              <ApperIcon name="Check" size={14} className="mr-1" />
              पूर्ण
            </Button>
          )}
          {onEdit && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(task.Id)}
            >
              <ApperIcon name="Edit2" size={14} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default TaskCard