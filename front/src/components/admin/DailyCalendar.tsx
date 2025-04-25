import { useState, useEffect } from 'react';
import CreateReservationModal from './CreateReservationModal';
import { cn } from '../../lib/utils';

interface CalendarReservation {
  id: string;
  customerName: string;
  service: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Barber {
  id: string;
  name: string;
  reservations: CalendarReservation[];
}

interface DailyCalendarProps {
  date: Date;
  onReservationClick: (reservationId: string) => void;
  onCreateReservation?: (data: {
    barberId: string;
    customerName: string;
    service: string;
    duration: number;
    time: string;
    date: Date;
  }) => void;
}

export default function DailyCalendar({ date, onReservationClick, onCreateReservation }: DailyCalendarProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [showTimeIndicator, setShowTimeIndicator] = useState(false);

  useEffect(() => {
    const updateTimeIndicator = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Only show indicator during business hours (8:00-20:00)
      if (hours < 8 || hours >= 20) {
        setShowTimeIndicator(false);
        // If it's before 8am, position at start of day
        if (hours < 8) {
          setCurrentTimePosition(0);
        }
        // If it's after 8pm, position at end of day
        if (hours >= 20) {
          setCurrentTimePosition(720); // 12 hours * 60px
        }
        return;
      }

      setShowTimeIndicator(true);
      const totalMinutes = hours * 60 + minutes;
      const position = ((totalMinutes - 8 * 60) / 15) * 24; // Each 15min slot is 24px high
      setCurrentTimePosition(position);
    };

    // Update immediately
    updateTimeIndicator();

    // Update every minute
    const interval = setInterval(updateTimeIndicator, 60000);

    return () => clearInterval(interval);
  }, []);

  // Hardcoded data for demonstration
  const barbers: Barber[] = [
    {
      id: '1',
      name: 'Tomáš Novák',
      reservations: [
        {
          id: '1',
          customerName: 'Jan Novák',
          service: 'Střih a úprava vousu',
          time: '09:00',
          duration: 60,
          status: 'confirmed'
        },
        {
          id: '2',
          customerName: 'Petr Malý',
          service: 'Kompletní péče',
          time: '11:00',
          duration: 90,
          status: 'pending'
        },
        {
          id: '6',
          customerName: 'David Černý',
          service: 'Úprava vousu',
          time: '13:30',
          duration: 30,
          status: 'confirmed'
        },
        {
          id: '7',
          customerName: 'Filip Horák',
          service: 'Střih vlasů',
          time: '15:00',
          duration: 45,
          status: 'confirmed'
        },
        {
          id: '8',
          customerName: 'Marek Bílek',
          service: 'Speciální střih strojkem',
          time: '17:00',
          duration: 45,
          status: 'pending'
        }
      ]
    },
    {
      id: '2',
      name: 'Jan Svoboda',
      reservations: [
        {
          id: '3',
          customerName: 'Martin Kovář',
          service: 'Úprava vousu',
          time: '10:00',
          duration: 30,
          status: 'confirmed'
        },
        {
          id: '9',
          customerName: 'Lukáš Dvořák',
          service: 'Kompletní péče',
          time: '12:00',
          duration: 90,
          status: 'confirmed'
        },
        {
          id: '10',
          customerName: 'Ondřej Král',
          service: 'Střih vlasů',
          time: '14:30',
          duration: 45,
          status: 'confirmed'
        },
        {
          id: '11',
          customerName: 'Pavel Němec',
          service: 'Úprava vousu',
          time: '16:00',
          duration: 30,
          status: 'pending'
        }
      ]
    },
    {
      id: '3',
      name: 'Martin Dvořák',
      reservations: [
        {
          id: '4',
          customerName: 'Jakub Novotný',
          service: 'Střih vlasů',
          time: '14:00',
          duration: 45,
          status: 'confirmed'
        },
        {
          id: '5',
          customerName: 'Tomáš Svoboda',
          service: 'Speciální střih strojkem',
          time: '16:00',
          duration: 45,
          status: 'pending'
        },
        {
          id: '12',
          customerName: 'Adam Procházka',
          service: 'Kompletní péče',
          time: '09:30',
          duration: 90,
          status: 'confirmed'
        },
        {
          id: '13',
          customerName: 'Vojtěch Kučera',
          service: 'Úprava vousu',
          time: '11:30',
          duration: 30,
          status: 'confirmed'
        }
      ]
    }
  ];

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8; // Start from 8:00
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getReservationStyle = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const top = ((startMinutes - 8 * 60) / 15) * 30; // Each 15min slot is 30px high (increased from 24px)
    const height = (duration / 15) * 30; // Each 15min is 30px (increased from 24px)

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const getStatusColor = (status: CalendarReservation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-gray-900';
      case 'confirmed':
        return 'bg-green-50 border-green-200 text-gray-900';
      case 'completed':
        return 'bg-blue-50 border-blue-200 text-gray-900';
      case 'cancelled':
        return 'bg-red-50 border-red-200 text-gray-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const handleCreateReservation = (barber: Barber, time: string) => {
    setSelectedBarber(barber);
    setSelectedTime(time);
    setIsCreateModalOpen(true);
  };

