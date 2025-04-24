"use client";

import { useState } from "react";
import { useBookingTheme } from "@/contexts/BookingThemeContext";

interface DatePickerProps {
  onDateSelect: (date: string) => void;
}

export default function DatePicker({ onDateSelect }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const { theme } = useBookingTheme();

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Get date 2 months from now as maximum selectable date
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
  const maxDate = twoMonthsFromNow.toISOString().split("T")[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="space-y-4">
      <h2
        style={{
          color: theme.textColor,
          fontSize: `calc(${theme.fontSize.base} * 1.5)`,
          fontWeight: theme.fontWeight.bold,
          fontFamily: theme.fontFamily,
        }}
      >
        Vyberte datum
      </h2>
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          className="w-full px-4 py-3 border-2 outline-none transition-all"
          style={{
            borderColor: theme.inputStyle.borderColor,
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            borderRadius: theme.borderRadius,
            fontSize: theme.fontSize.base,
            fontFamily: theme.fontFamily,
          }}
          required
        />
      </div>
      {selectedDate && (
        <p
          style={{
            color: theme.textColor,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontFamily,
          }}
        >
          Vybraný termín:{" "}
          {new Date(selectedDate).toLocaleDateString("cs-CZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
