import { Clock, Palette, MessageSquare, Settings, Shield, Zap, Heart, Award } from 'lucide-react'

export default function Benefits() {

  const primaryBenefits = [
    {
      icon: Clock,
      title: '24/7 online rezervace',
      description: 'Vaši zákazníci si mohou rezervovat termín kdykoliv – i ve tři ráno. Už nikdy nezmeškáte objednávku.'
    },
    {
      icon: Palette,
      title: 'Vlastní design',
      description: 'Váš salon, váš styl. Přizpůsobte si vzhled systému tak, aby perfektně ladil s vaší značkou.'
    },
    {
      icon: MessageSquare,
      title: 'SMS & Email notifikace',
      description: 'Klienti nezapomenou. Automatické SMS a e-maily jim připomenou blížící se termín.'
    },
    {
      icon: Settings,
      title: 'Kompletní kontrola',
      description: 'Plná kontrola nad službami, cenami, dostupností i pracovní dobou – jednoduše a bez stresu.'
    }
  ]

  const whyChooseFeatures = [
    {
      icon: Heart,
      title: 'Vytvořeno pro kadeřníky',
      description: 'Náš tým spolupracoval s desítkami salonů, abychom vytvořili systém přesně podle vašich potřeb.',
      highlight: 'České prostředí'
    },
    {
      icon: Zap,
      title: 'Rychlé nasazení',
      description: 'Bez složitého nastavování nebo programování. Spustíte za pár minut a hned můžete začít.',
      highlight: 'Hotové za pár minut'
    },
    {
      icon: Shield,
      title: 'GDPR & bezpečnost',
      description: 'Všechna data jsou bezpečně uložena v EU. Plně v souladu s GDPR a českými zákony.',
      highlight: 'EU servery'
    },
    {
      icon: Award,
      title: 'Profesionální podpora',
      description: 'Podporu poskytujeme v češtině, e-mailem i telefonicky. Jsme tu pro vás každý pracovní den.',
      highlight: 'Česká podpora'
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Proč nastřih<span className="text-gold">.cz</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Šetřete čas, snižte počet zrušených schůzek a budujte loajalitu zákazníků.
          </p>
        </div>

        {/* Primary benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {primaryBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Why choose us features */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm mb-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
              Proč si vybrat právě nás?
            </h3>
            <p className="text-lg text-gray-600">
              Jsme víc než jen software. Jsme váš partner v růstu. Rozumíme českým holičům a víme, co opravdu potřebují.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {whyChooseFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={index}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-charcoal">
                        {feature.title}
                      </h4>
                      <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}