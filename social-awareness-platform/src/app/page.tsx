import React from 'react'

export default function Home() {
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
    </main>
  );
}
