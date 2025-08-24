import { Star } from 'lucide-react'

export default function Testimonials() {

  const testimonials = [
    {
      name: 'Petr Novák',
      role: 'Majitel salonu',
      business: 'Barber Shop Praha',
      image: 'https://images.pexels.com/photos/7697443/pexels-photo-7697443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 5,
      quote: 'Díky nastřih.cz jsme snížili nezodpovědné zákazníky o 80%. SMS připomínky fungují skvěle a klienti si pochvalují jednoduchost rezervace.'
    },
    {
      name: 'Anna Svobodová',
      role: 'Kadeřnice',
      business: 'Hair Studio Brno',
      image: 'https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 5,
      quote: 'Konečně mám čas na to nejdůležitější - na zákazníky. Systém mi ušetří hodiny týdně a rezervace probíhají hladce.'
    },
    {
      name: 'Martin Černý',
      role: 'Barber',
      business: 'Classic Cuts Ostrava',
      image: 'https://images.pexels.com/photos/7755225/pexels-photo-7755225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 5,
      quote: 'Nastavení bylo skutečně jednoduché. Za 10 minut jsem měl hotovo a hned jsem začal přijímat první objednávky online.'
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-beige/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Co říkají naši zákazníci
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Připojte se k stovkám spokojených salonů, které už používají nastřih.cz 
            pro svoje online rezervace.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.business}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-charcoal">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold text-gold mb-2">4.9/5</div>
                <div className="text-sm text-gray-600">Průměrné hodnocení</div>
                <div className="flex justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-gray-600">Aktivních salonů</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold mb-2">50k+</div>
                <div className="text-sm text-gray-600">Úspěšných rezervací</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold mb-2">2019</div>
                <div className="text-sm text-gray-600">Rok založení</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}