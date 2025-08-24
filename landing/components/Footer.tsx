import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {

  const footerLinks = {
    product: [
      { name: 'Funkce', href: '#' },
      { name: 'Ceny', href: '#' },
      { name: 'Demo', href: '#' },
      { name: 'API', href: '#' }
    ],
    support: [
      { name: 'Nápověda', href: '#' },
      { name: 'Kontakt', href: '#' },
      { name: 'Školení', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    company: [
      { name: 'O nás', href: '#' },
      { name: 'Kariéra', href: '#' },
      { name: 'Partneři', href: '#' },
      { name: 'Tiskové zprávy', href: '#' }
    ],
    legal: [
      { name: 'Podmínky použití', href: '#' },
      { name: 'Ochrana soukromí', href: '#' },
      { name: 'GDPR', href: '#' },
      { name: 'Cookies', href: '#' }
    ]
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              nastřih<span className="text-gold">.cz</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Profesionální rezervační systém pro kadeřníky a barbery. 
              Pomáháme salonům růst a zákazníkům rezervovat jednoduše.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-gold" />
                <span>info@nastrih.cz</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-gold" />
                <span>+420 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Plzeň, Česká republika</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Rychlé odkazy</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">Funkce</a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">Ceny</a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">Demo</a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">Nápověda</a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">Kontakt</a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">O nás</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Právní</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-gold transition-all duration-300">Podmínky použití</a>
              <a href="#" className="block text-gray-300 hover:text-gold transition-all duration-300">Ochrana soukromí</a>
              <a href="#" className="block text-gray-300 hover:text-gold transition-all duration-300">GDPR</a>
              <a href="#" className="block text-gray-300 hover:text-gold transition-all duration-300">Cookies</a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="py-4 border-t border-gray-700/50">
          <div className="text-center text-gray-400 text-xs">
            © 2025 nastřih<span className="text-gold">.cz</span> • Všechna práva vyhrazena.
          </div>
        </div>
      </div>
    </footer>
  )
}