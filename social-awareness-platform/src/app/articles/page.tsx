'use client'

import React, { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  readTime: number
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'Розуміння соціальної нерівності в Україні',
          excerpt: 'Аналіз причин та наслідків соціальної нерівності в сучасному українському суспільстві.',
          content: 'Детальний аналіз соціальної нерівності...',
          category: 'Соціальна політика',
          author: 'Іван Петренко',
          publishDate: '2025-05-15',
          readTime: 8
        },
        {
          id: '2',
          title: 'Цифрова трансформація та її вплив на суспільство',
          excerpt: 'Як цифрові технології змінюють наше повсякденне життя та створюють нові виклики.',
          content: 'Цифрова революція приносить як можливості, так і ризики...',
          category: 'Технології',
          author: 'Марія Коваленко',
          publishDate: '2025-05-10',
          readTime: 6
        },
        {
          id: '3',
          title: 'Екологічна свідомість молоді',
          excerpt: 'Дослідження екологічних настроїв серед української молоді та їх готовності до змін.',
          content: 'Молоде покоління все більше усвідомлює екологічні проблеми...',
          category: 'Екологія',
          author: 'Олександр Сидоренко',
          publishDate: '2025-05-08',
          readTime: 5
        }
      ]
      
      setArticles(mockArticles)
      setLoading(false)
    }

    fetchArticles()
  }, [])

  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Завантаження статей...</p>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Статті</h1>
          <p className="text-gray-600 dark:text-gray-300">На жаль, статей поки що немає.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Освітні матеріали</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Пошук статей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Всі категорії' : category}
            </option>
          ))}
        </select>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300">За вашим запитом статей не знайдено.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{article.readTime} хв читання</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Автор: {article.author}</span>
                  <span>{new Date(article.publishDate).toLocaleDateString('uk-UA')}</span>
                </div>
                
                <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Читати повністю
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 