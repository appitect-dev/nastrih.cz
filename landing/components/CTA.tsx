'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTA() {

  const handleSignupClick = () => {
    // In real app, this would navigate to signup
  }

  const benefits = [
    'Neomezené rezervace',
    'SMS & Email notifikace',
    'Podpora v češtině',
    'Bez závazků'
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-charcoal to-charcoal/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA content */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Začněte přijímat rezervace
            <span className="block text-gold mt-2">ještě dnes</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Vyzkoušejte nastřih.cz ještě dnes – bez rizika a bez závazků.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleSignupClick}
            >
              Vyzkoušet 14 dní zdarma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Zobrazit demo
            </Button>
          </div>
        </div>

        {/* Benefits list */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">
            Co dostanete v bezplatné zkušební verzi:
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-white"
              >
                <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-300">
            <p>
              ✨ <strong>14 dní zdarma</strong> • ✨ <strong>Bez platební karty</strong> • ✨ <strong>Zrušení kdykoliv</strong>
            </p>
          </div>
        </div>

        {/* Urgency element */}
        <div className="mt-8 text-center">
          <p className="text-gold font-medium">
            🚀 Připojuje se k nám průměrně 20 nových salonů týdně
          </p>
        </div>
      </div>
    </section>
  )
}