  const handleCreateReservationSubmit = (data: {
    customerName: string;
    service: string;
    duration: number;
    time: string;
    date: Date;
  }) => {
    if (selectedBarber && onCreateReservation) {
      onCreateReservation({
        ...data,
        barberId: selectedBarber.id,
      });
    }
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {date.toLocaleDateString('cs-CZ', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                Dnes
              </button>
              <button className="px-4 py-2 text-sm font-medium text-[#8B4513] bg-[#8B4513] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                Týden
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex overflow-x-auto">
          {/* Time column */}
          <div className="w-20 border-r border-gray-200 bg-gray-50 rounded-bl-xl flex-shrink-0">
            <div className="h-16 border-b border-gray-200 bg-gray-50" />
            <div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-[120px] border-b border-gray-200 text-xs font-medium text-gray-900 px-3 flex items-start pt-2"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Barber columns */}
          <div className="flex-1 min-w-0">
            <div className="flex">
              {barbers.map((barber) => (
                <div key={barber.id} className="flex-1 min-w-[300px] border-r border-gray-200 last:border-r-0">
                  {/* Barber header */}
                  <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-center bg-gray-50">
                    <span className="font-medium text-gray-900">{barber.name}</span>
                  </div>

                  {/* Reservations container */}
                  <div className="relative" style={{ height: '1560px' }}> {/* Increased from 780px to 1560px (13 hours * 120px) */}
                    {/* Hour grid lines */}
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="h-[120px] border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleCreateReservation(barber, time)}
                      >
                        {/* Quarter-hour markers */}
                        <div className="h-[30px] border-b border-gray-100" />
                        <div className="h-[30px] border-b border-gray-100" />
                        <div className="h-[30px] border-b border-gray-100" />
                      </div>
                    ))}

                    {/* Current time indicator */}
                    {showTimeIndicator && (
                      <div
                        className="absolute w-full border-t-2 border-[#8B4513] z-10"
                        style={{ top: `${currentTimePosition}px` }}
                      >
                        <div className="absolute -left-2 -top-1.5 w-3 h-3 rounded-full bg-[#8B4513]" />
                      </div>
                    )}

                    {/* Reservations */}
                    {barber.reservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className={cn(
                          'absolute left-2 right-2 p-2 rounded-lg shadow-sm',
                          'flex flex-col justify-between',
                          'border border-l-4',
                          getStatusColor(reservation.status)
                        )}
                        style={getReservationStyle(reservation.time, reservation.duration)}
                        onClick={() => onReservationClick(reservation.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{reservation.customerName}</div>
                          <div className="text-xs text-gray-600 truncate">{reservation.service}</div>
                        </div>
                        <div className="text-xs font-medium text-gray-500 mt-1">
                          {reservation.duration}min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedBarber && (
        <CreateReservationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateReservationSubmit}
          barberName={selectedBarber.name}
          selectedTime={selectedTime}
          selectedDate={date}
        />
      )}
    </>
  );
} 