'use client';

import { useState } from 'react';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

interface TimeSlotSelectorProps {
  selectedDate: string;
  barberId: string;
  onTimeSelect: (time: string) => void;
}

// In a real app, this would be an API call to get the barber's availability
const getBarberAvailability = (barberId: string, date: string) => {
  // This is just mock data - in reality, you would fetch this from your backend
  const baseSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of ['00', '30']) {
      // Skip lunch break
      if (hour === 12 && minute === '30') continue;
      if (hour === 13 && minute === '00') continue;
      
      baseSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
    }
  }

  // Simulate different availability for each barber
  switch (barberId) {
    case '1': // Tomáš Novák
      return baseSlots.filter(slot => {
        const hour = parseInt(slot.split(':')[0]);
        return hour >= 10 && hour <= 18; // Works 10:00 - 18:00
      });
    case '2': // Jan Svoboda
      return baseSlots.filter(slot => {
        const hour = parseInt(slot.split(':')[0]);
        return hour >= 9 && hour <= 17; // Works 9:00 - 17:00
      });
    case '3': // Martin Dvořák
      return baseSlots.filter(slot => {
        const hour = parseInt(slot.split(':')[0]);
        return hour >= 12 && hour <= 20; // Works 12:00 - 20:00
      });
    default:
      return baseSlots;
  }
};

export default function TimeSlotSelector({ selectedDate, barberId, onTimeSelect }: TimeSlotSelectorProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { theme } = useBookingTheme();
  const timeSlots = getBarberAvailability(barberId, selectedDate);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  if (!selectedDate) {
    return (
      <div className="text-gray-500 text-center py-4">
        Nejdřív prosím vyberte datum
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold" style={{ color: theme.textColor }}>Vyberte čas</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className="py-2 px-3 rounded-lg text-center transition-all"
            style={{ 
              backgroundColor: selectedTime === time ? theme.primaryColor : 'white',
              color: selectedTime === time ? 'white' : theme.textColor,
              borderWidth: '2px',
              borderColor: selectedTime === time ? theme.primaryColor : 'rgb(229, 231, 235)',
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
} 