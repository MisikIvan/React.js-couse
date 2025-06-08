'use client'

import React, { useState } from 'react'
import SocialIssueCard from '../components/SocialIssueCard'
import NotificationPortal from '../components/NotificationPortal'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)

  const sampleIssues = [
    {
      title: "Бездомність у великих містах",
      description: "Зростання кількості людей без постійного житла є серйозною проблемою, що потребує комплексного підходу до вирішення. Включає в себе не лише забезпечення тимчасовим житлом, але й програми реінтеграції в суспільство.",
      category: "Соціальна політика",
      severity: "high" as const,
      imageUrl: "/api/placeholder/400/200"
    },
    {
      title: "Цифрова нерівність",
      description: "Відсутність доступу до інтернету та цифрових технологій створює додаткові бар'єри для освіти та працевлаштування.",
      category: "Технології та освіта",
      severity: "medium" as const
    }
  ]

  const quizQuestions = [
    {
      id: "q1",
      question: "Яка найбільша причина бездомності у великих містах?",
      options: [
        "Недостатня кількість доступного житла",
        "Особисті проблеми людей",
        "Відсутність роботи",
        "Погана погода"
      ],
      correctAnswer: 0,
      relatedIssue: {
        title: "Бездомність у великих містах",
        description: "Проблема доступного житла впливає на мільйони людей",
        category: "Соціальна політика",
        severity: "high" as const
      }
    },
    {
      id: "q2", 
      question: "Що таке цифрова нерівність?",
      options: [
        "Різниця в швидкості інтернету",
        "Нерівний доступ до цифрових технологій",
        "Різні ціни на комп'ютери",
        "Складність використання програм"
      ],
      correctAnswer: 1,
      relatedIssue: {
        title: "Цифрова нерівність",
        description: "Відсутність рівного доступу до технологій",
        category: "Технології та освіта", 
        severity: "medium" as const
      }
    }
  ]

  const handleLearnMore = (issueId: string) => {
    console.log(`Перехід до сторінки: ${issueId}`)
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Платформа соціальної обізнаності
        </h1>
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Дізнайтеся більше про важливі соціальні питання та долучайтеся до позитивних змін у суспільстві
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Пройти тест на знання соціальних питань
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sampleIssues.map((issue, index) => (
            <SocialIssueCard
              key={index}
              title={issue.title}
              description={issue.description}
              category={issue.category}
              severity={issue.severity}
              imageUrl={issue.imageUrl}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Соціальні проблеми</h2>
            <p className="text-gray-600">
              Дослідіть актуальні соціальні виклики нашого часу
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Освітні матеріали</h2>
            <p className="text-gray-600">
              Поглибте свої знання через статті та ресурси
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Інтерактивні квізи</h2>
            <p className="text-gray-600">
              Перевірте свої знання за допомогою цікавих тестів
            </p>
          </div>
        </div>
      </div>

      <NotificationPortal
        showQuiz={showQuiz}
        quizQuestions={quizQuestions}
        position="top-right"
        onQuizToggle={() => setShowQuiz(!showQuiz)}
      />
    </main>
  )
}
