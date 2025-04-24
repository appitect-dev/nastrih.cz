'use client';

import { useState } from 'react';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

interface Barber {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface BarberSelectorProps {
  onBarberSelect: (barberId: string) => void;
}

const BARBERS: Barber[] = [
  {
    id: '1',
    name: 'Tomáš Novák',
    description: 'Specialista na klasické střihy a úpravu vousů'
  },
  {
    id: '2',
    name: 'Jan Svoboda',
    description: 'Expert na moderní pánské účesy'
  },
  {
    id: '3',
    name: 'Martin Dvořák',
    description: 'Mistr v péči o vousy a tradiční holení'
  }
];

export default function BarberSelector({ onBarberSelect }: BarberSelectorProps) {
  const [selectedBarber, setSelectedBarber] = useState<string>(() => {
    // Initialize from sessionStorage if available
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('selectedBarber') || '';
    }
    return '';
  });
  const { theme } = useBookingTheme();

  const handleBarberSelect = (barberId: string) => {
    setSelectedBarber(barberId);
    sessionStorage.setItem('selectedBarber', barberId);
    onBarberSelect(barberId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: theme.textColor }}>Vyberte holiče</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BARBERS.map((barber) => (
          <button
            key={barber.id}
            onClick={() => handleBarberSelect(barber.id)}
            className="w-full p-6 rounded-xl border-2 transition-all text-left"
            style={{ 
              borderColor: selectedBarber === barber.id ? theme.primaryColor : 'rgb(229, 231, 235)',
              backgroundColor: selectedBarber === barber.id ? `${theme.primaryColor}10` : 'white',
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                {barber.image ? (
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-full h-full text-gray-400 p-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-semibold" style={{ color: theme.textColor }}>{barber.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{barber.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 