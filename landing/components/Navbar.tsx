'use client'

import { Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {

  const handleCTAClick = () => {
  }

  const handleLoginClick = () => {
  }

  const scrollToSection = (sectionId: string) => {
    // In real app, this would scroll to the section
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with simple animated scissors */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.location.href = '/'}
            >
              <div className="relative">
                <Scissors 
                  className="h-8 w-8 text-gold transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
                />
              </div>
              <span className="text-2xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
                nastřih<span className="text-gold">.cz</span>
              </span>
            </div>

          {/* Right side with navigation and CTA */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation moved to right */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-gold font-medium transition-colors duration-300"
              >
                Funkce
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-gold font-medium transition-colors duration-300"
              >
                Ceník
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-gold font-medium transition-colors duration-300"
              >
                Kontakt
              </button>
              <button 
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-gold font-medium transition-colors duration-300"
              >
                Přihlásit se
              </button>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={handleCTAClick}
              className="bg-gold hover:bg-gold/90 text-white px-6 py-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Vyzkoušet zdarma
            </Button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-gold transition-colors duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default, could be expanded with state */}
        <div className="md:hidden border-t border-gray-100 py-4 space-y-2 hidden">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gold hover:bg-gray-50 transition-colors duration-300"
          >
            Funkce
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gold hover:bg-gray-50 transition-colors duration-300"
          >
            Ceník
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gold hover:bg-gray-50 transition-colors duration-300"
          >
            Kontakt
          </button>
          <button 
            onClick={handleLoginClick}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gold hover:bg-gray-50 transition-colors duration-300"
          >
            Přihlásit se
          </button>
        </div>
      </div>
    </nav>
  )
}