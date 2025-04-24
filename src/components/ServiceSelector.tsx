'use client';

import { useState } from 'react';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

interface Service {
  id: string;
  name: string;
  price: string;
  duration: number;
  description: string;
}

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Grand service',
    price: '2190-2390',
    duration: 90,
    description: 'Kompletní péče o vlasy a vousy včetně relaxační masáže'
  },
  {
    id: '2',
    name: 'Střih a úprava vousu',
    price: '980-1080',
    duration: 60,
    description: 'Profesionální střih vlasů a úprava vousů'
  },
  {
    id: '3',
    name: 'Speciální střih strojkem a úprava vousu',
    price: '880-980',
    duration: 45,
    description: 'Moderní střih strojkem s úpravou vousů'
  },
  {
    id: '4',
    name: 'Střih strojkem a úprava vousu',
    price: '680-780',
    duration: 40,
    description: 'Základní střih strojkem s úpravou vousů'
  },
  {
    id: '5',
    name: 'Střih vlasů',
    price: '680-780',
    duration: 30,
    description: 'Klasický střih vlasů podle vašeho přání'
  },
  {
    id: '6',
    name: 'Úprava/holení vousu',
    price: '580-680',
    duration: 30,
    description: 'Profesionální péče o vousy'
  }
];

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState<string>('');
  const { theme } = useBookingTheme();

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    sessionStorage.setItem('selectedService', serviceId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: theme.textColor }}>Vyberte službu</h2>
      <div className="grid grid-cols-1 gap-4">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className="w-full p-6 rounded-xl border-2 transition-all text-left"
            style={{ 
              borderColor: selectedService === service.id ? theme.primaryColor : 'rgb(229, 231, 235)',
              backgroundColor: selectedService === service.id ? `${theme.primaryColor}10` : 'white',
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: theme.textColor }}>{service.name}</h3>
                <p className="mt-1 text-gray-600">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold" style={{ color: theme.textColor }}>{service.price} Kč</p>
                <p className="text-sm text-gray-500">{service.duration} minut</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 