import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { href: '/', label: 'Головна' },
      { href: '/articles', label: 'Статті' },
      { href: '/contact', label: 'Контакти' }
    ],
    social: [
      { href: '#', label: 'Facebook' },
      { href: '#', label: 'Twitter' },
      { href: '#', label: 'Instagram' },
      { href: '#', label: 'LinkedIn' }
    ]
  }

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Платформа соціальної обізнаності</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ми працюємо над підвищенням обізнаності щодо важливих соціальних питань 
              та сприяємо позитивним змінам у суспільстві.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Соціальні мережі</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Платформа соціальної обізнаності. Всі права захищені.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Політика конфіденційності
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 