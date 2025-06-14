import React, { useState, useRef, useEffect } from 'react'

interface SocialIssueCardProps {
  title: string
  description: string
  category: string
  severity: 'low' | 'medium' | 'high'
  imageUrl?: string
  onLearnMore: (issueId: string) => void
}

export default function SocialIssueCard({ 
  title, 
  description, 
  category, 
  severity, 
  imageUrl, 
  onLearnMore 
}: SocialIssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setViewCount(prev => prev + 1)
        }
      },
      { threshold: 0.5 }
    )

    const currentCardRef = cardRef.current
    if (currentCardRef) {
      observer.observe(currentCardRef)
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef)
      }
    }
  }, [])

  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const handleLearnMore = () => {
    onLearnMore(title.toLowerCase().replace(/\s+/g, '-'))
  }

  return (
    <div ref={cardRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
      {imageUrl && (
        <div className="h-48 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className="h-full bg-black bg-opacity-20"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
            {severity === 'high' ? 'Високий рівень' : severity === 'medium' ? 'Середній рівень' : 'Низький рівень'}
          </span>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1 rounded-full transition-colors ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ★
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{category}</p>
        
        <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
          {description}
        </p>

        {description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium mt-2"
          >
            {isExpanded ? 'Згорнути' : 'Читати далі'}
          </button>
        )}

        <div className="flex justify-between items-center mt-4">
                      <button
              onClick={handleLearnMore}
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
            >
              Дізнатись більше
            </button>
            
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Переглядів: {viewCount}</span>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Поділитись
              </button>
            </div>
        </div>
      </div>
    </div>
  )
} 