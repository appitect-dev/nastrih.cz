"use client";

import { useState } from "react";
import { useBookingTheme } from "@/contexts/BookingThemeContext";

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
    id: "1",
    name: "Tomáš Novák",
    description: "Specialista na klasické střihy a úpravu vousů",
  },
  {
    id: "2",
    name: "Jan Svoboda",
    description: "Expert na moderní pánské účesy",
  },
  {
    id: "3",
    name: "Martin Dvořák",
    description: "Mistr v péči o vousy a tradiční holení",
  },
];

export default function BarberSelector({
  onBarberSelect,
}: BarberSelectorProps) {
  const [selectedBarber, setSelectedBarber] = useState<string>(() => {
    // Initialize from sessionStorage if available
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("selectedBarber") || "";
    }
    return "";
  });
  const { theme } = useBookingTheme();

  const handleBarberSelect = (barberId: string) => {
    setSelectedBarber(barberId);
    sessionStorage.setItem("selectedBarber", barberId);
    onBarberSelect(barberId);
  };

  return (
    <div className="space-y-6">
      <h2
        style={{
          color: theme.textColor,
          fontSize: `calc(${theme.fontSize.base} * 1.5)`,
          fontWeight: theme.fontWeight.bold,
          fontFamily: theme.fontFamily,
        }}
      >
        Vyberte holiče
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BARBERS.map((barber) => (
          <button
            key={barber.id}
            onClick={() => handleBarberSelect(barber.id)}
            className="w-full p-6 border-2 transition-all text-left"
            style={{
              borderColor:
                selectedBarber === barber.id
                  ? theme.primaryColor
                  : theme.inputStyle.borderColor,
              backgroundColor:
                selectedBarber === barber.id
                  ? `${theme.primaryColor}10`
                  : theme.backgroundColor,
              borderRadius: theme.borderRadius,
              fontFamily: theme.fontFamily,
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
              <h3
                style={{
                  color: theme.textColor,
                  fontSize: theme.fontSize.large,
                  fontWeight: theme.fontWeight.medium,
                  fontFamily: theme.fontFamily,
                }}
              >
                {barber.name}
              </h3>
              <p
                style={{
                  color: theme.textColor,
                  fontSize: theme.fontSize.small,
                  marginTop: theme.spacing.small,
                  fontFamily: theme.fontFamily,
                }}
              >
                {barber.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
