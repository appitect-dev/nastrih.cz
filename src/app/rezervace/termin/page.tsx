'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from '@/components/DatePicker';
import TimeSlotSelector from '@/components/TimeSlotSelector';
import BarberSelector from '@/components/BarberSelector';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

export default function AppointmentPage() {
  const router = useRouter();
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { theme } = useBookingTheme();

  useEffect(() => {
    // Check if service is selected
    const selectedService = sessionStorage.getItem('selectedService');
    if (!selectedService) {
      router.push('/rezervace/sluzby');
      return;
    }

    // Load previously selected values if they exist
    const savedBarber = sessionStorage.getItem('selectedBarber');
    const savedDate = sessionStorage.getItem('selectedDate');
    const savedTime = sessionStorage.getItem('selectedTime');
    
    if (savedBarber) setSelectedBarber(savedBarber);
    if (savedDate) setSelectedDate(savedDate);
    if (savedTime) setSelectedTime(savedTime);
  }, [router]);

  const handleBarberSelect = (barberId: string) => {
    setSelectedBarber(barberId);
    // Clear date and time when barber changes
    setSelectedDate('');
    setSelectedTime('');
    sessionStorage.setItem('selectedBarber', barberId);
    sessionStorage.removeItem('selectedDate');
    sessionStorage.removeItem('selectedTime');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Clear time when date changes
    setSelectedTime('');
    sessionStorage.setItem('selectedDate', date);
    sessionStorage.removeItem('selectedTime');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    sessionStorage.setItem('selectedTime', time);
  };

  const handleContinue = () => {
    if (!selectedBarber) {
      alert('Prosím vyberte holiče pro pokračování');
      return;
    }
    if (!selectedDate) {
      alert('Prosím vyberte datum pro pokračování');
      return;
    }
    if (!selectedTime) {
      alert('Prosím vyberte čas pro pokračování');
      return;
    }
    router.push('/rezervace/shrnuti');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-8">
        {/* Barber Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <BarberSelector onBarberSelect={handleBarberSelect} />
        </div>

        {/* Date Selection - only show if barber is selected */}
        {selectedBarber && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <DatePicker onDateSelect={handleDateSelect} />
          </div>
        )}

        {/* Time Selection - only show if date is selected */}
        {selectedBarber && selectedDate && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <TimeSlotSelector
              selectedDate={selectedDate}
              onTimeSelect={handleTimeSelect}
              barberId={selectedBarber} // Pass barberId to show only their available times
            />
          </div>
        )}

        {/* Continue Button */}
        <div className="flex justify-end">
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
    </div>
  );
} 