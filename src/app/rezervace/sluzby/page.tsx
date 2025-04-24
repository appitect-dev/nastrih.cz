'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ServiceSelector from '@/components/ServiceSelector';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

export default function ServicesPage() {
  const router = useRouter();
  const { theme } = useBookingTheme();

  useEffect(() => {
    // Clear all reservation data when returning to services page
    sessionStorage.removeItem('selectedService');
    sessionStorage.removeItem('selectedBarber');
    sessionStorage.removeItem('selectedDate');
    sessionStorage.removeItem('selectedTime');
  }, []);

  const handleContinue = () => {
    const selectedService = sessionStorage.getItem('selectedService');
    if (!selectedService) {
      alert('Prosím vyberte službu pro pokračování');
      return;
    }
    router.push('/rezervace/termin');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Barbershop Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2" style={{ color: theme.textColor }}>The Barber House</h1>
        <p className="text-lg text-gray-600">Vinohradská 1233/22, Praha 2</p>
        <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="font-medium">4.9</span>
          <span className="text-sm">(180+ hodnocení)</span>
        </div>
      </div>

      {/* Service Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <ServiceSelector />
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleContinue}
          className="text-white px-8 py-3 rounded-xl font-bold transition-colors text-lg flex items-center gap-2 hover:brightness-90"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <span>Pokračovat</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 