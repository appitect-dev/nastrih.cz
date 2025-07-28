import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import WhyUs from '@/components/WhyUs'

export default function Home() {
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyUs />
      <HowItWorks />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </div>
  )
}