import React, { useState } from 'react'
import SocialIssueCard from './SocialIssueCard'

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

interface QuizComponentProps {
  questions: QuizQuestion[]
  onQuizComplete: (score: number, totalQuestions: number) => void
  showRelatedIssues: boolean
}

export default function QuizComponent({ 
  questions, 
  onQuizComplete, 
  showRelatedIssues 
}: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  const currentQuizQuestion = questions[currentQuestion]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newUserAnswers = [...userAnswers, selectedAnswer]
    setUserAnswers(newUserAnswers)

    if (selectedAnswer === currentQuizQuestion.correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
      onQuizComplete(selectedAnswer === currentQuizQuestion.correctAnswer ? score + 1 : score, questions.length)
    }
  }

  const handleLearnMore = (issueId: string) => {
    console.log(`Переходимо до детальної інформації про: ${issueId}`)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
    setUserAnswers([])
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Питання для квізу не завантажені</p>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Квіз завершено!</h2>
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">{score}</span>
            <span className="text-gray-600"> з {questions.length}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Ваш результат: {percentage}%</span>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Пройти знову
            </button>
          </div>
        </div>

        {showRelatedIssues && (
          <div>
                         <h3 className="text-xl font-semibold text-gray-800 mb-4">Пов&apos;язані соціальні питання:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {questions.slice(0, 2).map((question, index) => (
                <SocialIssueCard
                  key={index}
                  title={question.relatedIssue.title}
                  description={question.relatedIssue.description}
                  category={question.relatedIssue.category}
                  severity={question.relatedIssue.severity}
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Питання {currentQuestion + 1} з {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              Правильних відповідей: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuizQuestion.question}
        </h2>

        <div className="space-y-3 mb-6">
          {currentQuizQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`w-full py-3 rounded-md font-medium transition-colors ${
            selectedAnswer !== null
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestion + 1 === questions.length ? 'Завершити квіз' : 'Наступне питання'}
        </button>
      </div>
    </div>
  )
} 