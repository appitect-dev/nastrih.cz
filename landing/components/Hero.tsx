'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, CreditCard, X } from 'lucide-react'

export default function Hero() {

  const handleCTAClick = () => {
    // In real app, this would navigate to signup
  }

  return (
    <section className="relative bg-gradient-to-br from-beige to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-sage/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pt-24 sm:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
              Rezervace pro váš{' '}
              <span className="text-gold">kadeřnický salon</span>{' '}
              24/7
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Moderní rezervační systém pro kadeřníky a barbery. Přijímejte objednávky 24/7, snižte počet neuskutečněných schůzek a nabídněte klientům profi zážitek z objednání.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-charcoal hover:bg-charcoal/90 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleCTAClick}
              >
                Vyzkoušet zdarma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Zobrazit demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" />
                <span>14 dní zdarma</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gold" />
                <span>Bez platební karty</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-gold" />
                <span>Zrušení kdykoliv</span>
              </div>
            </div>
          </div>

          {/* Right column - Hero image */}
          <div className="relative">
            {/* MacBook mockup */}
            <div className="relative mb-8">
              <img 
                src="https://assets.macaly-user-data.dev/v7eevvyatzt7yn3x4dn01fmd/agiuesu295ny92yuh9x5rszu/y2fAjFO0IHPTk6wFxkNN-/tmpm2gfgmo2.webp"
                alt="Nastřih.cz dashboard na MacBooku"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* iPhone mockup - positioned as floating element */}
            <div className="absolute -bottom-8 -right-8 w-48 sm:w-56">
              <img 
                src="https://assets.macaly-user-data.dev/v7eevvyatzt7yn3x4dn01fmd/agiuesu295ny92yuh9x5rszu/ctyO5lHh_voi6Fg55upA5/tmpizo1sq2m.webp"
                alt="Nastřih.cz mobilní aplikace na iPhonu"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating card - booking preview
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-charcoal">Nová rezervace</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Pavel Novák</div>
                <div>Střih + vousy</div>
                <div className="text-sage font-medium">Dnes 14:30</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}