"use client";

import { useState } from 'react';
import DailyCalendar from '@/components/admin/DailyCalendar';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleReservationClick = (reservationId: string) => {
    console.log('Reservation clicked:', reservationId);
  };

  const handleCreateReservation = (data: {
    barberId: string;
    customerName: string;
    service: string;
    duration: number;
    time: string;
    date: Date;
  }) => {
    console.log('Create reservation:', data);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Rezervace</h1>
      </div>

      <DailyCalendar
        date={selectedDate}
        onReservationClick={handleReservationClick}
        onCreateReservation={handleCreateReservation}
      />
    </div>
  );
} 