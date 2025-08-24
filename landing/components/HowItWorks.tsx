import { UserPlus, Wrench, Palette, Share2, Calendar } from 'lucide-react'

export default function HowItWorks() {

  const steps = [
    {
      icon: UserPlus,
      title: 'Vytvořte si účet',
      description: 'Registrace zabere pouze 2 minuty. Žádné složité nastavování.'
    },
    {
      icon: Wrench,
      title: 'Přidejte služby',
      description: 'Nastavte si své služby, ceny a dostupné termíny podle vašich potřeb.'
    },
    {
      icon: Palette,
      title: 'Přizpůsobte vzhled',
      description: 'Upravte barvy a logo tak, aby rezervační stránka ladila s vaším salonem.'
    },
    {
      icon: Share2,
      title: 'Sdílejte odkaz',
      description: 'Pošlete zákazníkům odkaz nebo QR kód a začněte přijímat rezervace.'
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Jak to funguje?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Spuštění vám zabere méně času, než si stihnete uvařit kafe.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-20">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isNotLastStep = index < steps.length - 1
              
              return (
                <div 
                  key={index}
                  className="relative text-center group"
                >
                  {/* Connection line to next step */}
                  {isNotLastStep && (
                    <div className="hidden lg:block absolute top-8 left-3/4 w-1/2 h-0.5 bg-gradient-to-r from-gold to-sage z-0"></div>
                  )}
                  
                  {/* Step icon container */}
                  <div className="relative inline-block mb-6">
                    <div className="relative z-10 w-16 h-16 bg-white border-4 border-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="h-8 w-8 text-gold" />
                    </div>
                    
                    {/* Step number */}
                    <div className="absolute -top-1 -right-1 z-20 w-6 h-6 bg-gold text-white text-sm font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* App showcase */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
              Podívejte se, jak náš systém funguje
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Intuitivní rozhraní, které zvládne každý. Žádné složité manuály nebo školení.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
              <img 
                src="https://assets.macaly-user-data.dev/v7eevvyatzt7yn3x4dn01fmd/agiuesu295ny92yuh9x5rszu/KWEhbhf7BMFEbFwz5Qx8M/tmpd7whrg5m.webp"
                alt="Náhled rezervačního systému nastřih.cz"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Floating card - booking preview - now attached to app showcase */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-charcoal">Nová rezervace</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Pavel Novák</div>
              <div>Střih + vousy</div>
              <div className="text-gold font-medium">Dnes 14:30</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}