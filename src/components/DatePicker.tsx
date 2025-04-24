'use client';

import { useState } from 'react';

interface DatePickerProps {
  onDateSelect: (date: string) => void;
}

export default function DatePicker({ onDateSelect }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 2 months from now as maximum selectable date
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
  const maxDate = twoMonthsFromNow.toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Vyberte datum</h2>
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 font-medium"
          required
        />
      </div>
      {selectedDate && (
        <p className="text-sm text-gray-600">
          Vybraný termín: {new Date(selectedDate).toLocaleDateString('cs-CZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
    </div>
  );
} 