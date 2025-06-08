import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import QuizComponent from './QuizComponent'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  duration?: number
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  relatedIssue: {
    title: string
    description: string
    category: string
    severity: 'low' | 'medium' | 'high'
  }
}

interface NotificationPortalProps {
  showQuiz: boolean
  quizQuestions: QuizQuestion[]
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  onQuizToggle: () => void
}

export default function NotificationPortal({ 
  showQuiz, 
  quizQuestions, 
  position,
  onQuizToggle 
}: NotificationPortalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [portalElement, setPortalElement] = useState<Element | null>(null)

  useEffect(() => {
    let element = document.getElementById('notification-portal')
    if (!element) {
      element = document.createElement('div')
      element.id = 'notification-portal'
      document.body.appendChild(element)
    }
    setPortalElement(element)

    return () => {
      const existingElement = document.getElementById('notification-portal')
      if (existingElement && existingElement.children.length === 0) {
        document.body.removeChild(existingElement)
      }
    }
  }, [])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      duration: notification.duration || 5000
    }
    
    setNotifications(prev => [...prev, newNotification])

    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, newNotification.duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100)
    
    let notificationType: 'success' | 'warning' | 'error' = 'success'
    let message = ''

    if (percentage >= 80) {
      notificationType = 'success'
      message = `Відмінний результат! Ви правильно відповіли на ${score} з ${totalQuestions} питань.`
    } else if (percentage >= 60) {
      notificationType = 'warning' 
      message = `Добрий результат! Ви правильно відповіли на ${score} з ${totalQuestions} питань.`
    } else {
      notificationType = 'error'
      message = `Потрібно попрацювати більше. Ви правильно відповіли на ${score} з ${totalQuestions} питань.`
    }

    addNotification({
      type: notificationType,
      title: 'Квіз завершено',
      message,
      duration: 8000
    })
  }

  const getNotificationStyles = (type: string) => {
    const baseStyles = 'px-4 py-3 rounded-lg shadow-lg border-l-4 mb-3 transition-all duration-300'
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-500 text-green-800`
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800`
      case 'error':
        return `${baseStyles} bg-red-50 border-red-500 text-red-800`
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`
      default:
        return `${baseStyles} bg-gray-50 border-gray-500 text-gray-800`
    }
  }

  const getPositionStyles = () => {
    const baseStyles = 'fixed z-50 max-w-sm'
    
    switch (position) {
      case 'top-right':
        return `${baseStyles} top-4 right-4`
      case 'top-left':
        return `${baseStyles} top-4 left-4`
      case 'bottom-right':
        return `${baseStyles} bottom-4 right-4`
      case 'bottom-left':
        return `${baseStyles} bottom-4 left-4`
      default:
        return `${baseStyles} top-4 right-4`
    }
  }

  const NotificationList = () => (
    <div className={getPositionStyles()}>
      {notifications.map((notification) => (
        <div key={notification.id} className={getNotificationStyles(notification.type)}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  if (!portalElement) {
    return null
  }

  return (
    <>
      {createPortal(<NotificationList />, portalElement)}
      
      {showQuiz && quizQuestions.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-gray-50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={onQuizToggle}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
            >
              ×
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Тест на знання соціальних питань
              </h2>
              
              <QuizComponent
                questions={quizQuestions}
                onQuizComplete={handleQuizComplete}
                showRelatedIssues={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
} 